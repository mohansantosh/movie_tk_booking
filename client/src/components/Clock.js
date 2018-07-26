import React from 'react'; // npm install react
import ReactDOM from 'react-dom'; // npm install react-dom

class Clock extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };

    this.tick = this.tick.bind(this);
  }
  
  tick() {
    this.setState({
      date: new Date()
    })
  }
  componentDidMount() {
    this.timerId = setInterval(() => { this.tick }, 1000)
  }
  
  componentWillUnmount() {
    this.clearInterval()
  }
  render() {
    return (
      <div>
        <h2>{this.state.date.toLocaleString()}</h2>
      </div>
    );
  }
}

export default Clock;