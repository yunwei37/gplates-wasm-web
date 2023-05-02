import "../../styles/Editor.css";

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';

export default function Editor({ language, displayName, value, onChange }) {
    return (
        <div className="editor-container">
            <CodeMirror value={value} onChange={onChange} options={{ mode: language, theme: "material", lineNumbers: true }} />
        </div>
    )
}
