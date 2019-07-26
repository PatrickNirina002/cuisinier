
import React, { Component } from 'react';
import axios from 'axios';
//import ReactImageMagnify from 'react-image-magnify';
import { Link } from 'react-router-dom';
import Activer from './boutonactive'
export default class Chacun extends Component {

    constructor(props) {
        super(props);
        
        this.handleActive = this.handleActive.bind(this);
        this.handleDesactive = this.handleDesactive.bind(this);
        this.state = { profil: [] ,visibilite:false};
    }


    handleActive(){
        this.setState({visibilite:true})
    }
    handleDesactive(){
        this.setState({visibilite:false})
    }

    componentDidMount() {
        axios.get('http://localhost:8080'+this.props.location.pathname)
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
<div class="col-md-6 carde">
<div class="card">




<div class="card-body">

  
  <h4 class="card-title" id='titrebe'
  onClick={()=>{
      console.log(obj._id);
      localStorage.setItem('atelier',obj._id);
      
  }}><center>{obj.titre}</center> </h4>
  <img width="100%" height="300px" src={'http://localhost:8080/user/'+obj.image} alt="pdp" />
  <p class="card-text">Description: {obj.description}</p>
  <p class="card-text">Date: {obj.date}</p>
  <p class="card-text">Horaire de debut: {obj.debut}</p>
  <p class="card-text">Durée: {obj.dure}</p>
  <p class="card-text">Nombre de place disponible: {obj.place_dispo}</p>
  <p class="card-text">Nombre de place reserve: {obj.place_reserve}</p>
  <p class="card-text" onClick={()=>{
console.log(obj._id);

  }}>Prix: {obj.prix}</p>
  <div className='row'>
      <div className='col-md-6'>
  <Link to={'/profil/'+obj._id} className="btn btn-primary">Edit</Link></div>


  <div>
  <div className='col-md-6'>
            {this.state.visibilite ? (<div>
    <button className='btn btn-primary' onClick={(e)=>{
        e.preventDefault()
         axios.get("http://localhost:8080/masquer/"+obj._id).then(res=>console.log(res.data)
         )
         this.handleDesactive()
        }}>Desactiver</button>
   
      </div>):(<div>
    <button className='btn btn-primary' onClick={(e)=>{
        e.preventDefault()
        axios.get("http://localhost:8080/affichier/"+obj._id).then(res=>console.log(res.data)
        )
        this.handleActive()
        }}>Activer</button>
   
      </div>)}  
      </div>
             </div>
             </div>
        

 

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