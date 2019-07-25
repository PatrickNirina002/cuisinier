const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    _id: {type:Number, required:true},
    id2:{
        type:Number
    },
    titre: { type: String},
    description: { type: String},
    date: { type: String},
    debut: { type: String },
    dure: { type: String },
    place_dispo: { type: Number },
    place_reserve: { type: Number },
    prix: { type: Number},
    image:String,
    visibilite: {
        type:String   
    },

},
{
    timestamps: true
}
);

module.exports = mongoose.model('atelier', UserSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
