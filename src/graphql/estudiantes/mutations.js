import { gql } from '@apollo/client';

const EDITAR_ESTADO_ESTUDIANTE = gql`

mutation EditarEstadoEstudiante(
  $_id: String!
  $estado: Enum_EstadoUsuario!
  ) {
  editarEstadoEstudiante(
    _id: $_id
    estado: $estado) {
      _id
      estado
    }
  }
`;

export { EDITAR_ESTADO_ESTUDIANTE };
