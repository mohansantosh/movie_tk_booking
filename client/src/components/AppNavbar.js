import React, {Component} from 'react';
/*
import { 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
  Container
} from 'reactstrap';
*/
import  {
    Navbar,
    NavItem,
    Icon
} from 'react-materialize';
import './loader.css'
import {
    Link
} from 'react-router-dom';
class AppNavbar extends Component{
    constructor(props){
        super(props);
    this.state = {
        isOpen: false
        };
    this.handleMovieClick = this.handleMovieClick.bind(this);
    }

    toggle  = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })};

    handleMovieClick() {
        <Link to = {'/allmovies'} />
    }
    
    render(){
        return(
        <div>
        <a href="/">
            <Navbar left fixed className='#01579b light-blue darken-4'>
                <img  src="./logo.png"  height="60" width="152" style = {{marginLeft: "817px"}} />
                <NavItem href = '/' ><Icon>home</Icon></NavItem>
                <NavItem href = '/allmovies' className='font-size'>MOVIES</NavItem>
                <NavItem  href = '/allmovies'className='font-size'>CINEMAS</NavItem>
            </Navbar>
        </a>
        </div>
        );
    }
};

export default AppNavbar;