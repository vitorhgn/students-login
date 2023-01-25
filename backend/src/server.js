const express = require('express');
const knex = require('knex');
var cors = require("cors");
let database = require('./database');
const knexConfigFile = require('../knexfile');
const app = express()
app.database = knex(knexConfigFile.test);
app.use(cors())
app.use(express.json())
app.get('/', (req, res)  =>{
  res.send('Hello World');
})

app.get('/students/list/:searchQuery?', (req, res) => {
  let result = database;
  let search = req.params.searchQuery;
  if(search){
    search = search.toLowerCase();
    result = result.filter((student)=>{
      return student.ra.indexOf(search) != -1 ||
      student.nome.toLowerCase().indexOf(search) != -1 ||
      student.cpf.indexOf(search) != -1;
    })
  }
  return app.database('students')
  .select()
  .then((data)=>{
    res.send(data);
  })
});

  app.get('/students/find/:ra', (req, res) => {
    return app.database('students')
    .select()
    .where({ra : req.params.ra})
    .first()
    .then((response)=>{
      res.send(response);
    })
  });

  app.post('/students/save', (req, res)=>{
    database.push({
      nome: req.body.name,
      ra:req.body.ra,
      cpf:req.body.cpf,
      email:req.body.email,
    });
    res.send({result:true,message:'Deu bom'})
  })

  app.put('/students/edit/:ra', async(req, res)=>{
    const userFound = await app
    .database('students')
    .select()
    .where({ra: req.params.ra})
    .first();

    if(!userFound){
      res
      .status(400)
      .send({
        result: false,
        message: 'O estudante informado não existe'
      });
    }    
      const studentUpdate = await app
      .database('students')
      .update({
          email: req.body.email,
          nome: req.body.name
      })
      .where({
        ra: req.params.ra
      });
      if(studentUpdate){
        res.send({
          result: true,
          message: 'O estudante foi editado'
        })
      }else{
        res.status(500).send({
          result: false,
          message: 'Desculpa, mas não foi possível atualizar o estudante.'
        })
      }
  })

  app.delete('/students/delete/:ra', (req, res) =>{
    database = database.filter((student) =>{
      return student.ra != req.params.ra;
    })
    res.send({
      result: true,
      message: `O usuário ${req.params.ra} foi excluído`})
});

app.listen(3000)
console.log("Server is running...");