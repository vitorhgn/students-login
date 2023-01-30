import './style.css';
const StudentManagerPage = ()=>{
    return (
<>
        <header class="main-header">
            Cadastro de Aluno
        </header>
        <div class="loader"></div>
            <form id="studentForm" className="form" method="post">
                <div className="form-group">
                    <label for="name">Nome</label>
                    <input required type="text" name="name" id="name"/>
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input required type="email" name="email" id="email"/>
                </div>
                <div className="form-group">
                    <label for="ra">RA</label>
                    <input required type="number" name="ra" id="ra"/>
                </div>
                <div className="form-group">
                    <label for="cpf">CPF</label>
                    <input required type="number" name="cpf" id="cpf"/>
                </div>
                <div className="actions">
                    <a href='/' className="btn btn-warning margin-right-10">Cancelar</a>
                    <button className="btn">Salvar</button>
                </div>
            </form>
</>

);
};
export default StudentManagerPage;