/* eslint-disable no-useless-catch */
import axios from 'axios';

export const ConsultarInstructoresRequest = async () => {
    return await axios.get('http://localhost:3030/instructor');
};

export const ConsultarInstructorRequest = async (idInstructor) => {
    return await axios.get('http://localhost:3030/instructor/' +idInstructor)
};

export const CrearInstructorRequest = async (instructor) => {
    try {
        const respuesta = await axios.post('http://localhost:3030/instructor', instructor);
        //console.log(respuesta)
        return respuesta.data.dataValues && respuesta.data.nombreCompleto;
    } catch (error) {
        throw error;
    }
};

export const EditarInstructorRequest = async (idInstructor, nuevosDatos) => {
    try {
        const respuesta = await axios.put(`http://localhost:3030/instructor/${idInstructor}`, nuevosDatos);
        return respuesta.data.dataValues; // Devuelve los datos de la respuesta
    } catch (error) {
        throw error; // Maneja cualquier error que ocurra durante la solicitud
    }
}

export const EliminarInstructorRequest = async (idInstructor) => {
    return await axios.delete('http://localhost:3030/instructor/' +idInstructor) 
}
