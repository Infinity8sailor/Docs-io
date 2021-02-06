import React , {Component } from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import {insertTopic} from './../data/data';
// import { render,Component } from 'react-dom';

// var data0 = [];
class menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            // topics:this.props.data.list
            AddNewTopic_input : false,
            NewTopicValue : "",
            NewTopicValue_avail : false,
        };
    };
    
    handleindexChange = (index) => {
        this.props.data.update_topic(index);            
        // console.log("indexgiven",index);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////
    addNewTopic_input = () => {
        this.setState({AddNewTopic_input : true});
        console.log("new button add req");
    }
    checkAvail_of_newtopic = (value) =>{
        this.setState({NewTopicValue : value});
        this.props.data.state.topics.includes(value) ? 
            this.setState({NewTopicValue_avail : false}) :  this.setState({NewTopicValue_avail : true});
    } 
    newTopic_cancel = ()=>  {
        this.setState({NewTopicValue : ""});
        this.setState({NewTopicValue_avail : false});
        this.setState({AddNewTopic_input : false});
    }
    newTopic_submit = () => {
        console.log(this.state.NewTopicValue, "To be sent for add topic");
        this.state.NewTopicValue_avail ? insertTopic(this.state.NewTopicValue): console.log("failed to add new topic");
        this.newTopic_cancel();
    };
    /////////////////////////////////////////////////////////////////////
    render(){
        // let topics = this.state.topics;
        // console.log("6516",this.props.data);
    return (
        <div id="menu">
            <div id = "menu_user_id">User ID With Icon</div>
            <div id ="menu_topic">
                <button onClick={this.addNewTopic_input.bind(this)} style={{backgroundColor: "black", color: "white",  float : "right", width: "auto", height: "auto" }}>
                    New_Topic
                </button>
                Menu Topic
            </div>
                    {
                        this.state.AddNewTopic_input ? 
                        <div style={{backgroundColor: "black", color: "white",  float : "right", width: "auto", height: "auto" }}>
                            <input
                              title={this.state.NewTopicValue_avail ? "Available" : "Not Available"}
                              type="text"
                              placeholder="Enter New Topic"
                              value={this.state.NewTopicValue}
                              onChange={e => this.checkAvail_of_newtopic(e.target.value)}
                            />
                            <button type="button" onClick={() => this.newTopic_cancel()}>
                              X
                            </button>
                            <button type="button" onClick={() => this.newTopic_submit()}>
                              Create New
                            </button>
                          </div> : <></>
                    }
            <div id="menuRow" className = "row">
                <div id = "menuButton" className="btn-group scroll">
                 {this.props.data.state.topics.map((d,i) => (
                   <button key={i} onClick={this.handleindexChange.bind(this,i)}>{i + ". "+d} </button>
                   ))}
                 </div>
            </div>
        </div>
    );
    }
}
export default menu;