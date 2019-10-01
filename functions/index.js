const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.soma = functions.database.ref('/moves/{dia}')
    .onWrite(async(change, context) => {
        const mesesRef = admin.database().ref('/meses/'+context.params.dia)
        const movesRef = change.after.ref
        const movesSS = await movesRef.once('value')
        const moves = movesSS.val()

        let entradas = 0
        let saidas = 0

        Object.keys(moves).forEach( m => {
            if(moves[m].valor > 0){
                entradas += moves[m].valor
            }else{
                saidas += moves[m].valor
            }
        })
        return mesesRef.transaction(current => {
            if(current === null){
                return {
                    entradas,
                    saidas,
                    previsao_entrada: 0,
                    previsao_saida: 0
                }
            }
            return {
                ...current,
                entradas,
                saidas
            }
        })
    })
