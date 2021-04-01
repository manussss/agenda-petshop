const moment = require('moment')
const connection = require('./infraestrutura/connection')

class Atendimento {
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        } else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSER INTO Atendimentos SET ?'


            connection.query(sql, atendimentoDatado, (err, resultados) => {
                if(err){
                    res.status(400).json(err)
                } else{
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    list(res){
        const sql = 'SELECT * FROM Atendimentos'
        connection.query(sql, (err, resultados) => {
            if(err){
                res.status(400).json(err)
            } else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`
        
        connection.query(sql, (err, resultados) => {
            const atendimento = resultados[0]
            if(err){
                res.status(400).json(err)
            } else{
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        connection.query(sql, [valores, id], (err, resultados) => {
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(...valores, id)
            }
        })
    }

    deleta(id, res){
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        connection.query(sql, id, (err, resultados) => {
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json({id})
            }
        })
    }
}

modules.exports = new Atendimento