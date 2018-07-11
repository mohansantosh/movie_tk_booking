import React, { Component } from 'react';
import axios from 'axios';
import {
    Row,
    Card
} from 'reactstrap';

import Seat from './Seat'

export default class ScreenLayout extends Component {
    constructor(props){
        super(props);
        this.state ={
            id = this.props.theater_id,
            layoutGrid = {
                "A":[1,2,3,4,5]
            }
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
                        {
                            seats.map((id) => {
                                return(
                                    <Seat bookingStatus={true} isSelected={false} seatNo={id} />
                                );
                            });
                        }
                    </Row>
                );
            })
          }
          </Container>
          </Card>
      </div>
    )
  }
}
