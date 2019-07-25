
import React from 'react';

class Modifier extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     titre: '',
     description:'',
      date:'',
      debut:'',
      dure:'',
      place_dispo:'',
      place_reserve:'',
      prix:'',
     image:''

    };
    this.onChange = this.onChange.bind(this)
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }




  onChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
}

// componentDidMount(){
//   //this.state.profil+=localStorage.getItem('ii')
//   this.setState( {profil:localStorage.getItem('id')} )
//   // this.setState( {email:sessionStorage.getItem('i')} )
//   // this.setState( {password:sessionStorage.getItem('iii')} )
//   console.log(this.state.profil);
  
// }



  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('image', this.uploadInput.files[0]);
    data.append('titre',this.state.titre);
    data.append('description',this.state.description);
    data.append('date',this.state.date);
    data.append('debut',this.state.debut);
    data.append('dure',this.state.dure);
    data.append('place_dispo',this.state.place_dispo);
    data.append('place_reserve',this.state.place_reserve);
    data.append('prix',this.state.prix);
    fetch('http://localhost:8080/profil/'+this.props.match.params._id, {
      method: 'PUT',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ image: `http://localhost:8080/profil/${body.image}` });
        console.log('ity ilay body.fil',body.image);
       
      });
    });
    this.setState({
      titre: '',
      description:'',
       date:'',
       debut:'',
       dure:'',
       place_dispo:'',
      place_reserve:'',
      prix:'',
       image:''
    })
    
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage }
       
      >
       <div className="form-group">
        <label>titre:</label>
        <input type="text"
        className="form-control"
          value={this.state.value}
          onChange={this.onChange}
          name="titre" /><br></br></div>
          <div className="form-group">
          <label>Description:</label>
        <input type="textarea"
        className="form-control"
          value={this.state.value}
          onChange={this.onChange}
          name="description" /><br></br></div>
          <div className="form-group">
        <label>date:</label>
        <input type="date"
        className="form-control"
          value={this.state.value}
          onChange={this.onChange}
          name="date" /><br></br> </div>
          <div className="form-group">
          <label>Debut:</label>
        <input type="time"
        className="form-control"
          value={this.state.value}
          onChange={this.onChange}
          name="debut" /><br></br> </div>
          <div className="form-group">
          <label>Durée:</label>
        <input type="time"
        className="form-control"
          value={this.state.value}
          onChange={this.onChange}
          name="dure" /><br></br>  </div>
          <div className="form-group"></div> 
          <label>Nombre de place disponible:</label>
        <input type="text"
        className="form-control"
          value={this.state.value}
          onChange={this.onChange}
          name="place_dispo" /><br></br> 
          <div className="form-group">
          <label>Nombre de place reservée:</label>
        <input type="text"
        className="form-control"
          value={this.state.value}
          onChange={this.onChange}
          name="place_reserve" /><br></br> </div> 
          <div className="form-group"> 
          <label>Prix:</label>
        <input type="text"
        className="form-control"
          value={this.state.value}
          onChange={this.onChange}
          name="prix" /><br></br>   </div> 
      
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="image"/>
       
          <input type="submit" class="fadeIn fourth" value="Ajouter"/>
      </form>
    );
  }
}

export default Modifier;
