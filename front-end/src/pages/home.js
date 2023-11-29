import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';


function Home() {
  const [list, setList ] = useState([]);
 

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setList(response.data);
    });
  }, []);
  
  const navigate = useNavigate();
  const goToRegister =() =>{
    navigate('/registrar');
  }


  return (
    <div className="App-container">
      <div className='table-container'>
      <button className='btn' onClick={goToRegister}>Novo Celular</button>
        <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Capacidade de Memoria (GB)</th>
            <th>Data de lançamento</th>
            <th>Alterar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.marca}</td>
              <td>{item.modelo}</td>
              <td>{item.armazenamento}</td>
              <td>{format(new Date(item.lancamento), 'dd/MM/yyyy')}</td>
              <td><a>Editar</a></td>
              <td><a>Excluir</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

    
      
    </div>
  );
}

export default Home;
