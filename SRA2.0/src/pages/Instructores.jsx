import { useEffect } from "react";
import TablaInstructores from '../components/TablaInstructores'
import { UseInstructores } from "../context/InstructoresContext";
import '../styles/instructores.css';


function Instructores() {

    const {instructores, traerInstructores} = UseInstructores();

    useEffect(() => {
        traerInstructores();
    }, []);


    return (
        <div>
            <h1>Instructores</h1>

            {instructores.length === 0 ? (
                <h1>No hay instructores registrados</h1>
            ) : (
                <div>
                    <TablaInstructores instructores={instructores} />
                </div>
            )}
        </div>
    );
}

export default Instructores;