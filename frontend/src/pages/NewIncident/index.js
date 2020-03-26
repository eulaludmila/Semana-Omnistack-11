import React, {useState} from 'react';
import './style.css';
import {FiArrowLeft} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios'

export default function NewIncident(){

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const history = useHistory();
    const ongId = localStorage.ongId;

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {

            await axios.post('http://localhost:3333/incidents',data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile');
            
        } catch (error) {
            alert('Erro, tente novamente');
        }
    }

    return(
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be the Hero" />

                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhamente para encontar um herói para resolver isso.</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Voltar para home
                </Link>

            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                    value={title} onChange={e => setTitle(e.target.value)}
                    placeholder="Título do caso" 
                />
                <textarea 
                    value={description} onChange={e => setDescription(e.target.value)}
                    placeholder="Descrição" 
                />
                <input 
                    value={value} onChange={e => setValue(e.target.value)}
                    placeholder="Valor em reais"
                />

              
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    )
}