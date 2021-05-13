import React, {useState} from 'react';
import './App.css';
import 'bulma/css/bulma.css';

function App() {

    const [maxPersons, setMaxPersons] = useState<number>(30);
    const [maxGroups, setMaxGroups] = useState<number>(25);
    const [tables, setTables] = useState<number>(16);
    const [menu, setMenu] = useState<number>(20);
    const [buttons, setButtons] = useState(0);
    const [arrivals, setArrivals] = useState<Array<number>>([])
    const [orders, setOrders] = useState<Array<{ estado: string, id: number, ordenes: Array<{ id_cliente: number, nombre: string, platos: Array<number> }> }>>([])
    const [eat, setEat] = useState<Array<{ tiempo: number, id_encargado: number, metodo_pago: string, hora: string, clientes: Array<{ id_cliente: number, nombre: string, platos: Array<number> }> }>>([])
    const [invoices, setInvoices] = useState<Array<{ id_encargado: number, id_mesa: number, metodo_pago: string, hora: string, valor: number, clientes: Array<{ id_cliente: number, nombre: string, platos: Array<number> }> }>>([])
    const [info, setInfo] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [buttonOrders, setButtonOrders] = useState(false);
    const [buttonEat, setButtonEat] = useState(false);
    const [buttonInvoice, setButtonInvoice] = useState(false);
    const [modal, setModal] = useState("");

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
        await response.json();
        const get_1 = await fetch('https://agente-cliente.herokuapp.com/clientes/llegada')
        const get_2 = await fetch('https://agente-cliente.herokuapp.com/clientes/orden')
        const get_3 = await fetch('https://agente-cliente.herokuapp.com/clientes/comer')
        const get_4 = await fetch('https://agente-cliente.herokuapp.com/clientes/factura')
        const res_1 = await get_1.json();
        const res_2 = await get_2.json();
        const res_3 = await get_3.json();
        const res_4 = await get_4.json();
        setArrivals(res_1)
        setOrders(res_2)
        setEat(res_3)
        setInvoices(res_4)
        setInfo(true)
        setLoading(false)
    }

    const changeButton = (option: number) => {
        if (option === 1) {
            setButtons(1)
        } else if (option === 2) {
            setButtons(2)
        }
    }

    const onClickEat = () => {
        setButtonEat(true)
        setModal("is-active")
    }

    const onClickButtonInvoice = () => {
        setButtonInvoice(true)
        setModal("is-active")
    }

    const onClickButtonOrders = () => {
        setButtonOrders(true)
        setModal("is-active")
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
                            aplicación grande de multiagentes de una simulación multiagentes de un restaurante</p>
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
                    <div className="tile is-child buttons">
                        <button className={loading ? "button is-primary button is-loading" : "button is-primary"}
                                onClick={() => {
                                    setLoading(true)
                                    send_info();
                                    changeButton(1)
                                }}>Iniciar
                        </button>
                        <button className="button is-link" onClick={() => changeButton(2)} disabled={loading}>Modificar
                            Tiempos
                        </button>
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
                                <input className="input" type="text" value={maxPersons} onChange={(e) => {
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
            <div hidden={buttons !== 1}>
                {
                    info && <div className="container is-center">
                        <h1 className="title">Resultados</h1>
                        <div className="container tile is-parent content is-text is-multiline">
                            <article className="tile is-child notification is-link">
                                <ol>
                                    <ul>Llegaron {arrivals.length} grupos de personas, los grupos se organizan de la
                                        siguiente manera: {arrivals.map(group => {
                                            return `\n Un grupo de ${group} personas`
                                        })}</ul>
                                    <ul>Hay {orders.length} pedidos.</ul>
                                </ol>
                                <div className="container buttons tile is-child">
                                    <button className="button is-info" onClick={() => onClickButtonOrders()}>Pedidos
                                    </button>
                                    <button className="button is-success" onClick={() => onClickEat()}>Tiempo de
                                        comida
                                    </button>
                                    <button className="button is-warning" onClick={() => onClickButtonInvoice()}>Pagos
                                    </button>
                                </div>
                            </article>
                        </div>
                    </div>
                }
            </div>
            {
                buttonOrders && <div className={`modal ${modal}`}>
                    <div className="modal-background"/>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Pedido</p>
                            <button className="delete" aria-label="close" onClick={() => {
                                setModal("");
                                setButtonOrders(false)
                            }}/>
                        </header>
                        <section className="modal-card-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th><abbr title="id">Id Pedido</abbr></th>
                                    <th><abbr title="status">Estado</abbr></th>
                                    <th><abbr title="client">Cliente</abbr></th>
                                    <th><abbr title="food">Platos</abbr></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    orders.map((order) => {
                                        const nodes: React.ReactNode[] = []
                                        if (order.ordenes.length === 1) {
                                            nodes.push(<tr>
                                                <td>{order.id}</td>
                                                <td>{order.estado}</td>
                                                <td>{order.ordenes[0].nombre}</td>
                                                <td>{order.ordenes[0].platos.toString()}</td>
                                            </tr>)
                                        } else {
                                            nodes.push(<tr>
                                                <td rowSpan={order.ordenes.length + 1}>{order.id}</td>
                                                <td rowSpan={order.ordenes.length + 1}>{order.estado}</td>
                                                <td>{order.ordenes[0].nombre}</td>
                                                <td>{order.ordenes[0].platos.toString()}</td>
                                            </tr>)
                                            order.ordenes.forEach(order_1 => {
                                                nodes.push(<tr>
                                                    <td>{order_1.nombre}</td>
                                                    <td>{order_1.platos.toString()}</td>
                                                </tr>)
                                            })
                                        }
                                        return nodes
                                    })
                                }
                                </tbody>
                            </table>
                        </section>
                    </div>
                    <button className="modal-close is-large" aria-label="close"
                            onClick={() => {
                                setModal("");
                                setButtonOrders(false)
                            }}/>
                </div>
            }
            {
                buttonInvoice && <div className={`modal ${modal}`}>
                    <div className="modal-background"/>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Facturas</p>
                            <button className="delete" aria-label="close" onClick={() => {
                                setModal("");
                                setButtonInvoice(false)
                            }}/>
                        </header>
                        <section className="modal-card-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th><abbr title="at">Encargado</abbr></th>
                                    <th><abbr title="start">Mesa</abbr></th>
                                    <th><abbr title="et">Método de Pago</abbr></th>
                                    <th><abbr title="exit">Valor</abbr></th>
                                    <th><abbr title="wt">Cliente</abbr></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    invoices.map((order) => {
                                        const nodes: React.ReactNode[] = []
                                        if (order.clientes.length === 1) {
                                            nodes.push(<tr>
                                                <td>{order.id_encargado}</td>
                                                <td>{order.id_mesa}</td>
                                                <td>{order.metodo_pago}</td>
                                                <td>{order.valor}</td>
                                                <td>{order.clientes[0].nombre}</td>
                                            </tr>)
                                        } else {
                                            nodes.push(<tr>
                                                <td rowSpan={order.clientes.length + 1}>{order.id_encargado}</td>
                                                <td rowSpan={order.clientes.length + 1}>{order.id_mesa}</td>
                                                <td rowSpan={order.clientes.length + 1}>{order.metodo_pago}</td>
                                                <td rowSpan={order.clientes.length + 1}>{order.valor}</td>
                                                <td>{order.clientes[0].nombre}</td>
                                            </tr>)
                                            order.clientes.forEach(cliente => {
                                                nodes.push(<tr>
                                                    <td>{cliente.nombre}</td>
                                                </tr>)
                                            })
                                        }
                                        return nodes
                                    })
                                }
                                </tbody>
                            </table>
                            *Cuando aparece un valor negativo, es porque aún no llega a la estación
                            del proceso
                        </section>
                    </div>
                    <button className="modal-close is-large" aria-label="close"
                            onClick={() => {
                                setModal("");
                                setButtonInvoice(false)
                            }}/>
                </div>
            }
            {
                buttonEat && <div className={`modal ${modal}`}>
                    <div className="modal-background"/>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Tiempo de comida</p>
                            <button className="delete" aria-label="close" onClick={() => {
                                setModal("");
                                setButtonEat(false)
                            }}/>
                        </header>
                        <section className="modal-card-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th><abbr title="at">Encargado</abbr></th>
                                    <th><abbr title="et">Método de Pago</abbr></th>
                                    <th><abbr title="exit">Tiempo de consumo</abbr></th>
                                    <th><abbr title="start">Cliente</abbr></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    eat.map((order) => {
                                        const nodes: React.ReactNode[] = []
                                        if (order.clientes.length === 1) {
                                            nodes.push(<tr>
                                                <td>{order.id_encargado}</td>
                                                <td>{order.metodo_pago}</td>
                                                <td>{order.tiempo}</td>
                                                <td>{order.clientes[0].nombre.toString()}</td>
                                            </tr>)
                                        } else {
                                            nodes.push(<tr>
                                                <td rowSpan={order.clientes.length + 1}>{order.id_encargado}</td>
                                                <td rowSpan={order.clientes.length + 1}>{order.metodo_pago}</td>
                                                <td rowSpan={order.clientes.length + 1}>{order.tiempo}</td>
                                                <td>{order.clientes[0].nombre.toString()}</td>
                                            </tr>)
                                            order.clientes.forEach(order_1 => {
                                                nodes.push(<tr>
                                                    <td>{order_1.nombre}</td>
                                                </tr>)
                                            })
                                        }
                                        return nodes
                                    })
                                }
                                </tbody>
                            </table>
                            *Cuando aparece un valor negativo, es porque aún no llega a la estación
                            del proceso
                        </section>
                    </div>
                    <button className="modal-close is-large" aria-label="close"
                            onClick={() => {
                                setModal("");
                                setButtonEat(false)
                            }}/>
                </div>
            }
        </div>
    );
}

export default App;
