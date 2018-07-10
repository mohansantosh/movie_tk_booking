import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import CinemaHomePage from './components/CinemaHomePage'
import './App.css';


class App extends Component {
  componentWillMount(){
    //document.body.style.backgroundColor = "beige";
    document.body.background = "http://bsnscb.com/data/out/38/27220577-cinema-wallpapers.jpeg";
    //document.body.style.backgroundImage = "http://bsnscb.com/data/out/38/27220577-cinema-wallpapers.jpeg";
}
  render() {
    return (

      <div className="App">
        <AppNavbar/>
        <CinemaHomePage />
      </div>
    );
  }
}

export default App;
