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
                var id;
                if(use.length==0){
                    id=0
                }
                else{
                    id=use[use.length-1]._id+1
                }
                // if(!isValid) {
                //     return res.status(400).json(errors);
                // }
                // let imageFile1 = req.files.image;
                // console.log(req.files);
                
                //   imageFile1.mv(`${__dirname}/public/${req.body.titre}.jpg`, function(err) {
                //     if (err) {
                //       return res.status(500).send("err");
                //     }
                //                   })
                  
                        const atelier = new Atelier({
                            _id:id,
                            id2:user._id,
                            titre: req.body.titre , 
                            description: req.body.description,
                            date: req.body.date,
                            debut: req.body.debut,
                            dure: req.body.dure,
                            place_dispo: req.body.place_dispo,
                            place_reserve: req.body.place_reserve,
                            prix: req.body.prix,
                            //image:req.body.titre+".jpg",
                            visibilite:""
                            
                        });
                      

   
  
                        
                                        atelier
                                            .save()
                                            .then(user => {
                                                res.json(user)
                                            }).catch(use=>console.log("ereue")
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
//              console.log( "./route.js/public/"+produit[i].image);
             
//              var image= fs.readFileSync("./route.js/public/"+produit[i].image)
//     res.send(image)
//           })
//         }
//     })

              
}
//router.post("/particulier/:_id",
exports.createparticulier= (req,res)=>{
    Particulier.find().then(use=>{
        // const { errors, isValid } = validateRegisterInput(req.body);
        var id;
        if(use.length==0){
            id=0
        }
        else{
            id=use[use.length-1]._id+1
        }
        
       
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
                    //image:use.titre,
                
                }).then(upd=>console.log(upd)
                )
                                particulier
                                    .save()
                                    .then(user => {
                                        res.json(user)
                                    }); 
                                });         
                            
                        }); 
}

//router.get("/ateliermasquer/:_id",
 exports.masquer= (req,res)=>{
   Atelier.findOneAndUpdate(use._id, { 
        visibilite:"false"
    
    },{new:true}).then(upd=>res.send(upd)
    )

}

//router.get("/atelieraffichier/:_id",
exports.gestion=  (req,res)=>{
    // Atelier.findById(req.params._id).then(use=>{
        Atelier.findOneAndUpdate({_id:req.params._id}, {
         
            visibilite:"true"
        
        },{new:true}).then(upd=>res.send(upd)
        )
    // })
}
