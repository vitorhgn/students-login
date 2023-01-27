module.exports = class StudentsController{
    constructor(app){
        this.app = app;
    };

    listAction = (req, res)=>{
        let query = this.app.database("students");

        let search = req.params.searchQuery;
        if(search){
          query.where("ra", "like" , `%${search}%`)
          .orWhere("nome", "like" , `%${search}%`)
          .orWhere("cpf", "like" , `%${search}%`);
        }
        return query
        .select()
        .then((data)=>{
          res.send(data);
        });
    };
    
    findAction = (req, res) =>{
        return this.app.database('students')
        .select()
        .where({ra : req.params.ra})
        .first()
        .then((response)=>{
          res.send(response);
        })
    };

    createAction = async (req, res) =>{
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
      
          const userExists = await this.app.database("students")
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
      
          return this.app.database("students")
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
    };

    editAction = async(req, res)=>{
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
      
          const userFound = await this.app
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
            const studentUpdate = await this.app
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
    };

    deleteAction = (req, res) =>{
        return this.app.database('students')
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
    };
}

    