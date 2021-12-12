import { gql } from '@apollo/client';

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      fase
      objetivos {
        descripcion
        tipo
      }
      lider {
        _id
        correo
      }
      inscripciones {
        estado
        estudiante {
          _id
        }
      }
    }
  }
`;

const GET_PROYECTO = gql` 
  query Proyecto($_id: String!) {
    Proyecto(_id: $_id) {
      _id
      nombre
      fase
      estado
    }
  }
`;

export { PROYECTOS, GET_PROYECTO };
