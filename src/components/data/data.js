// // component To export json data
import axios from 'axios';
const fs = require("fs");


function Data(file) {
    let json = Promise.all([
        // // fetch(`${file}`),
        // fetch(`${process.env.PUBLIC_URL}/World.json`),
        // fetch(`${process.env.PUBLIC_URL}/Circle.json`),
        // fetch(`http://localhost:3005/docs`),
        // fetch(`http://localhost:3005/docs`),
        fetch(file),
        // fetch(`/docs`),
      ])
      .then(responses => Promise.all(responses.map(resp => resp.json())));
      return (json);
};

function insertTopic(topic_name){
  console.log("here for process.:",topic_name,);
  var data = {"new_topic" : topic_name}
  axios.post('http://localhost:3005/docs/newtopic', data)
        .then(() => console.log('new topic sent'))
        .catch(err => {
          console.error(err);
        });
  // console.log("cell to be added","t i ",topic,"c i " , cell_index,"source ", source);
}

async function Notebook_data(topic){
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "fileName" : topic })
  };
  const response = await fetch('http://localhost:3005/docs/topics', requestOptions);
  const data = await response.json();
  // console.log("1012 ",data );
  // this.setState({ postId: data.id });
  return data;
}

async function updateCell(topic){
  // var source = source;
  // topic.cells[cell_index].source=source;
  await axios.post('http://localhost:3005/docs/update', topic)
            .then(() => console.log('topic cell updated'))
            .catch(err => {
              console.error(err);
            });
};

function insertCell(datafun,topic,cell_index,source,cell_type ){
      const content = {
        "cell_layout": {"cell_type":cell_type, "code_lan": "","img_format":""},
        "source" : "Add Edit Content Here....!"
      };
      topic.cells.splice(cell_index+1,0,content);
      axios.post('http://localhost:3005/docs', topic)
            .then(() => console.log('topic sent'))
            .catch(err => {
              console.error(err);
            });
      // console.log("cell to be added","t i ",topic,"c i " , cell_index,"source ", source);
}
export {Data,Notebook_data, insertCell,updateCell, insertTopic};