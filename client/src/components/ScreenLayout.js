import React, { Component } from 'react';
import axios from 'axios';
import {
    Row,
    Col
} from 'react-bootstrap';

import {
    Card,
    Container
} from 'reactstrap';

import Seat from './Seat'

export default class ScreenLayout extends Component {
    constructor(props){
        super(props);
        this.state ={
            id: this.props.theater_id,
            screenLayout: [{
                    row: "A",
                    seats: [1,2,3,4,5,6,7,8,9,10]
                },
                {
                    row: "B",
                    seats: [1,2,3,4,5,6,7,8,9,10]
                },
                {
                    row: "C",
                    seats: [1,2,3,4,5,6,7,8,9,10]
                },
                {
                    row: "D",
                    seats: [1,2,3,4,5,6,7,8,9,10]
                },
                {
                    row: "E",
                    seats:[1,2,3,4,5,6,7,8,9,10] 
                },
                {
                    row: "F",
                    seats: [1,2,3,4,5,6,7,8,9,10]
                },
                {
                    row: "G",
                    seats: [1,2,3,4,5,6,7,8,9,10]
                },
                {
                    row: "H",
                    seats: [1,2,3,4,5,6,7,8,9,10]
                },
                {
                    row: "I",
                    seats: [1,2,3,4,5,6,7,8,9,10]
                },
                {
                    row: "J",
                    seats: [1,2,3,4,5,6,7,8,9,10]
                },
                {
                    row: "K",
                    seats: [1,2,3,4,5,6,7,8,9,10]
                },
                {
                    row: "L",
                    seats: [1,2,3,4,5,6,7,8,9,10]
                }
            ]
        }
/*
        axios.get('/api/screen_layout/this.props.theater_id')
            .then((res)=>{
                this.setState({layout_grid: res.body.layout_grid})
            }
        )
*/
    }
   render() {

    const screenLayout = this.state.screenLayout;
    return (
      <div>
          <Card inverse style={{ backgroundColor: 'rgba(6,4,4,0)' }}>
            <Container style={{width: 'initial'}}>
            {
                screenLayout.map(({row,seats}) => {
                    return(
                            <Row>
                                <Col> {row}</Col>
                                {
                                    seats.map((seat) => 
                                                <Seat bookingStatus={true} isSelected={false} seatNo={row.concat(seat)} addSelectedSeat={this.props.addSelectedSeat}  removeSelectedSeat = {this.props.removeSelectedSeat}/>

                                        )
                                }
                                <Col> {row}</Col>
                            </Row>
                        )
                })

            }
            </Container>

          </Card>
      </div>
    )
 }
}
