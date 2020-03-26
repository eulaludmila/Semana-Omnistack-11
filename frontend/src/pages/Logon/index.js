import React, {useState} from 'react';
import './style.css';

import {FiLogIn} from 'react-icons/fi'
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

export default function Logon(){

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:3333/session', {id});
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile')
            
        } catch (error) {
            alert('Falha no código, tente novamente!')
        }
    }

    return(
        <div className="logon-container">
            <section className="form">

                <img src={logoImg} alt="Be the hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça o seu logon</h1>
                    <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>

        </div>
    )
}