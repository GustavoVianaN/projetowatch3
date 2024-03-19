import './../moviesList/Movies.css';
import React, { useState } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Enviroment } from '../../enviroment/index'

const MoviesInclude = () => {

    const [idMovie, setidMovie] = useState('');
    const [idioma, setIdIdioma] = useState('');
    const [situation, setSituation] = useState('');
    const [Nome, setNome] = useState('');
    const [Ano, setAno] = useState('');
    const [Genero, setGenero] = useState('');
    const [Protocolo, setProtocolo] = useState('');
    const [Duracao, setValuesDuracao] = useState('');
    const [motivo, setMotivo] = useState('null');
    const [descricao, setDescricao] = useState([]);
    const idiomas = ['INCLUIR IDIOMA', 'Portugues', 'Inglês', 'Espanhol']

    var navigate = useNavigate();
    function calltheapi(body) {
        const url = `${Enviroment.REACT_APP_API_URL}/Movies`;
        var body = {
            "idmovie": body.idMovie,
            "name": body.Nome,
            "Ano": body.Ano,
            "Genero": body.Genero,
            "situation": body.situation,
            "motivo": body.Motivation,
            "descricao": body.descricao,
            "protocolo": body.Protocolo,
            "duracao": body.Duracao,
            "idioma": body.idioma,
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('keycloak_token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('passou')
                navigate('/')
            })
            .catch(error => {
                console.error('Houve um problema com sua requisição fetch:', error);
            });
    }

    function includeEvent() {
        const deviceInfo = {
            idioma: idioma,
            idMovie: idMovie,
            situation: situation,
            Nome: Nome,
            Ano: Ano,
            Genero: Genero,
            Protocolo: Protocolo,
            Duracao: Duracao,
            Motivation: motivo,
            descricao: descricao,
        };

        let fieldsNull = false;
        for (var key in deviceInfo) {
            if (deviceInfo.hasOwnProperty(key)) {
                if (deviceInfo[key] == "") {
                    fieldsNull = true;
                    break;
                }
            }
        }
        if (fieldsNull == false) {
            calltheapi(deviceInfo)
        } else {
            var alertError = document.getElementById('alertError');
            alertError.innerText = 'Preencha todos os campos';
            alertError.style.display = 'block';
            setTimeout(function () {
                alertError.style.display = 'none';
            }, 5000);
        }
    }

    var handleChangeSituacao = (event) => {
        setSituation(event.target.value)
        document.getElementById('motivoField').style.display = event.target.value == 'Inativo' ? 'block' : 'none';
    }

    const Situacao = ['INCLUIR SITUAÇÃO', 'Ativo', 'Inativo']
    const [inputsData, setInputsData] = useState([
        {
            id: 'Protocolo',
            label: 'Protocolo',
            required: true,
        }
    ]);

    const [InputsDataDuracao, setInputsDataDuracao] = useState([
        {
            id: 'Duracao',
            label: 'Duracao',
            required: true,
        }
    ]);

    const handleChange = (id, value) => {
        setProtocolo(value);
    };

    const addInput = () => {
        setInputsData(prevInputs => [
            ...prevInputs,
            {
                id: `Protocolo${prevInputs.length}`,
                label: `Protocolo ${prevInputs.length + 1}`,
                required: false,
            }
        ]);
        setInputsDataDuracao(prevInputs => [
            ...prevInputs,
            {
                id: `Duracao${prevInputs.length}`,
                label: `Duracao ${prevInputs.length + 1}`,
                required: false,
            }
        ]);
    };

    const handleChangeDuracao = (id, value) => {
        setValuesDuracao(value);
    };

    var handleChangeIdioma = (event) => {
        setIdIdioma(event.target.value)
        let resultados = event.target.value.match(/ponto|polígono/gi);
        if (resultados != 'ponto' && inputsData.length < 2) {
            for (var i = 0; i < 1; i++) {
                addInput()
            }
        }
    }
    return (<>
        <div className="main">
            <div className="main__container">
                <div className="main__title">
                    <IoMdAddCircle style={{ color: '#ee551a', fontSize: '80px', marginLeft: '-15px' }} />
                    <div className="main__greeting">
                        <h1>Inclusão de Filmes</h1>
                        <p></p>
                    </div>
                </div>
                <div >
                    <Alert style={{ display: 'none' }} id='alertError' severity="error"></Alert>
                </div>
                <div className='tableForm'>
                    <div className='formcadastro'>
                        <div className="includegroup">
                            <div className='inputFilter'>
                                <input
                                    className='inputlayer'
                                    style={{ width: '400px', height: '20px', borderRadius: '5px' }}
                                    idioma="text"
                                    required
                                    type="number"

                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setidMovie(value);

                                    }}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"' }}>Id filme <span style={{ color: 'red' }}>*</span></label>
                            </div>
                        </div>
                        <div style={{ display: 'flex', marginTop: '25px' }}>
                            <span style={{ fontWeight: 'bold' }}>
                                Idioma:
                            </span>
                            <div>
                                <select
                                    id="IdiomaSelect" // Adicionado um ID para o select
                                    className="selectCadastrar"
                                    style={{ width: '340px', marginLeft: '16px', borderRadius: '5px' }}
                                    onChange={(e) => handleChangeIdioma(e)}
                                >
                                    {idiomas.map((situacao, index) => (
                                        <option key={index} value={situacao}>
                                            {situacao}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', marginTop: '25px' }}>
                            <span style={{ fontWeight: 'bold' }}>
                                Situação:
                            </span>
                            <div>
                                <select
                                    className="selectCadastrar"
                                    style={{ width: '340px', marginLeft: '5px', borderRadius: '5px' }}
                                    onChange={(e) => handleChangeSituacao(e)} // Passa o evento para a Ano
                                >
                                    {Situacao.map((situacao, index) => (
                                        <option key={index} value={situacao}>
                                            {situacao}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="includegroup">
                            <div className='inputFilter'>
                                <input
                                    className='inputlayer'
                                    style={{ width: '400px', height: '20px', borderRadius: '5px' }}
                                    idioma="text"
                                    required
                                    onChange={(e) => setNome(e.target.value)}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"' }}>Nome<span style={{ color: 'red' }}>*</span></label>
                            </div>
                        </div>
                        <div className="includegroup">
                            <div className='inputFilter'>
                                <input
                                    className='inputlayer'
                                    style={{ width: '400px', height: '20px', borderRadius: '5px' }}
                                    type="number"
                                    required
                                    onChange={(e) => setAno(e.target.value)}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"' }}>
                                    Ano<span style={{ color: 'red' }}>*</span>
                                </label>
                            </div>
                        </div>
                        <div className="includegroup">
                            <div className='inputFilter'>
                                <input
                                    className='inputlayer'
                                    style={{ width: '400px', height: '20px', borderRadius: '5px' }}
                                    idioma="text"
                                    required
                                    onChange={(e) => setGenero(e.target.value)}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"' }}>Genero<span style={{ color: 'red' }}>*</span></label>
                            </div>
                        </div>
                    </div>
                    <div className='formcadastro'>
                        <div className="includegroup" style={{ display: 'none' }} id='motivoField'>
                            <div className='inputFilter'>
                                <input
                                    className='inputlayer'
                                    style={{ width: '400px', height: '20px', borderRadius: '5px' }}
                                    idioma="text"
                                    required
                                    onChange={(e) => setMotivo(e.target.value)}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', }}>Motivo<span style={{ color: 'red' }}>*</span></label>
                            </div>
                        </div>
                        <div style={{ display: 'flex', marginLeft: '0px' }}>
                            <div id='root'>
                                {inputsData.map((input, index) => (
                                    <div key={index} className="includegroup">
                                        <div className='inputFilter'>
                                            <input
                                                className='inputlayer'
                                                style={{ width: '190px', height: '20px', borderRadius: '5px' }}
                                                idioma="number" // Mantenha como "text" para maior controle sobre a entrada
                                                required={input.required}
                                                onChange={(e) => handleChange(input.id, e.target.value)}
                                            />
                                            <span className="highlight"></span>
                                            <span className="barMap"></span>
                                            <label style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"' }}>
                                                {input.label}<span style={{ color: 'red' }}>*</span>
                                            </label>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div style={{ marginLeft: '-90px' }}>
                                {InputsDataDuracao.map((input, index) => (
                                    <div key={index} className="includegroup">
                                        <div className='inputFilter'>
                                            <input
                                                className='inputlayer'
                                                style={{ width: '190px', height: '20px', borderRadius: '5px' }}
                                                idioma="number" // Mantenha como "text" para maior controle sobre a entrada
                                                required={input.required}
                                                onChange={(e) => handleChangeDuracao(input.id, e.target.value)}
                                            />
                                            <span className="highlight"></span>
                                            <span className="barMap"></span>
                                            <label style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"' }}>
                                                {input.label}<span style={{ color: 'red' }}>*</span>
                                            </label>

                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="includegroup" style={{ marginLeft: '-90px' }}>
                                    <div className='inputFilter'>

                                        <input style={{ height: '32px', width: '150px', marginLeft: '-0px' }} className='button-3' onClick={addInput} idioma='button' value="Incluir Protocolo +" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="includegroup">
                            <div className='inputFilter'>
                                <input
                                    className='inputlayer'
                                    style={{ width: '400px', height: '20px', borderRadius: '5px' }}
                                    idioma="text" // Mantenha como "text" para maior controle sobre a entrada
                                    required
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        setDescricao(value);
                                    }}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"' }}>Descrição<span style={{ color: 'red' }}>*</span></label>
                            </div>
                        </div>
                        <input style={{ marginTop: '20px', height: '30px', width: '410px', marginLeft: '-155px' }} className='button-3' idioma='button' value="Incluir Filme" onClick={includeEvent} />
                    </div>
                </div>
            </div>
        </div>
    </>);
}


export default MoviesInclude;