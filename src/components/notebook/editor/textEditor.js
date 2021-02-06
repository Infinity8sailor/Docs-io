import React, { useState, useEffect } from "react";
import './css/codeEditor.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';


const TodeEditor = (props) => {
  const [content, setContent] = useState(props.data.d.source);
  const [code_lan, setCodelan] = useState(props.data.d.cell_layout.code_lan);
  const [last_update,setLastUpdate] = useState(Date.now())
  const update_atInterval = () => {
    var index = props.data.index;
    console.log("useefeect or butoon clicked",index);
    props.data.updatecell(index,content,"code_lan",code_lan,last_update);
    setLastUpdate(Date.now());
  };
  const Lan_list = [
    {
      label: "javascript", value: "javascript",
    },
    {
      label: "python", value: "python",
    },
    {
      label: "c++", value: "cpp",
    },
    {
      label: "html", value: "html",
    },
  ];

  const handleKeyDown = (evt) => {
    let value = content,
      selStartPos = evt.currentTarget.selectionStart;

    console.log(evt.currentTarget);

    // handle 4-space indent on
    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setContent(value);
    }
  };

  useEffect(() => {
      // update_atInterval();
    // if (last_update + 5000 < Date.now() ){
    // }
  }, [props.data.d.cell_layout.code_lan, content]);

  return (
    <div className="text-edit-container">
      <div>
      <div className="select-container">
          <select value={code_lan} onChange={(e)=> {setCodelan(e.target.value)}}>
            {Lan_list.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
      </div>

      <textarea
        className="code-input"
        value={content}
        onChange={(evt) => setContent(evt.target.value)}
        onKeyDown={handleKeyDown}
        />
        <button onClick={update_atInterval}>
          save
        </button>
        </div>
      <SyntaxHighlighter  language={code_lan} style={coldarkDark} showLineNumbers="true">
        {content}
      </SyntaxHighlighter>
    </div>
    
  );
};

export default TodeEditor;




// <div className="code-edit-container">
// <textarea
// className="code-input"
// value={content}
// onChange={(_)=>{this.def_contentchange(_.target.value)}}
//  onKeyDown={this.handleKeyDown}
// />
{/* <SyntaxHighlighter  language={d.cell_layout.code_lan} style={coldarkDark} showLineNumbers="true">
{d.source + content}
</SyntaxHighlighter> */}
// <pre className="code-output" //contentEditable={this.def_contentEditable(i)}
// >
// <code className={"language-"+d.cell_layout.code_lan}>
// {content}
// </code>
// </pre>
// </div>