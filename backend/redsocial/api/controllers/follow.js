'use strict'
var moment= require('moment');
const mongoose = require('mongoose');
//var path = require('path');
//var fs =require('fs');
var mongoosePaginate= require('mongoose-paginate-v2');
mongoose.plugin(mongoosePaginate);

var bcrypt = require('bcrypt');
const multer = require('multer');
//const fs = require('fs');

var User = require('../models/user');

const Follow=require('../models/follow');



//metodos de prueba
function prueba(req,res){
    res.status(200).send({message:'hola mundo desde follow js'});
};

/*function saveFollow(req,res){
    var params=req.body;
   var follow = new Follow();
   follow.user = req.user.sub;
    follow.followed= params.followed;

    follow.save((err,followStored) => {

        if(err) return res.status(500).send({message: 'error al guardar el follow'});
        if(!followStored)return res.status(404).send({message:'el seguimiento no se ha guardado'});

        return res.status(200).send({follow:followStored});
    });

};*/
/*function saveFollow(req, res) {
    const params = req.body;
    const follow = new Follow({
      user: req.user.sub,
      followed: params.followed,
    });
  
    follow
      .save()
      .then((followStored) => {
        return res.status(200).send({ follow: followStored });
      })
      .catch((err) => {
        return res.status(500).send({ message: 'Error al guardar el follow' });
      });
  }*/
function saveFollows(req, res){
    var params = req.body;
  
  
    var follow = new Follow();
    follow.user = req.params.id; // Usamos el id del usuario que envía el mensaje
    follow.followed = params.followed;
    
  
   
    follow.save()
  .then((followStored) => {
    if (!followStored) {
      return res.status(500).send({message: 'Error al enviar el mensaje'});
    }

    return res.status(200).send({message: followStored});
  })
  .catch((err) => {
    return res.status(500).send({message: 'Error en la petición'});
  });
  }
/*
  function saveFollow(req, res) {
  const params = req.body;
  const follow = new Follow({
    user: req.params.id,
    followed: params.followed,
  });

  follow
    .save()
    .then((followStored) => {
      return res.status(200).send({ follow: followStored });
    })
    .catch((err) => {
      return res.status(500).send({ message: 'Error al guardar el follow' });
    });
}*/

/*async function saveFollow(req, res) {
    try {
      const params = req.body;
      const follow = new Follow({
        user: params.id,
        followed: params.followed
      });
      const followStored = await follow.save();
      res.status(200).send({ follow: followStored });
    } catch (err) {
      res.status(500).send({ message: 'Error al guardar el follow' });
    }
  };*/


  /*async function saveFollow(req, res) {
    try {
      const params = req.body;
      const follow = new Follow({
        user: req.user.sub
        followed: params.followed
      });
      const followStored = await follow.save();
      res.status(200).send({ 
        followed: followStored.followed,
        user: followStored.user
      });
    } catch (err) {
      res.status(500).send({ message: 'Error al guardar el follow' });
    }
  };*/
  function saveFollow(req, res) {
    const params = req.body;
    const follow = new Follow({
      user: req.params.id,
      followed: params.followed,
    });
  
    follow.save()
      .then((followStored) => {
        return res.status(200).send({ follow: followStored });
      })
      .catch((err) => {
        return res.status(500).send({ message: 'Error al guardar el follow' });
      });
  }
  
  
module.exports = {

    prueba,
    saveFollow,
    saveFollows
};