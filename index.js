const customExpress = require('./config/customExpress')
const connection = require('./infraestrutura/connection')
const Tabelas = require('./infraestrutura/Tabelas')
connection.connect(err => {
    if(err){
        console.log(err)
    }
    else{
        console.log('conectado com sucesso')
        Tabelas.init(connection)
        const app = customExpress()

        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
    }
})
