-- Active: 1680180900307@@127.0.0.1@5432@abpro2@public
CREATE TABLE usuarios(
    idusuario SERIAL NOT NULL PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50)
)