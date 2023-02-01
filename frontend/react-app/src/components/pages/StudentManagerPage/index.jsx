import './style.css';
import { useState , useEffect} from 'react';
import Loader from '../../shared/Loader';
import {Navigate , Link , useParams} from 'react-router-dom';


const StudentManagerPage = ()=>{
    
    const {id} = useParams();

    const [isRedirect, setIsRedirect] = useState(false);
    const [isLoading, updateIsLoading] = useState(false);

    const [name, updateName] = useState("");
    const [email, updateEmail] = useState("");
    const [cpf, updateCpf] = useState("");
    const [ra, updateRa] = useState("");

    
    
    const fetchStudent = ()=> {
        updateIsLoading(true);
        fetch(`http://localhost:3006/students/find/${id}`).then(function(response){
            return response.json();
        }).then(function(data){
            updateName(data.nome);
            updateEmail(data.email);
            updateCpf(data.cpf);
            updateRa(data.ra);
            updateIsLoading(false);
        })
    }

    useEffect(()=>{
        if(id){
            fetchStudent();
        }
    }, []);

    const onSubmitForm = (event) => {
        event.preventDefault();
            const body = {
                name,
                ra,
                cpf,
                email,
            };
    
            let methodEndPoint;
            let urlEndPoint;
            if(id){
                methodEndPoint = 'PUT';
                urlEndPoint = `http://localhost:3006/students/edit/${id}`
            }else{
                methodEndPoint = 'POST';
                urlEndPoint = 'http://localhost:3006/students/save'
            }
    console.log(urlEndPoint, methodEndPoint)
            fetch(urlEndPoint, {
                method: methodEndPoint,
                body: JSON.stringify(body),
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                } 
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                alert(data.message);
                if(data.result === true){
                    setIsRedirect(true );
                }
            })
    }

    if(isRedirect){
        return <Navigate to='/' />
    }
    if(isLoading){
        return <Loader />;
    }
    return (
<>
        <header className="main-header">
            Cadastro de Aluno
        </header>
            <form id="studentForm" className="form" method="post" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input required type="text" name="name" id="name" placeholder='Digite seu nome' value={name} onChange={(event)=>{
                        updateName(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="email" placeholder='Digite seu email' value={email} onChange={(event)=>{
                        updateEmail(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="ra">RA</label>
                    <input required type="number" name="ra" id="ra" placeholder='Digite um RA' value={ra} onChange={(event)=>{
                        updateRa(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpf">CPF</label>
                    <input required type="number" name="cpf" id="cpf" placeholder='Digite seu CPF' value={cpf} onChange={(event)=>{
                        updateCpf(event.target.value);
                    }}/>
                </div>
                <div className="actions">
                    <Link to='/' className="btn btn-warning margin-right-10">Cancelar</Link>
                    <button className="btn">Salvar</button>
                </div>
            </form>
</>
);
};
export default StudentManagerPage;