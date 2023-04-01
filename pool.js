import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "abp2",
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
});

pool.query({
    name: "insertar", 
    text: "INSERT INTO estudiantes (nombre, rut) VALUES ($1, $2) RETURNING *",
    values: ["René Delgado", "9.165.922-0"]},
    (err, res) => {
        if(err) throw err
         else {
    console.table(res.rows);
        }
        pool.release;
    });

pool.query({
    name: "consulta",
    text: "SELECT * FROM estudiantes"
},
    (err, res) => {
        if (err) throw err
        else { console.log(res.rows) }
        pool.release;
    });

pool.query({
    name: "consulta rut",
    text: "SELECT * FROM estudiantes WHERE rut = $1",
    values: ["25.174.480-6"]
},
    (err, res) => {
        if (err) throw err
        if (res.rows.length > 0) { console.log(res.rows) 
        } 
        else { console.log("estudiante no existe")}

        pool.release;
    });

    pool.query({
        name: "actualizar",
        text: "UPDATE estudiantes SET nombre = $2, rut = $3 WHERE id = $1 RETURNING *",
        values: [1, "Sebastián Egaña", "19.772.259-2"]
    },
        (err, res) => {
            if (err) throw err
            else { console.table(res.rows)}
    
            pool.release;
        });

        pool.query({
            name: "eliminar",
            text: "DELETE FROM estudiantes WHERE nombre = $1 RETURNING *",
            values: ["Andrea Jiménez"]
        },
            (err, res) => {
                if (err) throw err
                else { console.table(res.rows)}
        
                pool.release;
            });
    