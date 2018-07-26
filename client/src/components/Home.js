import React, { Component } from 'react'
import {
  Carousel
} from 'react-materialize';
import { Container } from 'reactstrap';

export default class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null
    };
  }

  handleSelect(selectedIndex, e) {
    alert(`selected=${selectedIndex}, direction=${e.direction}`);
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    const { index, direction } = this.state;

    return (
    <div>
      <Container style = {{paddingTop: '30px'}}>
          <Carousel options={{ fullWidth: true , duration: 50, indicators: true, noWrap: false}}>
            <a href='./listing/5b4b138b84d68a51553bc1d4'><img src = './image-1.jpg'></img></a>
            <a href='./listing/5b4b137284d68a51553bc1d3'><img src = './image-2.jpg'></img></a>
            <a href='./listing/5b4b137284d68a51553bc1d3'><img src = './image-3.jpg'></img></a>
          </Carousel>
      </Container>
    </div>
    );
  }
}
