const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    _id: {type:Number, required:true},
    id2:{
        type:Number
    },
    titre: { type: String, required: true},
    description: { type: String, required: true},
    date: { type: String, required: true },
    debut: { type: String, required: true },
    dure: { type: Number, required: true },
    place_dispo: { type: Number, required: true },
    place_reserve: { type: Number, required: true },
    prix: { type: Number, required: true },
    photo_profil:String,
    visibilite: {
        type:String   
    },

},
{
    timestamps: true
}
);

module.exports = mongoose.model('profile', UserSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
