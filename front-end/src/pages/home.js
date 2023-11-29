import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';


function Home() {
  const [list, setList ] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
 
  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const handleInputChange = (e) => {
    setSelectedItem({
      ...selectedItem,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setList(response.data);
    });
  }, []);
  
  const navigate = useNavigate();
  const goToRegister =() =>{
    navigate('/registrar');
  }
  const goToEdit = () =>{
    navigate('/editar');
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
              <td><button className='btn-edit' onClick={() => openModal(item)}>Editar</button></td>
              <td><a>Excluir</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      </div>
      {modalVisible && selectedItem && (
        <div className='modal'>
            <div className='modal-content'>
            <span className='close' onClick={closeModal}>&times;</span>
            <fieldset className="register-form-modal">
                <legend className="legend-border">Editar</legend>
                <div className='input-container-modal'>
                        <label className='label'>Marca</label>
                        <input type="text" value={selectedItem.marca} onChange={handleInputChange} name='marca'  className='register-input' />
                </div>
                <div className='input-container-modal'>
                    <label className='label'>Modelo</label>
                <input type="text" value={selectedItem.modelo} onChange={handleInputChange} name='modelo'  className='register-input' />
                    </div>
                    <div className='input-container-modal'>
                    <label className='label'>Memoria</label>
                    <input type="text" value={selectedItem.armazenamento} onChange={handleInputChange} name='armazenamento' className='register-input' />
                    </div>
                    <div className='input-container-modal'>
                    <label className='label'>Data de lançamento</label>
                    <input type="date" value={format(new Date(selectedItem.lancamento), 'yyyy-MM-dd')} onChange={handleInputChange} name='lancamento'  className='register-input' />
                    </div>
                    <div className="button-container-modal">
                      <button className='btn' onClick={closeModal}> Cancelar </button>
                      <button className='btn' onClick={() => {
                        Axios.put("http://localhost:3001/edit", {
                            id: selectedItem.id,
                            marca: selectedItem.marca,
                            modelo: selectedItem.modelo,
                            armazenamento: selectedItem.armazenamento,
                            lancamento: format(new Date(selectedItem.lancamento), 'yyyy-MM-dd'),
                          }).then(() =>{
                            window.location.reload();
                          })
                      }} > Atualizar </button>    
                    </div>        
            </fieldset>
            
            </div>
        </div>
        )}

    
      
    </div>
  );
}

export default Home;
