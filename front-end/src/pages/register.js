import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

function Registro(){
    const [values, setValues] = useState();

  const navigate = useNavigate();
  const goToHome =() =>{
    navigate('/', { replace: true });
  }
    const handleChangeValues = (value) =>{
        setValues(prevValue=>({
          ...prevValue,
          [value.target.name]: value.target.value,
        }))
      }
    
      const handleClickButton =() => {
        Axios.post("http://localhost:3001/register", {
            marca: values.marca,
            modelo: values.modelo,
            armazenamento: values.armazenamento,
            lancamento: values.lancamento
          });
        };

      const doublefunction =() =>{
        handleClickButton();
        goToHome();
      }

      return (
        <div className='App-container'>
            <div className="register-container">
            <fieldset class="register-form">
                <legend class="legend-border">Celular</legend>
                <div className='input-container'>
                        <label className='label'>Marca</label>
                        <input type="text" name='marca'  className='register-input' onChange={handleChangeValues}/>
                    </div>
                    <div className='input-container'>
                    <label className='label'>Modelo</label>
                    <input type="text" name='modelo'  className='register-input' onChange={handleChangeValues}/>
                    </div>
                    <div className='input-container'>
                    <label className='label'>Memoria</label>
                    <input type="text" name='armazenamento' className='register-input' onChange={handleChangeValues}/>
                    </div>
                    <div className='input-container'>
                    <label className='label'>Data de lançamento</label>
                    <input type="date" name='lancamento'  className='register-input' onChange={handleChangeValues}/>
                    </div>
            </fieldset>
                    <div className="button-container">
                      <button className='btn' onClick={() => goToHome()}> Cancelar </button>
                      <button className='btn' onClick={() => doublefunction()}> Cadastrar </button>    
                    </div>
                </div>
        </div>
      );
}
export default Registro;
