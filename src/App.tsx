import React, {useState} from 'react';
import './App.css';
import 'bulma/css/bulma.css';

function App() {

    const [maxPersons, setMaxPersons] = useState<number>(30);
    const [maxGroups, setMaxGroups] = useState<number>(25);
    const [tables, setTables] = useState<number>(16);
    const [menu, setMenu] = useState<number>(20);
    const [button, setButton] = useState(false);
    const [buttons, setButtons] = useState(0);

    const send_info = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "maxGrupos": maxGroups,
                "maxPorGroup": maxPersons,
                "mesasNum": tables,
                "menuNum": menu
            })
        };
        const response = await fetch('https://agente-cliente.herokuapp.com/datos-iniciales', requestOptions)
        const res = await response.json();
        console.log(res)
    }


    const changeButton = (option: number) => {
        if (option === 1) {
            setButtons(1)
        } else if (option === 2) {
            setButtons(2)
        }
    }

    return (
        <div className="App">
            <nav className="navbar tile is-parent box" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <h1 className="navbar-item title">
                        Agente de Clientes
                    </h1>
                </div>
            </nav>
            <div className="tile is-ancestor">
                <div className="tile is-parent is-vertical">
                    <article className="tile is-child notification is-primary">
                        <p>En la siguiente aplicación se muestra una simulación de un agente que hace parte de otra
                            aplicación grande de multiagentes e una simulación multiagentes de un restaurante</p>
                    </article>
                    <div className="container tile is-parent content is-text is-multiline">
                        <article className="tile is-child notification is-success">
                            <h1 className="subtitle">Los valores para la simulación son los siguientes:</h1>
                            <ul>
                                <li>- Máximo de personas por grupos: {maxPersons}</li>
                                <li>- Máximo de grupos: {maxGroups}</li>
                                <li>- Número de mesas: {tables}</li>
                                <li>- Número de platos: {menu}</li>
                            </ul>
                        </article>
                    </div>
                    <div hidden={buttons !== 0}>
                        <div className="tile is-child buttons">
                            <button className="button is-primary" onClick={() => {
                                send_info();
                                changeButton(1)
                            }}>Iniciar
                            </button>
                            <button className="button is-link" onClick={() => changeButton(2)}>Modificar Tiempos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" hidden={buttons !== 2}>
                <h1 className="title">Modificar valores de funcionamiento del agente </h1>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Máximo de personas por grupo</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={maxGroups} onChange={(e) => {
                                    setMaxPersons(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Máximo de grupos</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={maxGroups} onChange={(e) => {
                                    setMaxGroups(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Número de mesas</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={tables} onChange={(e) => {
                                    setTables(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Número de platos en el menú</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={menu} onChange={(e) => {
                                    setMenu(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label">
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <button className="button is-primary" onClick={() => {
                                    setButtons(0)
                                }}>
                                    Guardar valores
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
