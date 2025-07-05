import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "@codemirror/basic-setup";
import { vim } from "@replit/codemirror-vim";

export default function Editor({ onSave }) {
  const editor = useRef(null);
  const editorView = useRef(null);

  useEffect(() => {
    if (!editor.current) return;

    const state = EditorState.create({
      doc: "iで挿入モードに入りHelloと入力し、:wqで保存してください\n",
      extensions: [
        basicSetup,
        vim(),
        EditorView.updateListener.of((update) => {
          if (update.transactions.some(tr => tr.annotation("vim-command") === ":wq")) {
            onSave(editorView.current.state.doc.toString());
          }
        }),
      ],
    });

    editorView.current = new EditorView({
      state,
      parent: editor.current,
    });

    return () => {
      editorView.current?.destroy();
    };
  }, [onSave]);

  return <div ref={editor} />;
}
