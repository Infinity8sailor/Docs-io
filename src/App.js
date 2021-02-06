import { Component } from 'react';
import './App.css';
import Menu from "./components/menu/index";
import Notebook from "./components/notebook/index";

import UserBar from "./components/user_bar/user_bar";
import {Data} from './components/data/data';

class App extends Component {
  state = {
    topics: [],
    open_topic : "World",
    open_topic_index : "",
    selected : ""
  };
  componentDidMount(){
    // fetch('http://localhost:9000/docs')
    Data(`/docs`).then(data => { 
      this.setState({topics:data[0].topics});
      this.setState({open_topic:this.state.topics[0]});
      this.setState({open_topic_index: 0 });
      // console.log("Data4443",this.state.topics,this.state.open_topic);
    });
  }
  updateTopic = (index) => {
    this.setState({open_topic:this.state.topics[index]});
    this.setState({open_topic_index: index });
    console.log("Topic Changed to ",this.state.open_topic)
  }
  render(){
    let topic = this.state.open_topic;
    const selected = this.state.selected;
    let prop = {update_topic: this.updateTopic, state: this.state}
    // console.log("propsss",prop);
    return (
      <div className="App">
      <div className="content">
            {/* <UserBar /> */}
            <Menu data={prop} />
            <Notebook data={prop}/>
            <div id="extra">
            </div>
        </div>
    </div>
  );
}
}

export default App;
