import React, { useState, useEffect } from "react";
import ContentEditable from 'react-contenteditable';
import './css/imgEditor.css';

const ImgEditor = (props) => {
    const contentEditable = React.createRef();
  const [content, setContent] = useState(props.data.d.source);
  const [img_format, setFormat] = useState(props.data.d.cell_layout.img_format);
  const [img_src, setImgSrc] = useState(true);
  const [last_update,setLastUpdate] = useState(Date.now())
  const format_list = [
    {
      label: "External Address", value: "http",
    },
    {
      label: "ClipBoard/png", value: "image/png",
    },
    {
      label: "jpg", value: "image/jpg",
    },
    {
      label: "jpeg", value: "image/jpeg",
    },
  ];
  const update_atInterval = () => {
    var index = props.data.index;
    console.log("useefeect or butoon clicked",index);
    props.data.updatecell(index,content,"img_format",img_format,last_update);
    setLastUpdate(Date.now());
  };

//   const update_imgSrc = () => {
//     // console.log("1 ",img_src);
//     var state = img_src ? false : true;  
//     setImgSrc(state);
//   };

  const base64_editor = (e) => {
      var value = e.target.value;
      console.log(e.target.value);
      setContent(value);
    };

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
      console.log("useeffects");
  }, [props.data.d.cell_layout.img_format, content]);

  return (
    <div className="text-edit-container">
      <div>
      {/* <button onClick={update_imgSrc}>
          {"enter "}{img_src ? "src" : "Clipboard" }
      </button> */}
      {/* {img_src ? <textarea 
        className="img-input"
        value={content}
        onChange={(evt) => setContent(evt.target.value)}
        onKeyDown={handleKeyDown}
        /> : <></>
        }  */}
        <div className="select-container">
          <select value={img_format} onChange={(e)=> {setFormat(e.target.value)}}>
            {format_list.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
      </div>
        <ContentEditable
            innerRef={contentEditable}
            html={content}              // innerHTML of the editable div
            disabled={false}           // use true to disable editing
            onChange={base64_editor } // handle innerHTML change
            tagName='article'        // Use a custom HTML tag (uses a div by default)
      />
        <button onClick={update_atInterval}>
          save
        </button>
        </div>
        <div>
          {img_format == "http" ? <img src={content}/>:<td dangerouslySetInnerHTML={{__html: content}} />}
        </div>
    </div>
    
  );
};

export default ImgEditor;