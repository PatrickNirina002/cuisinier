
import React, { Component } from 'react';
import axios from 'axios';
import ReactImageMagnify from 'react-image-magnify';
import 'react-confirm-alert/src/react-confirm-alert.css'
//import { confirmAlert } from 'react-confirm-alert'
import { Link} from "react-router-dom";
export default class ListTous extends Component {
    

    constructor(props) {
        super(props);
        this.state = { profil: [] ,pan:''};
        

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
<div class="card"     >




<div class="card-body">
    



<div >
<div className="imag">
<h4 class="card-title text-center">{obj.nom}</h4>
<ReactImageMagnify {...{
    smallImage: {
         alt: 'Wristwatch by Ted Baker London',
         isFluidWidth: true,
         src: 'http://localhost:8080/user/'+obj.photo_profil,
        
    },
    largeImage: {
        src: 'http://localhost:8080/user/'+obj.photo_profil,
        width: 1200,
        height: 1800
    }
}} />
</div>
  
 
<p class="card-text text-dark">{obj.email}</p>
  <div className='row'>
      <div className="col-md-6"></div>
         <div className="col-md-6">

            
            <span  class="card-text text-dark">{obj.password}</span><br/>
        </div>
  </div>
  <div className='row'>
      <div className="col-md-3"></div>
         <div className="col-md-9 titi">

         
</div>          
         <a data-toggle="tooltip" data-placement="top" title="Add to Cart" className="titi">  <i class="text-primary fas fa-shopping-cart grey-text ml-3" 
    onClick={()=>{
          console.log(obj);
        // //obj.nom='';
        // this.state.pan+=obj.nom;
        // this.setState({pan:this.state.pan+obj.nom})
        //  obj.nom +=obj.nom;
        var tab=[];
        
        tab.push(obj);
         var json = JSON.stringify(tab);
        
         
        
        json = localStorage.getItem('ii')
        this.setState(localStorage.setItem('ii',json))
        console.log(json);
        //sessionStorage.setItem('i',monobjet_json);
        
        
    }}
         >Ajouter au panier</i> </a>
         
         



 <Link to={"/edit/"+obj._id} className="btn btn-primary">Edit</Link>
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


// onClick={()=>{
//     confirmAlert({
//         customUI: () => {
//             return (
//                 <div>
//                     <h1 className="text-center">{obj.nom}</h1>
//                     <img className="pop" src={'http://localhost:8080/user/'+obj.photo_profil} alt="pdp" />
//                     <p>{obj.email}</p>
//                     <p>{obj.password}</p>
//                 </div>
//             )
//  }
// })}}