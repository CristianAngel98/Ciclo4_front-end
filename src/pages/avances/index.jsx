import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AVANCES } from 'graphql/avances/queries';
import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';

const IndexAvances = () => {
  const { data, error, loading } = useQuery(GET_AVANCES);



  useEffect(() => {
    if (error) {
      toast.error('Error consultando los avances');
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={['ESTUDIANTE']}>
      <div>
        <h2 className= 'titulosModulos'>
          AVANCES REGISTRADOS
        </h2>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de registro del avance</th>
              <th>Descripción</th>
              <th>Creado por</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data && data.FiltrarAvance ? (
              <>
                {data.FiltrarAvance.map((a) => {
                  return (
                    <tr key={a._id}>
                      <td>{a.proyecto.nombre}</td>
                      <td>{a.fecha}</td>
                      <td>{a.descripcion}</td>
                      <td>{a.creadoPor.nombre}</td>

                      <td>
                        {/* <Link to={`/estudiantes/editar/${a._id}`}>
                          <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                        </Link> */}
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

export default IndexAvances;
