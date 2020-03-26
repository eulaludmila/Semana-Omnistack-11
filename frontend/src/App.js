import React, {useState, Fragment } from 'react';
import Logon from './pages/Logon';
import Routes from './routes'
import './global.css'

function App() {

	//useState retornar um array [valor, função]
	let [contador, setContador] = useState(0);
	//contador recebe 0 e o segundo parâmetro é uma função para alterar o estado do contador

	function increment(){
		setContador(contador + 1);
	}

	return (
		<Fragment>
			<Routes/>
		</Fragment>
	);
}

export default App;
