import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_DATOS_PERSONALES } from 'graphql/usuarios/mutations';
import { useUser } from "context/userContext";


const EditarDatosPersonales = () => {
const { userData } = useUser();
  const { form, formData, updateFormData } = useFormData(null);


  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id: userData._id },
  });


  const [editarDatosPersonales, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_DATOS_PERSONALES);

  const submitForm = (e) => {
    e.preventDefault();
    editarDatosPersonales({
      variables: { _id: userData._id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Datos personales modificados correctamente', {
        position:'bottom-right',
      });
    }
  }, [mutationData]);


  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando datos personales', {
        position:'bottom-right',
      });
    }

    if (queryError) {
      toast.error('Error consultando datos personales');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/misdatos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-500 font-bold text-center'>Editar mis datos personales</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Nombre:'
          type='text'
          name='nombre'
          defaultValue={queryData.Usuario.nombre}
          required={true}
        />
        <Input
          label='Apellidos:'
          type='text'
          name='apellido'
          defaultValue={queryData.Usuario.apellido}
          required={true}
        />
        <Input
          label='Correo:'
          type='email'
          name='correo'
          defaultValue={queryData.Usuario.correo}
          required={true}
        />
        <Input
          label='Identificación:'
          type='text'
          name='identificacion'
          defaultValue={queryData.Usuario.identificacion}
          required={true}
        />


        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  );
};

export default EditarDatosPersonales;
