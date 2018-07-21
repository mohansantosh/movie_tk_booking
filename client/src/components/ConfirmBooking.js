import React from 'react';
import { Collapsible,CollapsibleItem,Card,CardTitle,Collection,CollectionItem,Tabs,Tab } from 'react-materialize';
import classnames from 'classnames';
import Container from 'react-materialize/lib/Container';
import Movie from './Movie';
import {
    Row,
    Col
} from 'reactstrap';
import Icon from 'react-materialize/lib/Icon';

export default class ConfirmBooking extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
    <Container>
        <Row>
        <Col sm={8}>
                <Card className='small'
                    header={<CardTitle image='https://img.spicinemas.in/resources/images/movies/jurassic-world-fallen-kingdom/1000x320.jpg'>Card Title</CardTitle>}>
                    I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.
                </Card>
            </Col>
         <Col>
            <Collection header='Offers'>
                <CollectionItem>Get Amazon 25% off <a href= '/'><small>Know More</small></a></CollectionItem>
                <CollectionItem>Get PayTM 25% off <a href= '/'><small>Know More</small></a></CollectionItem>
                <CollectionItem>Get ICICI 25% off <a href= '/'><small>Know More</small></a></CollectionItem>
                <CollectionItem>Get HDFC 25% off <a href= '/'><small>Know More</small></a></CollectionItem>
            </Collection>
        </Col>
      </Row>
      <Row>
        <Col sm = {6}>
            <Tabs className='tab-demo z-depth-1'>
                <Tab title="Test 1">Test 1</Tab>
                <Tab title="Test 2" >Test 2</Tab>
                <Tab title="Test 3">Test 3</Tab>
                <Tab title="Test 4">Test 4</Tab>
            </Tabs>
        </Col>
      </Row>
      </Container>
    );
  }
}
