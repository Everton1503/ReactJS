import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import iconAdd from './icon-add.png'

const minAno = 2019
const maxAno = 2022

const AddMonths = () => {
    const anos = []
    const meses = []
    const [redir, setRedir] = useState('')
    const refAno = useRef()
    const refMes = useRef()
    for(let i = minAno; i <= maxAno; i++){
        anos.push(i)
    }
    for(let i = 1; i<=12; i++){
        meses.push(i)
    }
    const zeroPad = num => {
        if(num < 10){
            return '0' + num
        }
        return num
    }
    const verMes = () => {
        setRedir(refAno.current.value + '-' + refMes.current.value)
    }
    if(redir!==''){
        return <Redirect to={'/moves/'+ redir} />
    }
    return (
        <div className='div-add'>
             <h3><img src={iconAdd} className='icon'/>Adicionar mês</h3>
           
            <select ref={refAno}>
                {anos.map(ano =>  <option key={ano} value={ano}>{ano}</option> )}
            </select>
            <select ref={refMes}>
                {meses.map(zeroPad).map(mes => <option key={mes} value={mes}>{mes}</option> )}
            </select>
            
            <button className='btn btn-primary' onClick={verMes}>NOVO MÊS</button>
        </div>
    )
}
export default AddMonths