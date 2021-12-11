import { gql } from '@apollo/client';

const GET_ESTUDIANTES = gql`
  query Query($filtro: FiltroUsuarios) {
    Estudiantes(filtro: $filtro) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const GET_USUARIO = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

export { GET_ESTUDIANTES, GET_USUARIO };
