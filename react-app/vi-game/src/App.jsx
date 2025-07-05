import React, { useState } from "react";
import Editor from "./components/Editor";

function App() {
  const [message, setMessage] = useState("");

  const handleSave = (text) => {
    if (text.trim() === "Hello") {
      setMessage("✅ ステージクリア！（:wq が入力されました）");
    } else {
      setMessage("❌ テキストが違います: " + text);
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Viコマンド練習ゲーム</h1>
      <p>お題：「Hello」を入力して`:wq`で保存せよ！</p>
      <Editor onSave={handleSave} />
      <p>{message}</p>
    </div>
  );
}

export default App;
