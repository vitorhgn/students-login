import React from 'react';
import './style.css';
class StudentListPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            studentsList: [],
            isLoading: true,
            formSearch: {
                searchInput: "",
            }
        }
    }

    componentDidMount(){
        this.fetchStudentsList();
    }

    onClickRemoveStudent = (ra) =>{
        const confirmation = window.confirm("Você realmente deseja excluír esse usuário?");
        if(confirmation){
            this.deleteStudent(ra);
    }
    }
    deleteStudent = (ra) =>{
        this.setState({isLoading:true});
        fetch(`http://localhost:3006/students/delete/${ra}`, {
            method: 'DELETE'
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            // alert(data.message)
            this.fetchStudentsList()
        });
    }
    onSubmitFormSearch = (event)=>{
        event.preventDefault();
        this.fetchStudentsList(event.target.searchInput.value);
    }

    fetchStudentsList = (searchQuery = '') => {
        this.setState({isLoading:true});
        
        fetch(`http://localhost:3006/students/list/${searchQuery}`).then((response) => {
            return response.json();
        })
        .then((data) =>{
            this.setState({studentsList: data,
            isLoading: false});

        })
        .catch((error)=>{
            alert('Desculpe, mas não foi possível estabelecer conexão com o servidor.');
            console.log(error);
        })
    }
    

    render(){
        if (this.state.isLoading){
            return <div className="loader"></div>
        }
        return ( 
            <div className="padding-left-right-20">
            <div className="top-actions">
                <form onSubmit={this.onSubmitFormSearch} id="formSearchStudent" className="form-search" action="">
                    <input type="text" name="searchInput" id="searchInput" value={this.state.formSearch.searchInput} onChange={(event)=>{
                    this.setState({
                        formSearch: {
                            searchInput: event.target.value
                        }
                    })
                    }}/>
                    <button>Pesquisar</button>
                </form>
                <a className="btn btn-dark" href="/student-manager">Cadastrar Aluno</a>
            </div>
            <table id='studentList' className="table-list">
                <thead>
                    <tr>
                        <th>Registro Acadêmico</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {
                this.state.studentsList.map((student) =>{
                    return(
                    <tr key={student.ra}>
                    <td>{student.ra}</td>
                    <td>{student.nome}</td>
                    <td>{student.cpf}</td>
                    <td>
                    <a href={`/student-manager?ra=${student.ra}`}>Editar</a>
                    <a className="removeStudent" onClick={()=>{this.onClickRemoveStudent(student.ra)}} href="/#">Excluir</a>
                    </td>
                    </tr>
                );
            })
        }
                </tbody>
            </table>
        </div>  
        );
    }
}
// const StudentListPage = () =>{
//     return ( 
//         <div className="padding-left-right-20">
//         <div className="top-actions">
//             <form id="formSearchStudent" className="form-search" action="">
//                 <input type="text" name="searchInput" id="searchInput"/>
//                 <button>Pesquisar</button>
//             </form>
//             <a className="btn btn-dark" href="studentsManager.html">Cadastrar Aluno</a>
//         </div>
//         <table id='studentList' className="table-list">
//             <thead>
//                 <tr>
//                     <th>Registro Acadêmico</th>
//                     <th>Nome</th>
//                     <th>CPF</th>
//                     <th>Ações</th>
//                 </tr>
//             </thead>
//             <tbody>
//             </tbody>
//         </table>
//     </div>  
//     );
// };
export default StudentListPage;