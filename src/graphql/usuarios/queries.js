import { gql } from '@apollo/client';
//////Dentro de la carpeta de graphql se deben meter todas las mutaciones y queries que se necesiten tanto para pryecto como para usuarios etc.
//// Se crea dentro de la carpeta de graphql y hay una subcarpeta llamada "proyectos", "usuarios" etc
const GET_USUARIOS = gql`
query Usuarios {
  Usuarios {
    _id
    nombre
    apellido
    identificacion
    correo
    rol
    estado
  }
}
`;

const GET_USUARIO = gql`
query Query($_id: String!) {
  Usuario(_id: $_id) {
    _id
    correo
    identificacion
    nombre
    apellido
    rol
    estado
  }
}
`;

export { GET_USUARIOS, GET_USUARIO };