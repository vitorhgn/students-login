import './App.css';
import StudentListPage from './components/pages/StudentsListPage';
import StudentManagerPage from './components/pages/StudentManagerPage';
import Error from './components/shared/Error';
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/Navbar';
function App() {
  return (
    <BrowserRouter>
    <div className="main-container">
<Navbar />
      <section className="container">
        <div className="content-page">
<Routes>
  <Route path='/' element={<StudentListPage />} />
  <Route path='/student/add' element={<StudentManagerPage/>} />
  <Route path='/student/edit/:id' element={<StudentManagerPage/>} />
  <Route path='*' element={<Error />} />
</Routes>

        </div>
        </section>
    </div>
    </BrowserRouter >
  );
}
export default App;
