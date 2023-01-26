const express = require('express');
const knex = require('knex');
var cors = require("cors");
let database = require('./database');
const knexConfigFile = require('../knexfile');
const { response } = require('express');
const app = express()
app.database = knex(knexConfigFile.test);
app.use(cors())
app.use(express.json())
app.get('/', (req, res)  =>{
  res.send('Hello World');
})

app.get('/students/list/:searchQuery?', (req, res) => {

  let query = app.database("students");

  let result = database;
  let search = req.params.searchQuery;
  if(search){
    query.where("ra", search)
    .orWhere("nome", "like" , `%${search}%`)
    .orWhere("cpf", search);
  }
  return query
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

  app.post('/students/save', async (req, res)=>{

    if (req.body.name == ''){
      return res.status(400).send({
        result: false,
        message: `Preencha todos os campos antes de salvar!`
      })
    }
    if (req.body.email == ''){
      return res.status(400).send({
        result: false,
        message: `Preencha todos os campos antes de salvar!`
      })
    }
    if (req.body.ra == ''){
      return res.status(400).send({
        result: false,
        message: `Preencha todos os campos antes de salvar!`
      })
    }
    if (req.body.cpf == ''){
      return res.status(400).send({
        result: false,
        message: `Preencha todos os campos antes de salvar!`
      })
    }
    if(parseInt(req.body.ra)!= req.body.ra){
      return res.status(400).send({
        result: false,
        message: `O RA deve ser números inteiros`
      })
    }
    if(parseInt(req.body.cpf)!= req.body.cpf){
      return res.status(400).send({
        result: false,
        message: `O CPF deve ser números inteiros`
      })
    }

    const userExists = await app.database("students")
    .select()
    .where({
      ra: req.body.ra
    })
    .first();
    if(userExists){
      return res.status(400).send({
        result:false,
        message:`Já existe um usuário com o RA: ${req.body.ra}`
      })
    }

    return app.database("students")
    .insert({
      nome: req.body.name,
      ra:req.body.ra,
      cpf:req.body.cpf,
      email:req.body.email
    })
    .then((response)=>{
      if(response){
        res.send({result:true,message:'Estudante cadastrado com sucesso'})
      }else{
        res.status(500).send({result:false,message:'Falha no cadastro do aluno'})
      }
    })
  })

  app.put('/students/edit/:ra', async(req, res)=>{

    if (req.body.name == ''){
      return res.status(400).send({
        result: false,
        message: `Preencha todos os campos antes de salvar!`
      })
    }
    if (req.body.email == ''){
      return res.status(400).send({
        result: false,
        message: `Preencha todos os campos antes de salvar!`
      })
    }

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
    return app.database('students')
    .where({ra: req.params.ra})
    .del()
    .then((response)=>{
      if(response){
      res.send({
        result: true,
        message: `O usuário ${req.params.ra} foi excluído`})
      }else{
        res.send({
          result: false,
          message: `O usuário ${req.params.ra} não foi excluído`})
      }
    })
});

app.listen(3000)
console.log("Server is running...");