import React, { Component } from 'react';
import axios from 'axios';
import {

} from 'react-bootstrap';

import {
    Preloader
} from 'react-materialize';
import {
    Card,
    Container,
    Row,
    Col
} from 'reactstrap';

import Seat from './Seat'
import './loader.css'

export default class ScreenLayout extends Component {
    constructor(props){
        super(props)
        this.state ={
            showId: this.props.showId,
            blocked_seats: null,
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


    }

    componentDidMount(){
       const showId = this.state.showId;
        axios.get(`/api/tickets/blocked_seats/${showId}`)
            .then((res)=>{
                this.setState({blocked_seats: res.data})
            }
        )

    }
   render() {

    const screenLayout = this.state.screenLayout;
    const blocked_seats = this.state.blocked_seats;
    return (     
        (blocked_seats !== null) ? (
        <div>
            <Card inverse style={{ backgroundColor: 'rgba(6,4,4,0)' }}>
                <Container style={{width: 'initial'}}>
                {
                    screenLayout.map(({row,seats}) => {
                        return(
                                <Row className='seat-bottom-margin'>
                                    <Col> {row}</Col>
                                    {
                                        seats.map((seat) => {
                                                    const seatNo = row.concat(seat);
                                                    const  bookingStatus = blocked_seats.includes(seatNo);
                                                    return <Seat bookingStatus={!bookingStatus} isSelected={false} seatNo={seatNo} addSelectedSeat={this.props.addSelectedSeat}  removeSelectedSeat = {this.props.removeSelectedSeat}/>

                                        })
                                    }
                                    <Col> {row}</Col>
                                </Row>
                            )
                    })

                }
                </Container>
                <Container>
                    <img src='https://img.spicinemas.in/resources/images/screen-this-way.png' />
                </Container>
            </Card>
        </div>
            ) : ( <div>
                <Container width = "100%">
                    <Preloader className = 'top' size='big'/>
                    </Container>
            </div>)
    )
 }
}
