document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const commandBar = document.getElementById('command-bar');
    const targetWordDisplay = document.getElementById('target-word');
    const scoreDisplay = document.getElementById('score');

    let score = 0;
    let currentWord = '';
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape'];

    function setupGame() {
        // For now, let's just focus on the editor functionality
        editor.textContent = 'Press i to enter insert mode.';
        editor.focus();
    }

    let mode = 'normal'; // or 'insert' or 'command'

    function showCommandBar() {
        mode = 'command';
        commandBar.classList.remove('hidden');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = ':';
        commandBar.innerHTML = '';
        commandBar.appendChild(input);
        input.focus();

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.substring(1); // remove the ':'
                if (command === 'wq!') {
                    alert('Saved and quit!');
                }
                hideCommandBar();
                e.preventDefault();
            } else if (e.key === 'Escape') {
                hideCommandBar();
                e.preventDefault();
            }
        });
    }

    function hideCommandBar() {
        mode = 'normal';
        commandBar.classList.add('hidden');
        commandBar.innerHTML = '';
        editor.focus();
    }



    editor.addEventListener('keydown', (e) => {
        if (mode === 'normal') {
            if (e.key === 'i') {
                mode = 'insert';
                editor.textContent = ''; // Clear editor
                e.preventDefault();
            } else if (e.key === ':') {
                e.preventDefault();
                showCommandBar();
            }
        } else if (mode === 'insert') {
            if (e.key === 'Escape') {
                mode = 'normal';
                e.preventDefault();
            }
        }
    });

    setupGame();
});
