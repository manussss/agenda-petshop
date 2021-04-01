const connection = require('./infraestrutura/connection')

class Atendimento {
    adiciona(atendimento){
        const sql = 'INSER INTO Atendimentos SET ?'

        connection.query(sql, atendimento, (err, resultados) => {
            if(err){
                console.log(err)
            } else{
                console.log(resultados)
            }
        })
    }
}

modules.exports = new Atendimento