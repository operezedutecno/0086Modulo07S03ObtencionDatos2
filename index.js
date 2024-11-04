const { Pool } = require("pg");
const { errorFormat } = require("./functions.js")

const conPool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'dvdrental',
    user: 'postgres',
    password: 'postgres'
});


(async () => {
    // Ejemplo de consulta a la Base de Datos de forma asíncrona
    conPool.query("SELECT * FROM actor1 LIMIT $1", [10], (e, res) => {
        if(e) return console.log(errorFormat(e));
        console.log(res.rowCount); // Cantidad de registros obtenidos.
        console.log(res.rows); // Filas o registros obtenidos.
    })



    // // Ejemplo de consulta a la Base de Datos de forma síncrona
    const arguments = {
        text: "SELECT actor_id FROM actor LIMIT $1",
        values: [15]
    }

    try {
        const result = await conPool.query(arguments);
        console.log(result.rows);
    } catch (error) {
        console.log(errorFormat(error))
    }
    
})();