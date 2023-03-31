import pg from 'pg';
const {Pool} = pg;

const pool = new Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'abpro2',
    max: 20, //numero de conexiones maximas
    idleTimeoutMillis: 5000, //cantidad maxima de milisegundos que puede estar inactiva la sesion antes de cerrarse
    connectionTimeoutMillis: 2000 //tiempo de espera para que se concrete la conexión, de lo contrario arroja error
})



//SCRIPT PARA INSERTAR EN LA TABLA usuarios
pool.query({
    name: 'insertar',
    text: 'INSERT INTO usuarios (nombre, apellido) VALUES ($1 , $2) RETURNING *',
    values: ['Emerson','Ramazotti']
}, (err,res)=>{
    if (err) throw err
    else {console.table(res.rows)}
    pool.release;
})


//SCRIPT PARA MOSTRAR LA TABLA usuarios
let arrayInfo;
pool.query({
    name: 'consulta',
    text: 'SELECT * FROM usuarios',
}, (err,res)=>{
    if (err) throw err;
    else {arrayInfo = res.rows}
    pool.release;
    console.log(arrayInfo);
})