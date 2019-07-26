import React, { Component } from 'react';
import axios from 'axios';
import './login.css'
class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangemail = this.onChangemail.bind(this);
        this.onChangepass = this.onChangepass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          email: '',
          password: ''
        }
      }
      onChangemail(e) {
        this.setState({
          email: e.target.value
        });
      }
      onChangepass(e) {
        this.setState({
          password: e.target.value
        })  
      }
      onSubmit(e) {
        e.preventDefault();
        const obj = {
          email: this.state.email,
          password: this.state.password
        };
        axios.post('http://localhost:8080/login', obj)
            .then(res => {this.props.history.push('/admin')});
         
            //alert(res.data)
        this.setState({
          email: '',
          password: ''
        })
      }
    render() {
        return (
         
            <div class="wrapper fadeInDown important">
            <div id="formContent">
              <div class="fadeIn first">
            
              </div>
          <div>
              <form onSubmit={this.onSubmit}>
                <input type="text" id="login" class="fadeIn second"  placeholder="e-mail"
                value={this.state.email}
                onChange={this.onChangemail}/>
                <input type="text" id="password" class="fadeIn third"  placeholder="password"
                value={this.state.password}
                onChange={this.onChangepass}/>
                <input type="submit" class="fadeIn fourth" value="Log In"/>
              </form>
              </div>
              <div id="formFooter">
                <a class="underlineHover" href="ff">Forgot Password?</a>
              </div>
          
            </div>
          </div>
        );
    }
}

export default Login;