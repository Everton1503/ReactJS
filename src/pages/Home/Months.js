import React from 'react'
import Rest from '../../utils/rest'
import { Link } from 'react-router-dom'
import iconMonths from './icon-months.png'

const baseURL = 'https://mymoney-everton.firebaseio.com/'
const { useGet } = Rest(baseURL)

const Months = () => {
    const data = useGet('meses')
        if(data.loading) {
            return ( 
                <span>Carregando</span>
            )
        }
        if(!data.loading) {
            return (
                <div className='div-months'>
                    <h3><img src={iconMonths} className='icon' /> Histórico dos Meses </h3>
                    <table className='table'>
                    <thead>
                    <tr>
                        <th>Mês</th>
                        <th>Previsão entrada</th>
                        <th>Entrada</th>
                        <th>Previsão Saída</th>
                        <th>Saída</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                        Object
                        .keys(data.data)
                        .map(mes => { 
                            return (
                                <tr key={mes}>
                                <td><Link to={`/moves/${mes}`}>{mes}</Link></td>
                                <td> {data.data[mes].previsao_entrada}</td>
                                <td> {data.data[mes].entradas}</td>
                                <td> {data.data[mes].previsao_saida}</td>
                                <td> {data.data[mes].saidas}</td>
                            </tr>
                            )
                        }   
                            )
                        }
                    </tbody>
                    </table>
                    </div>  
                    )
            }
             
}
export default Months
