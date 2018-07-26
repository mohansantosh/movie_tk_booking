import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import './App.css';
import Main from './components/Main';

class App extends Component {
  constructor(props){
    super(props)
    document.body.background = "./background.jpg";

}
  render() {
    return (
      <div className="App">
        <AppNavbar/>
        <Main/>
      </div>
    );
  }
}

export default App;
