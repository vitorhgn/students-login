import './App.css';
import StudentListPage from './components/pages/StudentsListPage';
import StudentsManagerPage from './components/pages/StudentsManager';
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/Navbar';
function App() {
  return (
    <BrowserRouter>
    <div className="main-container">
<Navbar />
      <section className="container">
        <header className="main-header">Consulta de Alunos</header>
        <div className="content-page">
<Routes>
  <Route path='/' element={<StudentListPage />} />
  <Route path='/student-manager' element={<StudentsManagerPage/>} />
</Routes>

        </div>
        </section>
    </div>
    </BrowserRouter >
  );
}
export default App;
