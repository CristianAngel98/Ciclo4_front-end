import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ESTUDIANTES } from 'graphql/estudiantes/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';

const IndexEstudiantes = () => {
  const { data, error, loading } = useQuery(GET_ESTUDIANTES);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los estudiantes');
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={['LIDER']}>
      <div>
        Datos Estudiantes:
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Estudiantes ? (
              <>
                {data.Estudiantes.map((e) => {
                  return (
                    <tr key={e._id}>
                      <td>{e.nombre}</td>
                      <td>{e.apellido}</td>
                      <td>{e.correo}</td>
                      <td>{e.identificacion}</td>
                      <td>{Enum_Rol[e.rol]}</td>
                      <td>{Enum_EstadoUsuario[e.estado]}</td>
                      <td>
                        <Link to={`/estudiantes/editar/${e._id}`}>
                          <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
      </div>
    </PrivateRoute>
  );
};

export default IndexEstudiantes;
