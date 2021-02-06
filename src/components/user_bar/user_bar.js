import React , {Component } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import {Data} from './../data/data';
// import { render,Component } from 'react-dom';

// var data0 = [];
class user_bar extends Component {
    // state = {
    //     topics: []
    // // };
    // componentDidMount(){
    //     Data().then(data => { 
    //       this.setState({topics:data});
    //     //   this.setState({onScreenMap:this.state.maps[0]});
    //       console.log("Data4443",this.state.topics);
    //     });
    // }
    // // console.log("jyf",data0);
    render(){
    return (
        <nav class="navbar  navbar-expand-sm fixed-top  bg-dark">
					<span class="logo-image">
						{/* <img src="{% static data.icon %}" class="img-fluid"> */}
					</span>
					<div class="navbar-brand ml-2 " href="">
						one
					</div>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					
					<div class="collapse navbar-collapse my-2 " id="navbarSupportedContent">
						<ul class="navbar-nav mr-auto ">
							<div class="dropdown " ref="#">
								<button class="btn btn-outline-success my-2 my-sm-0"><a href="#slide1" class="btn-outline-success">Projects</a></button>
								<div class="dropdown-content">
									<b href="#">project</b>
									<b href="#">project</b>
								</div>
							</div>
							<div class="dropdown">
								<button class="btn btn-outline-success my-2 my-sm-0" >Tasks</button>
								<div class="dropdown-content">
									<b href="#">term</b>
								</div>
							</div>
							<div class="dropdown">
								<button class="btn btn-outline-success my-2 my-sm-0"><a href="react/" class="btn-outline-success">TimeLine</a></button>
								<div class="dropdown-content">
									<b href="#">Link 1</b>
									<b href="#">Link 2</b>
									<b href="#">Link 3</b>
								</div>
							</div>
							<div class="dropdown">
								<button  class="btn btn-outline-success my-2 my-sm-0" >Time</button>
								<div class="dropdown-content" aria-labelledby="navbarDropdown">
									<b  href="#">calendar</b>
									<b  href="#">stopwatch</b>
									<b  href="#">timer</b>
									<b  href="#">alarm</b>
									<b  href="#">reminder</b>
									<b  href="#">calculator</b>
								</div>
							</div>
							<div class="dropdown">
								<button  class="btn btn-outline-success my-2 my-sm-0"><a href="/g_docs" class="btn-outline-success">Google_Docs</a></button>
							</div>
						</ul>
						<form class="form-inline my-1 my-lg-0">
							<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
							<button class="btn btn-outline-success my-2 my-sm-0" type="submit">re-Search</button>
						</form>
					</div>
				</nav>
    );
    }
}
export default user_bar;