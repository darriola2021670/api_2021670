const {Schema, model} = require('mongoose');

const AnimalSchema = Schema({
    nombre:{
            type: String,
            required: [true,'El nombre es obligatorio'],
    },
    raza:{
        type: String,
        required: [true, 'La raza del animal es obligatoria'],
    },
    img:{
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    }
    
});

module.exports = model('Animal', AnimalSchema); 