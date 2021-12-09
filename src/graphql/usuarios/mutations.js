import { gql } from '@apollo/client';

const ACTUALIZAR_USUARIO = gql`
mutation Mutation($_id: String!, $correo: String!, $identificacion: String!, $nombre: String!, $apellido: String!) {
  ActualizarUsuario(_id: $_id, correo: $correo, identificacion: $identificacion, nombre: $nombre, apellido: $apellido) {
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

export { ACTUALIZAR_USUARIO };