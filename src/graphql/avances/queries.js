import { gql } from '@apollo/client';

const GET_AVANCES = gql`
query FiltrarAvance($_id: String!) {
  FiltrarAvance(_id: $_id) {
  proyecto {
    nombre
  }
  fecha
  descripcion
  creadoPor {
    nombre
    apellido
  }
  }
}
`;

export { GET_AVANCES };
