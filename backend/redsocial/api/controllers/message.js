'use strict'

var moment= require('moment');
const mongoose = require('mongoose');
var mongoosePaginate= require('mongoose-paginate-v2');
mongoose.plugin(mongoosePaginate);

var User=require('../models/user');
//var Follower=require('../models/follow');
const Message = require('../models/message');

function probando(req,res){
    res.status(200).send({message:'Hola que tal'});

}

/*function saveMessage(req,res){
    var params=req.body;

    if(!params.text || !params.receiver) return res.status(404).send({message:'envía los datos necesarios'})
    var message=new Message();
    message.emitter=req.user.sub;
    message.receiver=params.receiver;
    message.text=params.text;
    message.create_at=moment().unix();

    message.save((err,messageStored)=>{

        if(err) return res.status(500).send({message:'error en la petición'})
        if(!messageStored) return res.status(500).send({message:'error al enviar el mensaje'})
    
          return  res.status(200).send({message: messageStored});

    });
}*/

function saveMessage(req, res){
    var params = req.body;
  
    if (!params.text || !params.receiver) {
      return res.status(404).send({message: 'Envía los datos necesarios'});
    }
  
    var message = new Message();
    message.emitter = req.params.id; // Usamos el id del usuario que envía el mensaje
    message.receiver = params.receiver;
    message.text = params.text;
    message.create_at = moment().unix();
    message.viewed=false;
  
   
    message.save()
  .then((messageStored) => {
    if (!messageStored) {
      return res.status(500).send({message: 'Error al enviar el mensaje'});
    }

    return res.status(200).send({message: messageStored});
  })
  .catch((err) => {
    return res.status(500).send({message: 'Error en la petición'});
  });
  }

  /*function getReceivedMessages(req, res) {
    var page = 1;
    if (req.params.page) {
      page = req.params.page;
    }
  
    var itemsPerPage = 4;
  
    Message.find({ receiver: req.params.id })
      .populate('emitter', 'name surname image nick _id')
      .sort('-create_at')
      .paginate(page, itemsPerPage, (err, messages, total) => {
        if (err) {
          return res.status(500).send({ message: 'Error en la petición' });
        }
  
        if (!messages) {
          return res.status(404).send({ message: 'No hay mensajes' });
        }
  
        return res.status(200).send({
          total: total,
          pages: Math.ceil(total / itemsPerPage),
          messages
        });
      });
  }*/

 /* function getReceivedMessages(req, res) {
    const id = req.params.id;
    const page = req.query.page || 1;
    const itemsPerPage = 10;
  
    Message.paginate({ receiver: id }, { page: page, limit: itemsPerPage, sort: { create_at: 'desc' } })
      .then((messages) => {
        return res.status(200).send({ messages: messages });
      })
      .catch((err) => {
        return res.status(500).send({ message: 'Error en la petición' });
      });
  }*/

  function getReceivedMessages(req, res) {
    const id = req.params.id;
    const page = req.query.page || 1;
    const itemsPerPage = 10;
  
    Message.paginate(
      { receiver: id },
      { page: page, limit: itemsPerPage, sort: { create_at: 'desc' }, select: 'text emitter receiver create_at', populate: { path: 'emitter', select: 'name surname  email image' } }
    )
      .then((messages) => {
        return res.status(200).send({ messages: messages });
      })
      .catch((err) => {
        return res.status(500).send({ message: 'Error en la petición' });
      });
  }

  function getEmmitMessages(req, res) {
    const id = req.params.id;
    const page = req.query.page || 1;
    const itemsPerPage = 10;
  
    Message.paginate(
      { emitter: id },
      { page: page, limit: itemsPerPage, sort: { create_at: 'desc' }, select: 'text emitter receiver create_at', populate: { path: 'emitter receiver', select: 'name surname  email image' } }
    )
      .then((messages) => {
        return res.status(200).send({ messages: messages });
      })
      .catch((err) => {
        return res.status(500).send({ message: 'Error en la petición' });
      });
  }
  /*function getUnviewedMessages(req, res) {
    var userId = req.params.user;
    Message.count({receiver:userId, viewed:'false'}).exec((err,count)=>{
        if(err) return res.status(500).send({message:'Error en la petición'});
        return res.status(200).send({
            'unviewed': count
        });
    })


  }*/
  function getUnviewedMessages(req, res) {
    var userId = req.params.user;
    Message.count({receiver:userId, viewed:'false'}).exec()
      .then((count) => {
        return res.status(200).send({
            'unviewed': count
        });
      })
      .catch((err) => {
        return res.status(500).send({message:'Error en la petición'});
      });
}

/*function setViewedMessages(req,res){
    var userId=req.params.user;

    Message.update({receiver:userId, viewed:'false'},{viewed:'true'},{"multi":true},(err,messageUpdated)=>{

        if(err) return res.status(500).send({message:'Error en la petición'});
        return res.status(200).send({
          messages:messageUpdated
        })



    });  
        
}*/

function setViewedMessages(req, res) {
    var userId = req.params.user;
  
    Message.updateMany({receiver: userId, viewed: 'false'}, {viewed: 'true'},{"multi":true})
      .then((messageUpdated) => {
        return res.status(200).send({messages: messageUpdated});
      })
      .catch((err) => {
        return res.status(500).send({message: 'Error en la petición'});
      });
  }



module.exports ={

    probando,
    saveMessage,
    getReceivedMessages,
    getEmmitMessages,
    getUnviewedMessages,
    setViewedMessages
};