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
query Usuario($id: String) {
  Usuario(_id: $id) {
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

export { GET_USUARIOS, GET_USUARIO };