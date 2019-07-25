
import React, { Component } from 'react';
import axios from 'axios';
//import ReactImageMagnify from 'react-image-magnify';

export default class ListTous extends Component {

    constructor(props) {
        super(props);
        this.state = { profil: [] };

    }
    componentDidMount() {
        axios.get('http://localhost:8080/affichertous')
            .then(response => {
                console.log(response.data._id);
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
<div class="col-md-2 carde">
<div class="card">




<div class="card-body">

  
  <h4 class="card-title">{obj.titre}</h4>
  <img className='imag' src={'http://localhost:8080/user/'+obj.image} alt="pdp" />
  <p class="card-text">{obj.description}</p>
  <a  class="btn btn-primary">{obj.date}</a><br/>
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