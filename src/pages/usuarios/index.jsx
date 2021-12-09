import React, {useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { GET_USUARIOS } from 'graphql/usuarios/queries'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const IndexUsuarios = () => {
    const {data,error,loading} = useQuery(GET_USUARIOS)
    
    useEffect(() => {
    console.log("data servidor",data)
    }, [data])

    useEffect(() => {
      if(error){
        toast.error("Hubo un error en la consulta");
      }  
    }, [error])
    
    if (loading)
    return <div>Pagina cargando</div>
    
    
    return (<div>
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
          {data &&
            data.Usuarios.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.identificacion}</td>
                  <td>{u.rol}</td>
                  <td>{u.estado}</td>
                  <td>
                    <Link to={`/usuarios/editar/${u._id}`}>
                      <i className='fas fa-pen text-blue-700 hover:text-red-400 cursor-pointer' />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
    )
}

export default IndexUsuarios
