const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const mysql = require('mysql')
const cors = require('cors')

//configurando o body parser para pegar POSTS mais tarde
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//definindo as rotas
const router = express.Router()

router.get('/', (request, response) => response.json({ message: 'Conectou!' }))
router.get('/clientes', (request, response) => {
    execSqlQuery('SELECT Nome, CPF FROM Clientes order by id', [], response)
})
router.get('/clientes/:id?', (request, response) => {
    let filter = ''
    if(request.params.id) filter = `WHERE Id = ?`
    execSqlQuery(`SELECT * FROM Clientes ${filter}`, [parseInt(request.params.id)], response)
})
router.post('/clientes', (request, response) => {
    const { nome, cpf } = request.body
    execSqlQuery(`INSERT INTO Clientes VALUES(default, ?)`, [nome, cpf], response)
})
router.patch('/clientes/:id', (request, response) => {
    const id = parseInt(request.params.id)
    const { nome, cpf } = request.body
    execSqlQuery(`UPDATE Clientes SET Nome = '${nome}', CPF = '${cpf}' WHERE Id = ?`, [id], response)
})
router.delete('/clientes/:id', (request, response) => {
    execSqlQuery(`DELETE FROM Clientes WHERE Id = ?`, [parseInt(request.params.id)], response)
})

app.use('/', router)

app.listen(port)
console.log('API Funcionando!')

function execSqlQuery(sqlQuery, values, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'node_sql'
    })

    connection.query(sqlQuery, [values], (error, results, fields) => {
        error ? res.json(error) : res.json(results)

        connection.end()
    })
}