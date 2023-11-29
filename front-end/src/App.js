import Home from './pages/home';
import Registro from './pages/register';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/registrar' element={<Registro />} />
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
