const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'
const conn = require('./db/conn')

const authController = require('./controller/auth.controller')
const motoristaController = require('./controller/motorista.controller')
const funcionarioController = require('./controller/funcionario.controller')
const cargaController = require('./controller/carga.controller')
const authMiddleware = require('./middleware/auth.middleware')

// middleware

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// rotas publicas
app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.use(authMiddleware)

// rotas privadas
app.post('/motorista', motoristaController.cadastrar)
app.get('/motoristas', motoristaController.listar)
app.get('/motorista/:nome', motoristaController.consultar)
app.delete('/motorista/:id', motoristaController.deletar)
app.put('/motorista/:id', motoristaController.atualizar)

app.post('/carga', cargaController.cadastrar)
app.get('/carga', cargaController.listar)

app.get('/funcionarios', funcionarioController.listar)

app.listen(PORT, hostname, ()=>{
    console.log(`servidor rodando em http://${hostname}:${PORT}`)
})