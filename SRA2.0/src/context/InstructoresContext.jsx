/* eslint-disable react/prop-types */
//este archivo sirve para que todo componente que este dentro de este pueda llamar propiedades de los componentes padres

import { createContext, useContext, useState } from "react";
import {
  ConsultarInstructoresRequest,
  ConsultarInstructorRequest,
  EliminarInstructorRequest,
  CrearInstructorRequest,
  EditarInstructorRequest,
} from "../api/instructores.api";

//hace posible la interaccion entre componentes
export const InstructoresContext = createContext();

//crear mi propio hook, se llama asi porque normalmente los hooks empiezan con la palabra use
export const UseInstructores = () => {
  const contexto = useContext(InstructoresContext);
  if (!contexto) {
    throw new Error(
      "UseInstructores debe estar dentro del proveedor InstructoresContext"
    );
  }
  return contexto;
};

//agrupa todos los componentes
export const InstructoresContextProvider = ({ children }) => {
  const [instructores, ponerInstructores] = useState([]);
  const [errors, setErrors] = useState({});

  async function traerInstructores() {
    const respuesta = await ConsultarInstructoresRequest();
    ponerInstructores(respuesta.data);
  }

  const traerInstructor = async (idInstructor) => {
    try {
      const respuesta = await ConsultarInstructorRequest(idInstructor);
      return respuesta.data;
    } catch (error) {
      console.log(error);
    }
  };

  const crearInstructor = async (instructor) => {
    try {
      const respuesta = await CrearInstructorRequest(instructor);
      console.log(respuesta.dataValues)
      
      if (respuesta.dataValues.status === "error") {
        setErrors({ documentoInstructor: respuesta.msj });
      } else {
        ponerInstructores([...instructores, respuesta.data]);
      }
    } catch (error) {
      error
    }
  };

  const editarInstructor = async (idInstructor, nuevosDatos) => {
    try {
      await EditarInstructorRequest(idInstructor, nuevosDatos);
    } catch (error) {
      error
    }
  };

  const borrarInstructor = async (idInstructor) => {
    try {
      await EliminarInstructorRequest(idInstructor);
      ponerInstructores(
        instructores.filter(
          (instructores) => instructores.dataValues.idInstructor !== idInstructor
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InstructoresContext.Provider
      value={{
        instructores,
        traerInstructores,
        traerInstructor,
        crearInstructor,
        editarInstructor,
        borrarInstructor,
        errors
      }}
    >
      {children}
    </InstructoresContext.Provider>
  );
};
