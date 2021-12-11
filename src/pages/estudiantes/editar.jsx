import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enums';
import { EDITAR_ESTADO_ESTUDIANTE } from 'graphql/estudiantes/mutations';


const EditarEstudiante = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });


  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_ESTADO_ESTUDIANTE);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    editarUsuario({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Estado de estudiante modificado correctamente', {
        position:'bottom-right',
        theme: 'dark',
      });
    }
  }, [mutationData]);


  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el estado del estudiante', {
        position:'bottom-right',
        theme: 'dark',
      });
    }

    if (queryError) {
      toast.error('Error consultando el estudiante');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/estudiantes'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar estado del estudiante</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Nombre del estudiante:'
          type='text'
          name='nombre'
          defaultValue={queryData.Usuario.nombre}
          required={true}
          disabled={true}
        />
        <Input
          label='Apellido del estudiante:'
          type='text'
          name='apellido'
          defaultValue={queryData.Usuario.apellido}
          required={true}
          disabled={true}
        />
        <Input
          label='Correo del estudiante:'
          type='email'
          name='correo'
          defaultValue={queryData.Usuario.correo}
          required={true}
          disabled={true}
        />
        <Input
          label='Identificación del estudiante:'
          type='text'
          name='identificacion'
          defaultValue={queryData.Usuario.identificacion}
          required={true}
          disabled={true}
        />
        <DropDown
          label='Estado del estudiante:'
          name='estado'
          defaultValue={queryData.Usuario.estado}
          required={true}
          options={Enum_EstadoUsuario}
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

export default EditarEstudiante;
