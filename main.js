let editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "javascript",
  keyMap: "vim",
  lineNumbers: true
});

// 初期状態を設定
fetch('problems.json')
  .then(res => res.json())
  .then(problem => {
    document.getElementById("instruction").innerText = "指令: " + problem.description;
    editor.setValue(problem.initialText);
    window.expectedText = problem.expectedText;
  });

CodeMirror.Vim.defineEx("wq", "wq", function(cm) {
  const userText = cm.getValue().replace(/\s+/g, '');
  const expected = window.expectedText.replace(/\s+/g, '');

  const result = userText === expected ? "✅ 正解！" : "❌ 不正解";
  document.getElementById("result").innerText = result;
});
