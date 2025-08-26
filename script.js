document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const editorContainer = document.getElementById('editor');
    const targetWordEl = document.getElementById('target-word');
    const scoreEl = document.getElementById('score');
    const resultModal = document.getElementById('result-modal');
    const resultMessageEl = document.getElementById('result-message');

    // --- Game Configuration ---
    const ROWS = 10;
    const COLS = 60;
    const WORDS = [
        'function', 'variable', 'constant', 'object', 'array', 'class',
        'interface', 'extends', 'implements', 'constructor', 'private',
        'public', 'protected', 'static', 'void', 'return', 'await', 'async'
    ];

    // --- Game State ---
    let editor;
    let score = 0;
    let currentWord = '';
    let currentPosition = { line: 0, ch: 0 };

    // --- Game Functions ---

    function initializeEditor() {
        if (!editorContainer) {
            console.error('Editor container not found.');
            return;
        }
        editor = CodeMirror(editorContainer, {
            lineNumbers: true,
            mode: 'text/plain',
            theme: 'dracula',
            keyMap: 'vim',
            showCursorWhenSelecting: true,
            lineWrapping: true,
        });
        editor.setSize('100%', '350px'); // Adjusted height for better visibility
    }

    function startNewRound() {
        // Hide modal and reset styles
        resultModal.style.display = 'none';
        resultMessageEl.className = '';
        editor.focus();

        // Pick a random word
        currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        targetWordEl.textContent = currentWord;

        // Pick a random position
        const line = Math.floor(Math.random() * ROWS);
        const ch = Math.floor(Math.random() * (COLS - currentWord.length));
        currentPosition = { line, ch };

        // Create a blank canvas for the user to type on
        const blankContent = Array(ROWS).fill('').join('\n');
        editor.setValue(blankContent);
        editor.setCursor(0, 0); // Start cursor at top-left

        // The user must navigate to `currentPosition` and type `currentWord`
        console.log(`Challenge: Navigate to line ${currentPosition.line + 1}, character ${currentPosition.ch + 1} and type '${currentWord}'`);
    }


    function checkAnswer() {
        const userLine = editor.getLine(currentPosition.line);
        if (!userLine) {
            showResult(false);
            return;
        }

        const typedWord = userLine.substring(currentPosition.ch, currentPosition.ch + currentWord.length);

        if (typedWord.trim() === currentWord) {
            score++;
            scoreEl.textContent = score;
            showResult(true);
        } else {
            showResult(false);
        }
    }

    function showResult(isCorrect) {
        if (isCorrect) {
            resultMessageEl.textContent = 'Correct!';
            resultMessageEl.className = 'correct';
        } else {
            resultMessageEl.textContent = `Wrong! The word was "${currentWord}".`;
            resultMessageEl.className = 'wrong';
        }
        resultModal.style.display = 'flex';

        // Wait for user to press Enter to continue
        window.addEventListener('keydown', handleContinueKey, { once: true });
    }

    function handleContinueKey(e) {
        if (e.key === 'Enter') {
            startNewRound();
        } else {
            // If another key is pressed, re-add the listener
             window.addEventListener('keydown', handleContinueKey, { once: true });
        }
    }


    // --- Custom Vim Command ---

    CodeMirror.Vim.defineEx('wq', null, () => {
        checkAnswer();
    });
    CodeMirror.Vim.defineEx('wq!', null, () => {
        checkAnswer();
    });


    // --- Initialization ---
    initializeEditor();
    startNewRound();
});
