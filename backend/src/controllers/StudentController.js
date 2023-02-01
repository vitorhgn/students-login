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

    isCreateDataValid = async (data)=>{     
        if (data.name == ''){
            return 'Preencha todos os campos antes de salvar!';
          }
          if (data.email == ''){
            return `Preencha todos os campos antes de salvar!`;
          }
          if (data.ra == ''){
            return `Preencha todos os campos antes de salvar!`;
          }
          if (data.cpf == ''){
            return `Preencha todos os campos antes de salvar!`;
          }
          if(parseInt(data.ra)!= data.ra){
            return `O RA deve ser números inteiros`;
          }
          if(parseInt(data.cpf)!= data.cpf){
            return `O CPF deve ser números inteiros`;
          }
          const userExists = await this.app.database("students")
          .select()
          .where({
            ra: data.ra
          })
          .first();
          if(userExists){
            return `Já existe um usuário com este RA: ${data.ra}`
          }
          return true;
    };
    isEditDataValid = (data)=>{
        if (data.name == ''){
            return `Preencha o nome antes antes de salvar!`
          }
          if (data.email == ''){
            return `Preencha o email antes de salvar!`
          }
          return true;
    }
    createAction = async (req, res) =>{       
        const isCreateDataValid = await this.isCreateDataValid(req.body);
        if (isCreateDataValid != true){
            return res.status(400).send({
                result: false,
                message: isCreateDataValid,
            });
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
        const isEditDataValid = this.isEditDataValid(req.body);
        if (isEditDataValid != true){
            return res.status(400).send({
                result: false,
                message: isEditDataValid,
            });
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
            message: `O usuário #${req.params.ra} foi excluído`})
          }else{
            res.send({
              result: false,
              message: `O usuário #${req.params.ra} não foi excluído`})
          }
        })
    };
}

    