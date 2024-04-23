import { useEffect } from "react";
import { UseInstructores } from '../context/InstructoresContext';
import { useNavigate } from 'react-router-dom';
import { DataTable } from "primereact/datatable";  //datatable crea una fila el solo por cada registro que se le pase, ya no se tiene que hacer el mapeo
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import 'primeicons/primeicons.css';
import '../styles/tablaInstructores.css'
        

function Instructores() {

  const { instructores, traerInstructores, borrarInstructor } = UseInstructores();
  const navigate = useNavigate();

  useEffect(() => {
    traerInstructores();
  }, []);

  const editarInstructor = (idInstructor) => {
    navigate(`/editar/${idInstructor}`);
  };

  const eliminarInstructor = (idInstructor) => {
    borrarInstructor(idInstructor);
  };



  return (
    <div>
      <DataTable value={instructores} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} a {last} de {totalRecords}">
        <Column field="dataValues.documentoInstructor" header="Documento del instructor" />
        <Column field="nombreCompleto" header="Nombre del instructor" />
        <Column field="dataValues.telefonoInstructor" header="Teléfono del instructor" />
        <Column field="dataValues.correoInstructor" header="Correo del instructor" />
        <Column
          body={(rowData) => (
            <div>
              <Button icon="pi pi-pencil" className="edita p-button-rounded p-button-warning" onClick={() => editarInstructor(rowData.dataValues.idInstructor)} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => eliminarInstructor(rowData.dataValues.idInstructor)} />
            </div>
          )}
        />
      </DataTable>
    </div>
  );
}

export default Instructores;
