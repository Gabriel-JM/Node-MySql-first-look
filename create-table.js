const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'node_sql'
})

connection.connect(err => {
    err ? console.log(err) : console.log('Conectou!!')
    createTable(connection)
})

function createTable(connection) {
    const sql = `
    CREATE TABLE IF NOT EXISTS Clientes (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Nome VARCHAR(80) NOT NULL,
        CPF CHAR(11) NOT NULL 
    )`

    connection.query(sql, (error, results, fields) => {
        if (error) return console.log(error)
        console.log('Criou a Tabela!')
        insertRows(connection)
    })
}

function insertRows(connection) {
    const sql = 'INSERT INTO Clientes(Nome, CPF) VALUES ?'
    const values = [
        ['teste1', '12345678901'],
        ['teste2', '09876543210'],
        ['teste3', '12312312399']
    ]

    connection.query(sql, [values], (error, results, fields) => {
        if(error) return console.log(error);
        console.log('Adicionou registros!')
        connection.end()
    })
}