import React , {Component} from 'react';
import CodeEditor from './editor/codeEditor';
import TextEditor from './editor/textEditor';
import ImgEditor from './editor/imgEditor';
import CodeView from './display/codeView';
import TextView from './display/textView';
import ImgView from './display/imgView';

const Editor =  (props) => {
    const components = {
        Code : CodeEditor,
        Markdown : TextEditor,
        Img :  ImgEditor
    }
    var  VarEditor = components[props.data.d.cell_layout.cell_type];
    // console.log("ksjfhvbs",VarEditor);
    return <VarEditor data={props.data}/>;
};

const Display = (props) => {
    //
    const components = {
        Code : CodeView,
        Markdown : TextView,
        Img :  ImgView
    }
    //
    var  VarDisplay = components[props.data.d.cell_layout.cell_type];
    
    return <VarDisplay data={props.data}/>;
};
export{ Editor , Display};