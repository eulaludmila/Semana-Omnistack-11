import React, {useState} from 'react';
import './style.css'
import {FiArrowLeft} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = ({
            name, email, whatsapp, city, uf
        })

        try {
            const resposta = await api.post('http://localhost:3333/ongs',data);

            alert(`Sei ID de acesso: ${resposta.data.id}`);
            history.push('/')
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça se cadastro, entre na plataforma e ajude pessoas e encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>

                    <div className="input-group">
                        <input  placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
                        <input placeholder="UF" value={uf} onChange={e => setUf(e.target.value)} style={{width: 80}}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}