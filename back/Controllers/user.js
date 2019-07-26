const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../Models/User');
const Atelier = require('../Models/article');
const Particulier = require('../Models/particulier');
const fs = require('fs');
//router.post('/register', function
exports.create= (req, res)=> {
 User.find().then(use=>{
    if(use.length == 0){
        idautom = 0
    }else {
        idautom = parseInt(use[use.length - 1]._id) + 1
    }
 }

 )
    const { errors, isValid } = validateRegisterInput(req.body);
    let idautom;
  
    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                _id:idautom,
                name: req.body.name,
                prenom:req.body.prenom,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
}

//router.post('/login', 
exports.login= (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                avatar: user.avatar
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        id: user.id,
                                        name: user.name,
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
}

//router.get('/me', passport.authenticate('jwt', { session: false }), 
exports.logout=(req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
}

exports.crea = (req, res) => {
    res.setHeader('Content-type', 'text/plain');
    User.findById(req.params._id).then(user=>{
        
        if(!user){
            res.send("intouvable")
        }
        else{
            Atelier.find().then(use=>{
                // const { errors, isValid } = validateRegisterInput2(req.body);
                var idautom;
                if(use.length==0){
                    idautom=0
                }
                else{
                    idautom=use[use.length-1]._id+1
                }
                let imageFile = req.files.image;
                //console.log('inona ny ato o!'+imageFile)
                let nomImage = idautom
                res.setHeader('Content-Type', 'text/plain');
        
                imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
                  if (err) {
                    return res.status(500).send(err);
                  }
                  
                  
                  //res.send({file:`public/${nomImage }.jpg`});
                  
                  
                });
            
                  
                        const atelier = new Atelier({
                            _id:idautom,
                            id2:user._id,
                            titre: req.body.titre , 
                            description: req.body.description,
                            date: req.body.date,
                            debut: req.body.debut,
                            dure: req.body.dure,
                            place_dispo: req.body.place_dispo,
                            place_reserve: req.body.place_reserve,
                            prix: req.body.prix,
                            image:'' + nomImage +'.jpg',
                            visibilite:""
                            
                        });
                      

   
  
                        
                                        atelier
                                            .save()
                                            .then(user => {
                                                res.json(user)
                                                console.log(user);
                                                
                                            }).catch(use=>console.log(use)
                                            ) 
                                    
                                });   
        }
     
    })
}
//router.get("/cuisinier/:_id",
exports.getCuis=  (req, res) => {
       
    Atelier.find().then(user=>{
        const tab=[]
        for(let i=0;i<user.length;i++){
            if(user[i].id2==req.params._id){
              tab.push(user[i])
              console.log(tab);
              
            }
           
        }
        if(tab.length>0){
            res.send(tab)   
        }
        else{
            res.send([])
         } 
        
     
    })
//   Atelier.find().then(produit=>{
//         for(let i=0;i<produit.length;i++){
//           router.get("/public/"+produit[i].image,(req,res)=>{
//               var fs = require("fs")
//              console.log( "./Controllers/public/"+produit[i].image);
             
//              var image= fs.readFileSync("./Controllers/public/"+produit[i].image)
//     res.send(image)
//           })
//         }
//     })

              
}
//router.post("/particulier/:_id",
exports.createparticulier= (req,res)=>{


    Particulier.find().then(us=>{
        
        if(us.length==0){
            id=0
        }
        else{
            id=us[us.length-1]._id+1
        }
     }
    
     )

   


    Particulier.findOne({
        email: req.body.email
    }).then(use=>{
        if(use) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else{
        // const { errors, isValid } = validateRegisterInput(req.body);
        // var id;
        // if(use.length==0){
        //     id=0
        // }
        // else{
        //     id=use[use.length-1]._id+1
        // }
        
       
        Atelier.findById(req.params._id).then(use=>{
                const particulier = new Particulier({
                    _id:id,
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    telephone:req.body.telephone,
                    
                    
                });
                Atelier.findByIdAndUpdate(use._id, { _id:use.id,
                    id2:use.id2,
                    titre: use.titre,
                    description: use.description,
                    date: use.date,
                    debut: use.debut,
                    dure:use.dure,
                    place_reserve: use.place_reserve+1,
                    place_dispo: use.place_dispo-1,
                    prix:use.prix,
                   image:use.image,
                
                }).then(upd=>console.log(upd)
                )
                                particulier
                                    .save()
                                    .then(user => {
                                        res.json(user)
                                    }); 
                                });         
                            
                            }

                        }); 
}

//router.get("/ateliermasquer/:_id",
 exports.masquer= (req,res)=>{
    Atelier.findOneAndUpdate(req.param._id, { 
        visibilite:false
    
    },{new:true}).then(upd=>res.send(upd)
    )

}

//router.get("/atelieraffichier/:_id",
exports.gestion=  (req,res)=>{
    // Atelier.findById(req.params._id).then(use=>{
        Atelier.findOneAndUpdate({_id:req.params._id}, {
         
            visibilite:true
        
        },{new:true}).then(upd=>res.send(upd)
        )
    // })
}
//router.get("/atelier",
//  exports.afficher=(req, res) => {
       
//     Atelier.find().then(user=>{
//                console.log(user);
               
//                 res.send(user)
            
           
        
     
//     })

//     Atelier.find().then(produit=>{
//         for(let i=0;i<produit.length;i++){
//           router.get("/hafa/"+produit[i].image,(req,res)=>{
//               var fs = require("fs")
//              console.log( "./Controllers/public/"+produit[i].image);
             
//              var image= fs.readFileSync("./Controllers/public/"+produit[i].image)
//     res.send(image)
//           })
//         }
//     })
          
// }
// exports.afficher = (req, res) => {   
//     Atelier.find()
//     .then(users => {    
//         res.send(users);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Something wrong while retrieving profils."
//         });
//     });
// };
// exports.lireImage =(req, res) =>{
//     try {
//         let picture = fs.readFileSync('./Controllers/public/'+req.params.image)
//         res.write(picture)
//         res.end()
//     } catch (e) {
//         console.log("erreur be miitsy", e.stack);
//     }
//}
exports.findOneArticle = (req, res) => {
    try {
        let picture = fs.readFileSync('./Controllers/public/' + req.params.image)
        console.log('params: ', req.params.image);
        res.write(picture)
        res.end()
    }
    catch (e) { console.log("envoie erroné: ", e); }
}
exports.findAllArticle = (req, res) => {
    Atelier.find()
        .then(article => {
            console.log(article);
            
            res.send(article);
        }).catch(err => {
            res.status(500).send(article => {
                message: err.message || "Something wrong while retrieving profils."
            });
        });
};
exports.update = (req, res) => {
    // Validate Request()
    console.log('ity ny requete'+req.body.titre)
    if(!req.body.titre || !req.body.description) {
        return res.status(400).send({
            message: "eleve content can not be empty"
        });
    }
    console.log('ity n params'+req.params._id)
    let imageFile = req.files.image;
        //console.log('inona ny ato o!'+imageFile)
        let nomImage = req.params._id
        res.setHeader('Content-Type', 'text/plain');

        imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
        console.log('tonga eto v nw')
    // Find and update eleve with the request body
    Atelier.findByIdAndUpdate(req.params._id, {
        titre: req.body.titre , 
                            description: req.body.description,
                            date: req.body.date,
                            debut: req.body.debut,
                            dure: req.body.dure,
                            place_dispo: req.body.place_dispo,
                            place_reserve: req.body.place_reserve,
                            prix: req.body.prix,
          image:nomImage +'.jpg'

    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "eleve not found with id " + req.params._id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "eleve not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.id
        });
    });
};



exports.editebe= (req, res) =>{
    let id = req.params.id;
    Atelier.findById(id, function (err, profil){
        res.json(profil);
    });
  };