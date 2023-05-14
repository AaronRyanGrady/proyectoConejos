'use strict'

var bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');

var User = require('../models/user');
var jwt = require('../services/jwt');
const user = require('../models/user');
//metodos de prueba
function home(req,res){
    res.status(200).send({message:'hola mundo desde server js'});
};
function pruebas(req,res){
    res.status(200).send({message:'acción de pruebas'});
};




async function saveUser(req, res) {
    const { name, surname, nick, email, password } = req.body;
  
    if (!name || !surname || !nick || !email || !password) {
      return res.status(400).send({ message: 'Por favor, ingresa todos los datos requeridos.' });
    }
  
    // Verificar si ya existe un usuario con el mismo nick o email
    const existingUser = await User.findOne({ $or: [{ nick }, { email }] });
    if (existingUser) {
      return res.status(409).send({ message: 'Ya existe un usuario con este nick o email.' });
    }
  
    const user = new User({
      name,
      surname,
      nick,
      email,
      password,
      role: 'ROLE_USER',
      image: null
    });
  
    try {
      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
      const userStored = await user.save();
      if (userStored) {
        return res.status(200).send({ user: userStored });
      }
      return res.status(404).send({ message: 'No se pudo registrar el usuario.' });
    } catch (err) {
      return res.status(500).send({ message: 'Hubo un error al guardar el usuario.' });
    }
  }

  function loginUser(req, res) {
    var params = req.body;
    var email = params.email;

    var password =params.password;

    /*User.findOne({email: email},(err,user)=>{
      if(err) return res.status(500).send({message:'error en la petición'});
      
      if (user){
        bcrypt.compare(password,user.password,(err,check)=>{
            if(check){
                //devolver datos de usuario
                return res.status(200).send({ user})
            }

            else {
                return res.status(404).send({message: 'el usuario no se ha podido identificar'});

            }


        });}
        else {
            return res.status(404).send({message: 'el usuario no se ha podido identificar'});
            
        }


    });*/
    User.findOne({ email: email })
  .then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, check) => {
        if (check) {
          
          if(params.gettoken){

            return res.status(200).send({
                
                token: jwt.createToken(user)
            });
            //devolver token

            //generar token



          }
          else{
            //devolver datos de usuario
            user.password=undefined;
          return res.status(200).send({ user });
            
          }
          
        } else {
          return res
            .status(404)
            .send({ message: "el usuario no se ha podido identificar" });
        }
      });
    } else {
      return res
        .status(404)
        .send({ message: "el usuario no se ha podido identificar" });
    }
  })
  .catch((err) => {
    return res.status(500).send({ message: "error en la petición" });
  });

      }

      function getUser(req, res) {
        var userId=req.params.id;
      
        /*User.findById(userId,(err,user)=>{
          if(err) return res.status(500).send({message: 'error en la petición'});
      
          if(!user) return res.status(404).send({message: 'el usuario no existe'});
      
          return res.status(200).send({user})
        });
      }*/User.findById(userId)
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: "el usuario no existe" });
          }
          return res.status(200).send({ user });
        })
        .catch((err) => {
          return res.status(500).send({ message: "error en la petición" });
        });
      }

     //no funciona todavía

      function getUsers(req,res){
        var identity_user_id = req.user.sub;
        var page= 1;
        if(req.params.page){
            page = req.params.page;

        }
        var itemsPerPage=5;

        User.find().sort('_id').paginate(page,itemsPerPage,(err,users,total)=>{
            if(err) return res.status(500).send({message:'error en la petición'});
            if(!users) return res.status(404).send({message: 'no hay usuarios disponibles'});

            return res.status(200).send({ 
            users,
            total,
            pages: Math.ceil(total/itemsPerPage)

        });
        
        });

      }
        //no funcionan todavía
      /*function updateUser(req,res){
        var userId = req.params.id;
        var update= req.body;

        //borrar propiedad password

        delete update.password;

        if(userId != req.user.sub){
            return res.status(500).send({message:"no tienes permiso para actualizar"}); 

        }
        User.findByIdAndUpdate(userId,update,{new:true}, (err,userUpdate)=>{

            if(err) return res.status(500).send({message:'error en la petición'});
            if(!userUpdated) return res.status(404).send({message: 'no se ha podido actualizar el usuario'});

            return res.status(200).send({user: userUpdated});

        });

      }*/

      

      function uploadImage(req,res){

        var userId = req.params.id;

        if(userId != req.user.sub){
            return res.status(500).send({message:"no tienes permiso para actualizar"}); 

        }
        if(req.files){
            var file_path=req.files.image.path;
            console.log(file_path);
            var file_split = file_path.split('\\')

        }

      }

      /*function getUserImage(req, res) {
        const userId = req.params.id;
      
        User.findById(userId)
          .then((user) => {
            if (!user) {
              return res.status(404).send({ message: "el usuario no existe" });
            }
      
            // Si la imagen se envía como un archivo adjunto en la petición, se guarda en la carpeta 'uploads' y se añade su ruta al objeto 'user'
            if (req.file) {
              user.imagePath = req.file.path;
            }
      
            return res.status(200).send({ user });
          })
          .catch((err) => {
            return res.status(500).send({ message: "error en la petición" });
          });
      }*/
      function getUsers(req, res) {
        User.find({})
          .then((users) => {
            if (!users || users.length === 0) {
              return res.status(404).send({ message: "no se encontraron usuarios" });
            }
            return res.status(200).send({ users });
          })
          .catch((err) => {
            return res.status(500).send({ message: "error en la petición" });
          });
      }

      function updateUser(req, res) {
        const userId = req.params.id;
        const { name, surname, nick, email, role } = req.body;
      
        // Crea un objeto con los datos a actualizar
        const update = {};
        if (name) update.name = name;
        if (surname) update.surname = surname;
        if (nick) update.nick = nick;
        if (email) update.email = email;
        if (role) update.role = role;
      
        User.findByIdAndUpdate(userId, update, { new: true })
          .then((userUpdated) => {
            if (!userUpdated) {
              return res.status(404).send({ message: "no se ha podido actualizar el usuario" });
            }
      
            return res.status(200).send({ user: userUpdated });
          })
          .catch((err) => {
            return res.status(500).send({ message: "error en la petición" });
          });
      }
      
      function getUserImage(req, res) {
        const userId = req.params.id;
      
        User.findById(userId)
          .then((user) => {
            if (!user) {
              return res.status(404).send({ message: "el usuario no existe" });
            }
      
            // Si la imagen se envía como un archivo adjunto en la petición, se guarda en la carpeta 'uploads' y se actualiza la propiedad 'image' del objeto 'user'
            if (req.file) {
              const imagePath = req.file.path;
              const imageBuffer = fs.readFileSync(imagePath); // Lee el archivo como un buffer
              const imageType = req.file.mimetype.split('/')[1]; // Obtiene la extensión del archivo
              const imageName = `${userId}.${imageType}`; // Define el nombre del archivo
              const imagePathWithImageName = `uploads/${imageName}`; // Define la ruta completa del archivo con el nombre
      
              fs.writeFileSync(imagePathWithImageName, imageBuffer); // Guarda el archivo en la carpeta 'uploads'
              user.image = imagePathWithImageName; // Actualiza la propiedad 'image' del objeto 'user' con la ruta del archivo
            }
      
            return user.save(); // Guarda el objeto 'user' actualizado en la base de datos
          })
          .then((savedUser) => {
            return res.status(200).send({ user: savedUser });
          })
          .catch((err) => {
            return res.status(500).send({ message: "error en la petición" });
          });
      }

      function updateUserImage(req, res) {
        const userId = req.params.id;
      
        User.findById(userId)
          .then((user) => {
            if (!user) {
              return res.status(404).send({ message: "el usuario no existe" });
            }
      
            // Si la imagen se envía como un archivo adjunto en la petición, se guarda en la carpeta 'uploads' y se actualiza la propiedad 'image' del objeto 'user'
            if (req.file) {
              const imagePath = req.file.path;
              const imageBuffer = fs.readFileSync(imagePath); // Lee el archivo como un buffer
              const imageType = req.file.mimetype.split('/')[1]; // Obtiene la extensión del archivo
              const imageName = `${userId}.${imageType}`; // Define el nombre del archivo
              const imagePathWithImageName = `uploads/${imageName}`; // Define la ruta completa del archivo con el nombre
      
              fs.writeFileSync(imagePathWithImageName, imageBuffer); // Guarda el archivo en la carpeta 'uploads'
              user.image = imagePathWithImageName; // Actualiza la propiedad 'image' del objeto 'user' con la ruta del archivo
            }
      
            return user.save(); // Guarda el objeto 'user' actualizado en la base de datos
          })
          .then((savedUser) => {
            return res.status(200).send({ user: savedUser });
          })
          .catch((err) => {
            return res.status(500).send({ message: "error en la petición" });
          });
      }

      function getUserImageUrl(req, res) {
        const userId = req.params.id;
      
        User.findById(userId)
          .then((user) => {
            if (!user) {
              return res.status(404).send({ message: "el usuario no existe" });
            }
      
            // Si el usuario no tiene una imagen, se retorna un error
            if (!user.image) {
              return res.status(404).send({ message: "el usuario no tiene una imagen" });
            }
      
            // Se retorna la URL de la imagen
            return res.status(200).send({ imageUrl: `http://localhost:3800/api/${user.image}` });
          })
          .catch((err) => {
            return res.status(500).send({ message: "error en la petición" });
          });
      }
    
module.exports ={
    home,
    pruebas,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    updateUser,
    uploadImage,
    getUserImage,
    updateUserImage,
    getUserImageUrl
}