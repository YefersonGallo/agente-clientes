import React, {useState} from 'react';
import './App.css';
import 'bulma/css/bulma.css';

function App() {

    const [maxPersons, setMaxPersons] = useState<number>(0);
    const [maxGroups, setMaxGroups] = useState<number>(0);
    const [tables, setTables] = useState<number>(0);
    const [menu, setMenu] = useState<number>(0);

    const setButtons = (option: number) => {
        console.log(option)
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
                        <p>En la siguiente aplicación se muestra una simulación de un agente que hace parte de otra aplicación grande de multiagentes e una simulación multiagentes de un restaurante</p>
                    </article>
                    <div className="container tile is-parent content is-text is-multiline">
                        <article className="tile is-child notification is-success">
                            <h1 className="subtitle">Los tiempos para la simulación son los siguientes:</h1>
                            <ul>
                                <li>- Máximo de personas por grupos: {maxPersons}</li>
                                <li>- Máximo de grupos: {maxGroups}</li>
                                <li>- Número de mesas: {tables}</li>
                                <li>- Número de platos: {menu}</li>
                            </ul>
                        </article>
                    </div>
                    <div>
                        <div className="tile is-child buttons">
                            <button className="button is-primary">Iniciar
                            </button>
                            <button className="button is-link">Modificar Tiempos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
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
                                    Guardar tiempos
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
