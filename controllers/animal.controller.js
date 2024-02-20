const bcryptsjs = require('bcryptjs');
const {response, request} = require('express');
const Animal = require('../models/animal');

const animalGet = async(req, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, animales] = await Promise.all([
        Animal.countDocuments(query), 
        Animal.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        animales
    });
}

const getAnimalById = async (req, res) =>{
    const {id} = req.params;
    const animal = await Animal.findOne({_id: id});
    
    res.status(200).json({
        animal
    });
}

const putAnimales = async (req, res = response) =>{
    const {id} = req.params;
    const {_id, raza, nombre, ...resto} = req.body;

    const animal = await Animal.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg : 'Animal Actualizado exitosamente!!!',
        animal
    });
}

const animalDelete = async(req, res) =>{
    const{id} = req.params;
    const animal = await Animal.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'Animal eliminado exitosamente',
        animal
    });
}

const animalesPost = async (req, res) =>{
    const {nombre, raza} = req.body;
    const animal = new Animal ({nombre, raza});

    await animal.save();
    res.status(202).json({
        animal
    });
}

module.exports = {
    animalesPost,
    animalDelete,
    putAnimales,
    getAnimalById,
    animalGet
}