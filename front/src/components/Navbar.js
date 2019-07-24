import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }
    state = {
        isOpen: false
      };
      
      toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            // <ul className="navbar-nav ml-auto">
            //     <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
            //         <img src={user.avatar} alt={user.name} title={user.name}
            //             className="rounded-circle"
            //             style={{ width: '25px', marginRight: '5px'}} />
            //                 Logout
            //     </a>


            //     <li className="nav-item">
            //     <Link className="nav-link" to="/poster">Poster</Link>
            // </li>
               
            
            // </ul>
            <MDBNavbar  color="default-color" dark expand="md" id="eto">
            
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav left>
              <MDBNavItem>
            <MDBNavLink to="/client">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/poster">Poster</MDBNavLink>
          </MDBNavItem>
                
                <MDBNavItem>
                  <MDBDropdown>
                    
                    
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                
            
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="#!" onClick={this.onLogout.bind(this)}>Logout</MDBDropdownItem>
                      
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
 
        )
      const guestLinks = (
        // <ul className="navbar-nav ml-auto">
        //     {/* <li className="nav-item">
        //         <Link className="nav-link" to="/register">Sign Up</Link>
        //     </li> */}
        //     <li className="nav-item">
        //     <Link className="navbar-brand" to="/client">Home</Link>
        //     </li>
        //     <li className="nav-item">
        //         <Link className="nav-link" to="/login">Sign In</Link>
        //     </li>
            
        // </ul>
   <MDBNavbar  color="default-color" dark expand="md" id="eto">
            
   <MDBNavbarToggler onClick={this.toggleCollapse} />
   <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
     <MDBNavbarNav left>
     <MDBNavItem>
   <MDBNavLink to="/client">Home</MDBNavLink>
 </MDBNavItem>
 
       
       <MDBNavItem>
         <MDBDropdown>
           
           
         </MDBDropdown>
       </MDBNavItem>
     </MDBNavbarNav>
     <MDBNavbarNav right>
       
     <MDBNavLink className="waves-effect waves-light" to="/login">
              Connecter
            </MDBNavLink>
     </MDBNavbarNav>
   </MDBCollapse>
 </MDBNavbar>
     


      )
        return(
            
                
                <div  id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
           
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));