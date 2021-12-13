import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import PrivateComponent from './PrivateComponent';

const SidebarLinks = () => {
  return (
    <ul className='mt-12'>
      <SidebarRoute to='' title='Inicio' icon='fas fa-home' />
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER', 'ESTUDIANTE']}>
        <SidebarRoute to='/misdatos' title='Mis datos' icon='far fa-edit' />
      </PrivateComponent>
      <PrivateComponent roleList={['ADMINISTRADOR']}>
        <SidebarRoute to='/usuarios' title='Usuarios' icon='far fa-user' />
      </PrivateComponent>
      <SidebarRoute to='/proyectos' title='Proyectos' icon='fas fa-project-diagram' />
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
        <SidebarRoute to='/inscripciones' title='Gestionar inscripciones' icon='far fa-check-square' />
      </PrivateComponent>
      <PrivateComponent roleList={['LIDER']}>
        <SidebarRoute to='/estudiantes' title='Estudiantes' icon='fas fa-user-graduate' />
      </PrivateComponent>
     
      <Logout />
    </ul>
  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log('eliminar token');
    setToken(null);
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to='/auth/login' className='sidebar-route text-white'>
        <div className='flex items-center'>
          <i className='fas fa-sign-out-alt' />
          <span className='opcionesSidebar'>Cerrar sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      {/* <img src='.../media/proyectologo.png' alt='Logo' className='h-16' />  */}
      <span className='tituloSidebar'>GESTIÓN DE PROYECTOS</span>

    </div>

  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full '>
      {/* Sidebar starts */}

      <div className='sidebar bg-indigo-500 hidden md:flex'>
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <i className={`fas fa-${open ? 'times' : 'bars'}`} onClick={() => setOpen(!open)} />
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route text-white bg-green-400'
            : 'sidebar-route text-gray-900 hover:text-white hover:bg-green-500'
        }
      >
        <div className='divIconoOpcion'>
          <i className= {icon} />
          <span className='opcionesSidebar'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
