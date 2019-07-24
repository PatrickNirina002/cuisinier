
import React, { Component } from 'react';
import axios from 'axios';
//import ReactImageMagnify from 'react-image-magnify';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { profil: [] };

    }
    componentDidMount() {
        axios.get('http://localhost:8080/profil')
            .then(response => {
                console.log('i am a response', response)
                this.setState({ profil: response.data });
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
<div class="col-md-2 carde">
<div class="card">




<div class="card-body">

  
  <h4 class="card-title">{obj.titre}</h4>
  <img width="250px" height="250px" src={'http://localhost:8080/user/'+obj.photo_profil} alt="pdp" />
  <p class="card-text">{obj.description}</p>
  <p class="card-text">{obj.date}</p>
  <p class="card-text">{obj.debut}</p>
  <p class="card-text">{obj.dure}</p>
  <p class="card-text">{obj.place_dispo}</p>
  <p class="card-text">{obj.place_reserve}</p>
  <p class="card-text">{obj.prix}</p>
  <a data-toggle="tooltip" data-placement="top" title="Add to Cart">  <i class="fas fa-shopping-cart grey-text ml-3"></i> </a>

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