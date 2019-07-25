
import React, { Component } from 'react';
import axios from 'axios';
//import ReactImageMagnify from 'react-image-magnify';
import {Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { profil: [] };

    }
    componentDidMount() {
        axios.get('http://localhost:8080/affichertous')
            .then(response => {
                console.log(response.data);
                this.setState({ profil: response.data });
                localStorage.setItem('atelier',response.data._id)
            })
            .catch(function (error) {
                console.log(error);
            })

        

    }

    liste() {
        return <div>
            <div class="row">
                
                        {
                            (this.state.profil.length > 0) ? (this.state.profil.map((obj) => {
                                return (
<div class="col-md-4 carde">
<div class="card">




<div class="card-body">

  
  <h4 class="card-title" id="titrebe"><center>{obj.titre}</center> </h4>
  <div className="container"><img width="90%" height="300px" src={'http://localhost:8080/user/'+obj.image} alt="pdp" /></div>
  <p class="card-text">Description: {obj.description}</p>
  <p class="card-text">Date:{obj.date}</p>
  <p class="card-text">Horaire de debut:{obj.debut}</p>
  <p class="card-text">Durée: {obj.dure}</p>
  <p class="card-text">Nombre de place disponible:{obj.place_dispo}</p>
  <p class="card-text">Nombre de place reserve: {obj.place_reserve}</p>
  <p class="card-text">Prix: {obj.prix}</p>
  <Link className="btn btn-primary" to={"/particulier/"+obj._id} onClick={()=>{
      console.log(obj.id2);
      localStorage.setItem('ti',obj._id)
      
  }}>  S'inscrire </Link>

</div>
</div>
</div>)



                            })) : ('')
                        }
                
        </div>
        </div>
    }
    render() {
        return (
            <div >
                {this.liste()}
            </div>
        );
    }
}