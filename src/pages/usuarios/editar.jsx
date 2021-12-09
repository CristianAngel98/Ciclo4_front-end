import React, {useEffect} from 'react'
import { useParams, } from 'react-router'
import { useQuery, useMutation} from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading'
import { Link } from 'react-router-dom';
// import DropDown from 'components/DropDown';
import useFormData from 'hooks/useFormData'
//import { EDITAR_USUARIO } from 'graphql/usuarios/mutations'
import { ACTUALIZAR_USUARIO } from 'graphql/usuarios/mutations';
import { toast } from 'react-toastify';

const EditarUsuario = () => {
    const { form, formData, updateFormData} = useFormData(null);
    const { _id } = useParams();
    const { data:queryData, error:queryError, loading: queryLoading} = useQuery(GET_USUARIO, {
        variables: { _id },
    });

    const [ActualizarUsuario, { data:mutationData, loading:mutationLoading, error:mutationError }] =
     useMutation(ACTUALIZAR_USUARIO);

    const submitForm = (e) =>{
        e.preventDefault();
        console.log("form data", formData)
        ActualizarUsuario({
            variables: {_id, ...formData, rol:'ADMINISTRADOR'},
        });
    };
    useEffect(() => {
        if (mutationData)
        toast.success('Modificacion realizada con exito', {
          position: "bottom-right",
          theme: "dark",
        });
    }, [mutationData])

    useEffect(() => {
      if(mutationError){
        toast.error("Hubo un error en la modificacion del usuario");
      }  
      if(queryError){
        toast.error("Error en la consulta de usuarios");
      }
    }, [queryError, mutationError])
    


    if (queryLoading)return <div>Pagina cargando</div>
   
    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
        <Link to='/usuarios'>
          <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
        </Link>
            <h1 className= 'm-4 text-3xl text-black font-bold text-center'>Edite su usuario</h1>
            
        <form
         onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Nombre de la persona:'
          type='text'
          name='nombre'
          defaultValue={queryData.Usuario.nombre}
          required={true}
        />
        <Input
          label='Apellido de la persona:'
          type='text'
          name='apellido'
          defaultValue={queryData.Usuario.apellido}
          required={true}
        />
        <Input
          label='Correo de la persona:'
          type='email'
          name='correo'
          defaultValue={queryData.Usuario.correo}
          required={true}
        />
        <Input
          label='Identificación de la persona:'
          type='text'
          name='identificacion'
          defaultValue={queryData.Usuario.identificacion}
          required={true}
        />
        {/* <DropDown
          label='Estado de la persona:'
          name='estado'
          defaultValue={data.Usuario.estado}
          required={true}
          options={Enum_EstadoUsuario}
        /> */}
        {/* <span>Rol del usuario: {queryData.Usuario.rol}</span> */}
        <ButtonLoading disabled={Object.keys(formData).length===0} loading={mutationLoading} text='Confirmar'/>
      </form>
    </div>
  );
};









export default EditarUsuario