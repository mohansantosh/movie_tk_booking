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

    handleMovieClick = () => {
        <Link to = {'/allmovies'} />
    }
    
    render(){
        return(
        <div>
        <a href="/">
            <Navbar left className='blue' fixed className='light-orange lighten-2'>
                <img  src="./logo.png"  height="59" width="248" style={{marginRight: "-633px"}}/>
                <NavItem><Link to = {'/'} ><Icon>home</Icon></Link></NavItem>
                <NavItem ><Link to = {'/allmovies'} >Movies</Link></NavItem>
                <NavItem ><Link to = {'/allmovies'} >Cinemas</Link></NavItem>
            </Navbar>
        </a>
        </div>
        );
    }
};

export default AppNavbar;