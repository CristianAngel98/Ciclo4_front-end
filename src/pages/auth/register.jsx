// import React from 'react'
// import Input from 'components/Input'
// import ButtonLoading from 'components/ButtonLoading'
// import DropDown from 'components/Dropdown'
// import { enumRol } from 'utils/enums'
// import useFormData from 'hooks/useFormData'
// import { Link } from 'react-router-dom'

// const Register = () => {
//     const { form, FormData, updateFormData} = useFormData();
    
//     const submitForm = (e) =>{
//         e.preventDefault();
//     }
//     return(
//         <div className= 'flex flex col h-full items-center justify-center'>
//            <h1 className= 'flex-3x1 font bold my-4'>Registrate</h1>
//            <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
//             <div className='grid grid-cols-2 gap-5'>
//                 <Input label='Nombre: ' name='nombre' type='text' required />
//                 <Input label='Apellido: ' name='apellido' type='text' required />
//                 <Input label='Documento: ' name='documento' type='text' required />
//                 <DropDown label= 'Rol deseado: ' name='rol' requiered={true} options={Enum_rol} />
//                 <Input label='Correo: ' name='correo' type= 'email' required />
//                 <Input label='Contraseña: ' name='contraseña' type='password' required />
//             </div>
//             <ButtonLoading
//             disabled={Object.keys(FormData).length ===0}
//             loading={false}
//             text='Registrarme'
//             />
//         </form>
//         <spam> ¿Ya tienes una cuenta? </spam>
//         <link to='auth/login'>
//             <span className='text-blue-600'> Inicia Sesion.</span>
//         </link>
//         </div>
//     )  
// }

// export default Register
