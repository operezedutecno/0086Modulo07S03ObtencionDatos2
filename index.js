const { Pool, Client } = require("pg");
const Cursor = require("pg-cursor");
const { errorFormat } = require("./functions.js");

const conPool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'dvdrental',
    user: 'postgres',
    password: 'postgres'
});

const conClient = new Client({
    host: 'localhost',
    port: 5432,
    database: 'dvdrental',
    user: 'postgres',
    password: 'postgres'
});

const sleep = (duration) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, duration * 1000);
    })
}


(async () => {
    // // Ejemplo de consulta a la Base de Datos de forma asíncrona
    // conPool.query("SELECT * FROM actor1 LIMIT $1", [10], (e, res) => {
    //     if(e) return console.log(errorFormat(e));
    //     console.log(res.rowCount); // Cantidad de registros obtenidos.
    //     console.log(res.rows); // Filas o registros obtenidos.
    // })



    // // Ejemplo de consulta a la Base de Datos de forma síncrona
    // const arguments = {
    //     text: "SELECT actor_id FROM actor LIMIT $1",
    //     values: [15]
    // }

    // try {
    //     const result = await conPool.query(arguments);
    //     console.log(result.rows);
    // } catch (error) {
    //     console.log(errorFormat(error))
    // }



    // Ejemplo de cursor.
    conClient.connect();
    const cursorDefinition = new Cursor("SELECT * FROM actor LIMIT $1", [100])
    const result = await conClient.query(cursorDefinition);

    // Ejemplo asíncrono (uso de callback)
    // result.read(3).then(result => {
    //     console.log(result);
    //     conClient.end();
    // })

    // Ejemplo síncrono (uso de await)
    console.log(await result.read(3));
    await sleep(5);
    console.log(await result.read(2));
    
    conClient.end();
})();