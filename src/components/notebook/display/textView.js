import React, { useState, useEffect } from "react";
import './css/codeEditor.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';


const TextView = (props) => {

  const [content , setContent] = useState(props.data.d.source);
  const [code_lan, setCodeLan] = useState(props.data.d.cell_layout.code_lan)

  const Copy_btn = () => {
    // Copy to Clipbord Button
    console.log("button Display clicked");
    var input = document.createElement('input');
    // var value  = this.state.open_topic.cells[index].source;
    var value  = content;
    input.setAttribute('value', value);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
};
  
  return (
    <div>
      <button onClick={Copy_btn.bind()} style={{backgroundColor: "black", color: "white",  float : "right", width: "auto", height: "auto" }}>
          Copy  
      </button>
      <div>
        {content}
      </div>
    </div>
  );
};

export default TextView;