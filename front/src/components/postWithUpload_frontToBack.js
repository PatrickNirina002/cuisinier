
import React from 'react';

class PostFrontToBack extends React.Component {
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
      photo_profil:''

    };
    this.onChange = this.onChange.bind(this)
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }




  onChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
}





  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('photo_profil', this.uploadInput.files[0]);
    data.append('titre',this.state.titre);
    data.append('description',this.state.description);
    data.append('date',this.state.date);
    data.append('debut',this.state.debut);
    data.append('dure',this.state.dure);
    data.append('place_dispo',this.state.place_dispo);
    data.append('place_reserve',this.state.place_reserve);
    data.append('prix',this.state.prix);
    fetch('http://localhost:8080/profil', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ photo_profil: `http://localhost:8080/profil/${body.photo_profil}` });
        console.log('ity ilay body.fil',body.photo_profil);
       
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
       photo_profil:''
    })
    
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage }
       
      >
        <label>titre:</label>
        <input type="text"
          value={this.state.value}
          onChange={this.onChange}
          name="titre" /><br></br>
          <label>Description:</label>
        <input type="text"
          value={this.state.value}
          onChange={this.onChange}
          name="description" /><br></br>
        <label>date:</label>
        <input type="text"
          value={this.state.value}
          onChange={this.onChange}
          name="date" /><br></br> 
          <label>Debut:</label>
        <input type="text"
          value={this.state.value}
          onChange={this.onChange}
          name="debut" /><br></br> 
          <label>Durée:</label>
        <input type="text"
          value={this.state.value}
          onChange={this.onChange}
          name="dure" /><br></br>   
          <label>Nombre de place disponible:</label>
        <input type="text"
          value={this.state.value}
          onChange={this.onChange}
          name="place_dispo" /><br></br> 
          <label>Nombre de place reservée:</label>
        <input type="text"
          value={this.state.value}
          onChange={this.onChange}
          name="place_reserve" /><br></br>    
          <label>Prix:</label>
        <input type="text"
          value={this.state.value}
          onChange={this.onChange}
          name="prix" /><br></br>   
      
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="photo_profil"/>
       
          <input type="submit" class="fadeIn fourth" value="Ajouter"/>
      </form>
    );
  }
}

export default PostFrontToBack;
