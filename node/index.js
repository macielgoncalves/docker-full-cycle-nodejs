const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')  

app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)    

    connection.connect(function(err) {
        if (err) throw err;

        const createTable = `create table if not exists people(id int not null auto_increment, name varchar(255), primary key (id))`
        connection.query(createTable)

        const sql = `INSERT INTO people(name) VALUES('Maciel Kamers G.')`
        connection.query(sql)

        connection.query("SELECT id, name FROM people", function (err, result, fields) {
            if (err) throw err;

            var html = "<h1>Full Cycle!!!</h1></p></p>"
            html += "<p>- Lista de nomes cadastrada no banco de dados.</p>"
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                html += "<br>" + row.id + " - " + row.name
                console.log(row.name)
            });

            res.send(html)
            console.log(result);
            connection.end()  
        });
    });
})

app.listen(port, () => {
    console.log('Rodando na porta: ' + port)
})