
import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangenom = this.onChangenom.bind(this);
    this.onChangemail = this.onChangemail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nom: '',
      email: '',
      password:''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:8080/edit/'+this.props.location.pathname)
          .then(response => {
              this.setState({ 
                nom: response.data.nom, 
                email: response.data.email,
                password: response.data.password });
                console.log(response);
                
                
          })
          
          .catch(function (error) {
              console.log(error);
          })
          console.log(this.props.match.params.id);
          //console.log(this.props.match.params.nom);
          //console.log(this.prof.nom);
          
    }

  onChangenom(e) {
    this.setState({
      nom: e.target.value
    });
  }
  onChangemail(e) {
    this.setState({
      email: e.target.value
    })  
  }
  onChangepassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      nom: this.state.nom,
      email: this.state.email,
      password: this.state.password
    };
    axios.put('http://localhost:8080/profil/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
   //this.props.history.push('/profil');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Nom:</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Person Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.nom}
                      onChange={this.onChangenom}
                      />
                </div>
                <div className="form-group">
                    <label>description: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChangemail}
                      />
                </div>
                <div className="form-group">
                    <label>Prix: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.password}
                      onChange={this.onChangepassword}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Business" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}