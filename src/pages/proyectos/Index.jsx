import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { PROYECTOS } from "graphql/proyectos/queries";
import DropDown from "components/Dropdown";
import { Dialog } from "@mui/material";
import { Enum_EstadoProyecto, Enum_FaseProyecto } from "utils/enums";
import ButtonLoading from "components/ButtonLoading";
import { EDITAR_PROYECTO } from "graphql/proyectos/mutations";
import useFormData from "hooks/useFormData";
import PrivateComponent from "components/PrivateComponent";
import { Link, useParams } from "react-router-dom";
import { CREAR_INSCRIPCION } from "graphql/inscripciones/mutaciones";
import { CREAR_AVANCE } from "graphql/avances/mutaciones";
import Input from "components/Input";

import { useUser } from "context/userContext";
import { toast } from "react-toastify";
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from "components/Accordion";


const IndexProyectos = () => {
  const { data: queryData, loading, error } = useQuery(PROYECTOS);

  useEffect(() => {
    console.log("datos proyecto", queryData);
  }, [queryData]);

  if (loading) return <div>Cargando...</div>;

  if (queryData.Proyectos) {
    return (
      <div className='p-10 flex flex-col'>
        <div className='flex w-full items-center justify-center'>
          <h2 className='titulosModulos'>
            LISTA DE PROYECTOS
          </h2>
        </div>
        <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
          <div className='my-2 self-end'>
            <button className='bg-yellow-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-yellow-400'>
              <Link to='/proyectos/nuevo'>Crear nuevo proyecto</Link>
            </button>
          </div>
        </PrivateComponent>

        {queryData.Proyectos.map((proyecto) => {
          return <AccordionProyecto proyecto={proyecto} />;
        })}
      </div>
    );
  }

  return <></>;
};

const AccordionProyecto = ({ proyecto }) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <AccordionStyled>
        <AccordionSummaryStyled
          expandIcon={<i className='fas fa-chevron-down' />}
        >
          <div className='flex w-full justify-between'>
            <div className='uppercase font-bold text-white letra '>
              {proyecto.nombre} - {proyecto.estado} - {proyecto.fase}
            </div>
          </div>
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <PrivateComponent roleList={["ADMINISTRADOR"]}>
            <i
              className='mx-4 fas fa-pen text-yellow-600 hover:text-yellow-400'
              onClick={() => {
                setShowDialog(true);
              }}
            />
          </PrivateComponent>
          <PrivateComponent roleList={["ESTUDIANTE"]}>
            <InscripcionProyecto
              idProyecto={proyecto._id}
              estado={proyecto.estado}
              inscripciones={proyecto.inscripciones}
            />
          </PrivateComponent>
          <div>Liderado Por: {proyecto.lider.correo}</div>
          <div className='flex'>
            {proyecto.objetivos.map((objetivo) => {
              return (
                <Objetivo
                  tipo={objetivo.tipo}
                  descripcion={objetivo.descripcion}
                />
              );
            })}
          </div>
        </AccordionDetailsStyled>
      </AccordionStyled>
      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <FormEditProyecto _id={proyecto._id} />
      </Dialog>
    </>
  );
};

const FormEditProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: {
        _id,
        campos: formData,
      },
    });
  };

  useEffect(() => {
    console.log("data mutation", dataMutation);
  }, [dataMutation]);

  return (
    <div className='p-4'>
      <h1 className='font-bold'>Editar fase o estado del Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'
      >
        <DropDown
          label='Fase del Proyecto'
          name='fase'
          options={Enum_FaseProyecto}
        />
        <DropDown
          label='Estado del Proyecto'
          name='estado'
          options={Enum_EstadoProyecto}
        />
        <ButtonLoading disabled={false} loading={loading} text='Confirmar' />
      </form>
    </div>
  );
};

const Objetivo = ({ tipo, descripcion }) => {
  return (
    <div className='mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
      <div className='text-lg font-bold'>{tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={["ADMINISTRADOR"]}>
        <div>Editar</div>
      </PrivateComponent>
    </div>
  );
};

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
  const [estadoInscripcion, setEstadoInscripcion] = useState("");
  const [crearInscripcion, { data, loading, error }] =
    useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter(
        (el) => el.estudiante._id === userData._id
      );
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  useEffect(() => {
    if (data) {
      console.log(data);
      toast.success("inscripcion creada con exito");
    }
  }, [data]);

  const confirmarInscripcion = () => {
    crearInscripcion({
      variables: { proyecto: idProyecto, estudiante: userData._id },
    });
  };

  const [dialogAvance, setSDialogAvance] = useState(false);
  return (
    <>
      {estadoInscripcion !== "" ? (
        <div>
          <span>
            Ya estás inscrito en este proyecto y el estado es{" "}
            {estadoInscripcion}
          </span>
          <br />
          <div>
            Agregar avance
            <i
              className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
              onClick={() => {
                setSDialogAvance(true);
              }}
            />
            <Dialog
              open={dialogAvance}
              onClose={() => {
                setSDialogAvance(false);
              }}
            >
              <CrearAvance proyecto={idProyecto} creadoPor={userData._id} />
            </Dialog>
          </div>
          <div>
              Ver avances del proyecto
              <Link to= '/avances'>
              <i
              className='far fa-eye rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
            />
              </Link>
          </div>

        </div>
      ) : (
        <ButtonLoading
          onClick={() => confirmarInscripcion()}
          disabled={estado === "INACTIVO"}
          loading={loading}
          text='Inscribirme en este proyecto'
        />
      )}
    </>
  );
};

const CrearAvance = ({ proyecto, creadoPor }) => {
  const { form, formData, updateFormData } = useFormData();
  const [crearAvance, { data: dataMutation, loading, error }] =
    useMutation(CREAR_AVANCE);
  const { _id } = useParams();

  const submitForm = (e) => {
    e.preventDefault();
    crearAvance({
      variables: {
        proyecto,
        creadoPor,
        ...formData,
      },
    });
  };

  useEffect(() => {
    console.log("data mutation", dataMutation);
  }, [dataMutation]);

  useEffect(() => {
    if (dataMutation) {
      console.log(dataMutation);
      toast.success("Avance creado con exito");
    }
  }, [dataMutation]);

  return (
    <div className='p-4'>
      <h1 className='font-bold'>Registrar avance</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'
      >
        <Input
          name='fecha'
          label='Fecha en la que registra el avance'
          required={true}
          type='date'
        />
        <Input
          name='descripcion'
          label='Descripción del avance'
          required={true}
          type='text'
        />
        <ButtonLoading text='Crear avance' loading={false} disabled={false} />
      </form>
    </div>
  );
};

export default IndexProyectos;
