const express = require('express')
var cors = require("cors");
let database = require('./database')
const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res)  =>{
  res.send('Hello World');
})

app.get('/students/list', (req, res) => {
  setTimeout(function(){
    res.send(database);

  },2000)
});

  app.get('/students/find/:ra', (req, res) => {
    const studentFound = database.find(function(student){
      return student.ra == req.params.ra
    });
    setTimeout(function(){
      res.send(studentFound);

    },2000)
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

  app.put('/students/edit/:ra', (req, res)=>{
    database = database.filter((student)=>{
      return student.ra != req.params.ra
    });
    database.push({
      nome: req.body.name,
      ra:req.body.ra,
      cpf:req.body.cpf,
      email:req.body.email,
    });
    res.send({
      result: true,
      message: 'O estudante foi editado'
    })
  });

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