import React, { Component } from 'react';
import axios from 'axios';
//import  { Redirect } from 'react-router-dom'
class Register extends Component {
  constructor(props) {
    super(props);
    this.onChangenom = this.onChangenom.bind(this);
    this.onChangemail = this.onChangemail.bind(this);
    this.onChangepass = this.onChangepass.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nom:'',
      email: '',
      password: ''
    }
  }
  onChangenom(e) {
    this.setState({
      nom: e.target.value
    });
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
      nom:this.state.nom,
      email: this.state.email,
      password: this.state.password
    };
    axios.post('http://localhost:8080/register', obj)
        .then(res => console.log (res.data));
    
    this.setState({
      nom:'',
      email: '',
      password: ''
    })

  }
render() {
    return (
     
     

<div className="footere">
<form class="form-horizontal" onSubmit={this.onSubmit}>
  <fieldset>
    <div id="legend">
      <legend class="">Créer de compte</legend>
    </div>
    <div class="control-group">
      <label class="control-label"  for="username">nom</label>
      <div class="controls">
        <input type="text" id="username" name="username" placeholder="" class="input-xlarge champ"
         value={this.state.nom}
         onChange={this.onChangenom}/>
      </div>
    </div>
 
    <div class="control-group">
   
      <label class="control-label" for="email">E-mail</label>
      <div class="controls">
        <input type="text" id="email" name="email" placeholder="" class="input-xlarge champ"
           value={this.state.email}
           onChange={this.onChangemail}/>
      </div>
    </div>

 
  

 <div class="control-group">
   
   <label class="control-label" for="email">password</label>
   <div class="controls">
     <input type="password" id="email" name="email" placeholder="" class="input-xlarge champ"
        value={this.state.password}
        onChange={this.onChangepass}/>
   </div>
 </div>
 
 
 
 
  
 
    <div class="control-group">
     
      <div class="controls">
        <button class="btn btn-success">Register</button>
      </div>
    </div>
  </fieldset>
</form>
</div>
    );
}
}

export default Register;