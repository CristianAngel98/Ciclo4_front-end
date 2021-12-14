import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USUARIO } from "graphql/usuarios/queries";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";

const DatosPersonales = () => {
  const { userData } = useUser();
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id: userData._id },
  });

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando el estudiante");
    }
  }, [queryError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <h1 className='m-4 text-3xl text-gray-500 font-bold text-center'>
        Mis datos personales
      </h1>
      <div className='text-gray-600 datosPersonales '>
        <div className='datoBasico'>Nombre: {queryData.Usuario.nombre} </div>
        <br />
        <div className='datoBasico'>
          Apellidos: {queryData.Usuario.apellido}{" "}
        </div>
        <br />
        <div className='datoBasico'>
          Identificación: {queryData.Usuario.identificacion}
        </div>
        <br />
        <div className='datoBasico'>Correo: {queryData.Usuario.correo} </div>
        <br />
        <div className='datoBasico'>
          {" "}
          Rol en el sistema: {queryData.Usuario.rol}{" "}
        </div>
        <br />
        <div className='datoBasico'>
          {" "}
          Estado en el sistema: {queryData.Usuario.estado}{" "}
        </div>
        <br />
        <div className='datoBasico'>
          <spam className='font-bold datoBasicoEdit'>Editar mis datos</spam>
          <Link to={`/misdatos/editar/${queryData.Usuario._id}`}>
            <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DatosPersonales;
