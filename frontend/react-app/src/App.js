import './App.css';
import Navbar from './components/Navbar';
function App() {
  return (
<div className="main-container">
<Navbar />
    <section className="container">
        <header className="main-header">
            Consulta de Alunos
        </header>
        <div className="loader"></div>
        <div className="content-page">
            <div className="padding-left-right-20">
                <div className="top-actions">
                    <form id="formSearchStudent" className="form-search" action="">
                        <input type="text" name="searchInput" id="searchInput"/>
                        <button>Pesquisar</button>
                    </form>
                    <a className="btn btn-dark" href="studentsManager.html">Cadastrar Aluno</a>
                </div>
                <table id='studentList' class="table-list">
                    <thead>
                        <tr>
                            <th>Registro Acadêmico</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    </div>
  );
}
export default App;
