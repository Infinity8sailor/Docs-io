import React, { useState, useEffect } from "react";
import './css/codeEditor.css';
import ContentEditable from 'react-contenteditable';

const CodeView = (props) => {

  const [content , setContent] = useState(props.data.d.source);
  const [img_format, setCodeLan] = useState(props.data.d.cell_layout.img_format)

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
          {img_format == "http" ? <img src={content} alt="Apple logo"/>:<td dangerouslySetInnerHTML={{__html: content}} />}
      </div>
    </div>
  );
};

export default CodeView;