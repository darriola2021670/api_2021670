const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Animal = require('../models/animal');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol) {
        throw new Error(`El role ${role} no existe en la base de datos`);
    }
}

const existenteEamil = async(correo = '') =>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail) {
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}


const existentesId = async(id = '') =>{
    const existenteId = await Animal.findOne({id});
    if (existenteId){
        throw new Error(`El id ${ id } no se encuentra registrado en la base de datos`);
    }
}


const existenteId = async(id = '') =>{
    const existeId = await Usuario.findOne({id});
    if (existeId){
        throw new Error(`El id ${ id } no se encuentra registrado en la base de datos`);
    }
}

module.exports = {
    esRoleValido,
    existenteEamil,
    existenteId,
    existentesId
    
}