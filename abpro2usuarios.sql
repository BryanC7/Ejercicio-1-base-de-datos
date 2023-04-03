-- Active: 1680182167415@@127.0.0.1@5432@usuarios
CREATE TABLE usuarios (
    idusuario SERIAL NOT NULL PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50)
);