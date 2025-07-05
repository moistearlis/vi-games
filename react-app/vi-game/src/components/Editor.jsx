import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  lineNumbers,
} from "@codemirror/view";
import { history, historyKeymap } from "@codemirror/commands";
import { foldGutter, indentOnInput, foldKeymap } from "@codemirror/language";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { vim } from "@replit/codemirror-vim";
import { oneDark } from "@codemirror/theme-one-dark";

export default function Editor({ onSave }) {
  const editor = useRef(null);
  const editorView = useRef(null);

  useEffect(() => {
    if (!editor.current) return;

    const myVim = vim({
      exCommands: {
        wq: ({ editor }) => {
          onSave(editor.state.doc.toString());
          // 例：カーソル移動やモード変更など追加でできる
        },
      },
    });

    const extensions = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      EditorView.lineWrapping,
      indentOnInput(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      closeBrackets(),
      myVim,
      keymap.of([
        indentWithTab,
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
      ]),
      // EditorView.updateListener.of((update) => {
      //   if (update.transactions.some(tr => tr.annotation("vim-command") === ":wq")) {
      //     onSave(editorView.current.state.doc.toString());
      //   }
      // }),
      oneDark
    ];

    const state = EditorState.create({
      extensions,
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
