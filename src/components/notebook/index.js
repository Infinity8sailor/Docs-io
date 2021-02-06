import React , {Component, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import './css/index.css';
import './css/index2.css';
// import './css/prism.js';
import {Data,Notebook_data,insertCell,updateCell} from './../data/data';
import {Editor, Display } from './xCompo';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';



const fs = require("fs");

class notebook extends Component {
    state = {
        // topics: [],
        open_topic : [],
        open_topic_name : 'none',
        open_topic_index : -1,
        selected : "",
        button_clicked : "",
        editor_toggle : false,
        content:"",
        cell_types: ["Code","Markdown","Img"]
    };
    componentDidMount(){
        Notebook_data(this.state.open_topic_name).then(data => { 
            this.setState({open_topic:data});
            // console.log("Notbook_data from mount",data);
          });
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.open_topic_name !== prevState.open_topic_name ){
            Notebook_data(this.state.open_topic_name).then(data => { 
            this.setState({open_topic:data});
            // console.log("Notbook_data from update",data);
          });
        };
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.data) return console.log("data np getDerivedStateFromProps"); // data hasn't been loaded yet so do nothing
        const {data} = nextProps;
        var {open_topic_name,open_topic_index} = prevState;
        open_topic_name = data.state.open_topic;
        open_topic_index = data.state.open_topic_index;
        // console.log("opened topic now");
        return {open_topic_name,open_topic_index};
    }
    
    Copy_btn(index) {
        // Copy to Clipbord Button
        var input = document.createElement('input');
        var value  = this.state.open_topic.cells[index].source;
        input.setAttribute('value', value);
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        document.body.removeChild(input);
        return result;
    };
    editor_toggle = () => {
        this.setState({editor_toggle : this.state.editor_toggle ? false : true});
        this.setState({selected:""});
        // console.log("toggle state changed to ", this.state.editor_toggle);
    };

    editor_on = (index) => {
        if (this.state.editor_toggle ){
            this.setState({selected:index})
        };
        // console.log(this.state.selected, "is selected for editing...");
    };

    def_className = (index,cell_layout) => {
        let selected = this.state.selected === index ? "selected " : "";
        let className = "nb-content cell "+ selected + cell_layout;
        return className;
    };

    addCell = (index,cell_type) => {
        // console.log("aDD cell triggered at ",index+1);
        var buton_clic = this.state.button_clicked==="" ? "clicked" : "";
        this.setState({button_clicked: buton_clic })
        insertCell(Data,this.state.open_topic,index,"Edit Content Here",cell_type);
    };
    updateCell_content = (index,value,sub_layout,sub_layout_value,date) => {
        // console.log("updateswll", index, value);
        let topic = this.state.open_topic;
        topic.cells[index].source=value;
        topic.cells[index].cell_layout[sub_layout] = sub_layout_value;
        updateCell(topic);
    }

    render(){
        var topic =this.state.open_topic;
        var state = this.state;
        let Prop = {updatecell: this.updateCell_content};
        // console.log("all state : ",this.state);
        
    return (
        <div id="notebook">
            <div id = "notebook_user_id">
                Top User Bar
                <button onClick = {this.editor_toggle.bind(this)} style={{float: "right"}} >
                    {this.state.editor_toggle ? "Editor on" : "Editor off"}
                </button>
            </div>
            <div id="notebook_current" >
                <div id="notebook_Row" className = "notebook">
                <div id ="notebook_topic" className = "nb-content title-cell">
                    {topic ? topic.name:console.log("no title found",this.state.topic)}
                </div>
                <div className={"nb-content" }>
                    {topic.cells ? 
                    topic.cells.map((d,i) => (
                        <div className={"cell-wrapper"}>
                        <div className = {this.def_className( i, d.cell_layout.cell_type) }>
                            <div  key={i} onClick={this.editor_on.bind(this,i)}>
                                <div className="cell-content">
                                    {d.cell_layout.cell_type==="Code" ? 
                                        this.state.selected===i ? 
                                        <Editor data={{d:d,updatecell:this.updateCell_content,index:i}} /> : 
                                        <>
                                        <Display data={{d:d,updatecell:this.updateCell_content,index:i}} />
                                        </> : 
                                        <></>
                                    }
                                    {
                                    d.cell_layout.cell_type==="Markdown" ? 
                                        this.state.selected===i ? 
                                        <Editor data={{d:d,updatecell:this.updateCell_content,index:i}} /> : 
                                        <>
                                        <Display data={{d:d,updatecell:this.updateCell_content,index:i}} />
                                        </> : 
                                        <></>
                                    }
                                    {
                                    d.cell_layout.cell_type==="Img" ? 
                                        this.state.selected===i ? 
                                        <Editor data={{d:d,updatecell:this.updateCell_content,index:i}} /> : 
                                        <>
                                        <Display data={{d:d,updatecell:this.updateCell_content,index:i}} />
                                        </> : 
                                        <></>
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="nb-content add-cell">
                            <div class="nb-content add-cell-buttons">
                                {this.state.cell_types.map((cell_type) => (
                                <colab-toolbar-button class={" nb-content add-"+{cell_type}+" add-button"} onClick={this.addCell.bind(this,i,cell_type)} icon="icons:add" title={"Add "+{cell_type}+" Here"}>
                                    Add {cell_type}
                                </colab-toolbar-button>
                                ))}
                            </div>
                            <hr/>
                        </div>
                        </div>
                        )):<></>}
                    </div>
                </div>
            </div>
            <div id = "notebook_footer">Botton User Bar0 </div>
        </div>
    );
    }
}
export default notebook;

