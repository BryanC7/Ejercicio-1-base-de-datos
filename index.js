import pg from 'pg'
const {Pool} = pg

const pool = new Pool ({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'usuarios', // Nombre de la base de datos utilizada actualmente
    max: 20, //numero de conexiones maximas
    idleTimeoutMillis: 5000, //cantidad maxima de milisegundos que puede estar inactiva la sesion antes de cerrarse
    connectionTimeoutMillis: 2000 //tiempo de espera para que se concrete la conexión, de lo contrario arroja error
})


//Primero se almacenan los parametros enviados desde la terminal en el arreglo args.
if (process.argv[2]){
    evaluarFuncion(process.argv[2])
}

//Luego se verifica el primer argumento enviado y se evalúa para determinar que función inicializar.
function evaluarFuncion(opcion){
    switch (opcion){
        case 'insertar':
            insertarUsuario()
            break
        case 'consulta':
            consultarUsuarios()
            break
        case 'editar':
            editarUsuario()
            break
        case 'eliminar':
            eliminarUsuario()
            break
        default:
            break
    }
}


//FUNCION PARA INSERTAR EN LA TABLA usuarios
function insertarUsuario(){   
    pool.query({
        name: 'insertar',
        text: 'INSERT INTO usuarios (nombre, apellido) VALUES ($1 , $2) RETURNING *',
        values: [process.argv[3], process.argv[4]]
    }, (err,res) => {
        if (err) throw err
        else {
            console.log('Usuario insertado con éxito.')
            console.table(res.rows)
        }
        pool.release
    })
}

//SCRIPT PARA MOSTRAR LA TABLA INDICADA
function consultarUsuarios(){
    pool.query({
        name: 'consulta',
        text: 'SELECT * FROM usuarios'
    }, (err,res) => {
        if (err) throw err
        else {
            console.table(res.rows)
        }
        pool.release
    })
}

//FUNCION PARA EDITAR UN USUARIO POR ID
function editarUsuario(){
    pool.query({
        name: 'editar',
        text: `UPDATE usuarios SET nombre = $2 , apellido = $3 WHERE idusuario = $1 RETURNING *`,
        values: [process.argv[3], process.argv[4], process.argv[5]]      
    },(err,res)=>{
        if (err) throw err
        else {
            console.log('Usuario editado con éxito.')
            console.table(res.rows)
        }
        pool.release
    })
}

//FUNCION PARA ELIMINAR USUARIO POR ID
function eliminarUsuario(){
    pool.query({
        name: 'eliminar',
        text: 'DELETE FROM usuarios WHERE idusuario = $1 RETURNING *',
        values: [process.argv[3]]
    },(err,res)=>{
        if (err) throw err
        else {
            console.log('Usuario eliminado con éxito.')
            console.table(res.rows)
        }
        pool.release
    })
}