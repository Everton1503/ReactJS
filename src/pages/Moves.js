import React, { useState } from 'react'
import Rest from '../utils/rest'
import { Link } from 'react-router-dom'
import iconSaldo from './icon-saldo.png'
import iconPrev from './icon-prev.png'

const baseURL = 'https://mymoney-everton.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)


const Moves = ({ match }) => {
    const data = useGet(`moves/${match.params.data}`)
    const dataMeses = useGet(`meses/${match.params.data}`)
    const [postData, salvar] = usePost(`moves/${match.params.data}`)
    const [patchData, patch] = usePatch()
    const [removeData, remover] = useDelete()
    const [describe, setDescribe] = useState('')
    const [valor, setValor] = useState('')

    const onChangeDescribe = evt => {
        setDescribe(evt.target.value)
    }
    const onChangeValor = evt => {
        setValor(evt.target.value)
    }
    const sleep = time => new Promise(resolve => setTimeout(resolve, time))
    const saveMoves = async() => {
        if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0)
            await salvar({
                describe,
                valor: parseFloat(valor)
            })
            setDescribe('')
            setValor(0)
            data.refetch()
            await sleep(3000)
            dataMeses.refetch()
    }
    const removerMoves = async(id) => {
        await remover(`moves/${match.params.data}/${id}`) 
        data.refetch()
        await sleep(3000)
        dataMeses.refetch()
    }
    const alterarPrevisaoEntrada = (evt) => {
        patch(`meses/${match.params.data}`, { previsao_entrada: evt.target.value })
    }
    const alterarPrevisaoSaida = (evt) => {
        patch(`meses/${match.params.data}`, { previsao_saida: evt.target.value })
    }
    return (
        <div className='container'>
            <h1> Movimentacoes </h1>
            <div>           
            {
                !dataMeses.loading && dataMeses.data && <div className='div-moves'>
                    
                    <h3><img src={iconSaldo} className='icon'/>Saldo Atual:</h3>
                    Entradas: {dataMeses.data.entradas}
                    <br/>
                    <br/>
                    Saídas: {dataMeses.data.saidas}
                </div>
            }
            {
                !dataMeses.loading && dataMeses.data && <div className='div-moves1'>
                    
                    <h3><img src={iconPrev} className='icon'/>Previsão Esperada:</h3>
                    Previsão entrada: {dataMeses.data.previsao_entrada}  <input type='text' onBlur={alterarPrevisaoEntrada}></input> 
                    <br/>
                    <br/>
                    Previsão saida: {dataMeses.data.previsao_saida} <input type='text' onBlur={alterarPrevisaoSaida}></input>
                </div>
            }
            </div>
            <div className='div-months'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                { data.data &&
                    Object
                    .keys(data.data)
                    .map(moves => { 
                        return (
                        <tr key={moves}>
                            <td> {data.data[moves].describe}</td>
                            <td> 
                                {data.data[moves].valor}
                                <button className='btn btn-danger' onClick={() => {
                                    removerMoves(moves)
                                }}>-</button>
                            </td>
                        </tr>
                        )
                    }   
                        )
                }
                <tr>
                    <td><input type='text' value={describe} onChange={onChangeDescribe}/></td>
                    <td>
                        <input type='text' value={valor} onChange={onChangeValor}/>
                        <button className='btn btn-success' onClick={saveMoves}>+</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
     
    )
  }
  export default Moves