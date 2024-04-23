import { Form, Formik, ErrorMessage } from "formik";
import { UseInstructores } from "../context/InstructoresContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import * as Yup from 'yup';
import "../styles/instructoresForm.css";

const validationSchema = Yup.object().shape({
  documentoInstructor: Yup.string().required('Campo requerido').matches(/^[0-9]{7,10}$/, 'Documento inválido, mínimo 7 y máximo 10 dígitos numéricos.'),
  idTipoDocumento: Yup.string().required('Campo requerido'),
  nombreInstructor: Yup.string().required('Campo requerido').matches(/^[a-zA-Z ñÑáéíóúÁÉÍÓÚ,.]{1,30}$/, 'Nombre inválido'),
  apellidoInstructor: Yup.string().required('Campo requerido').matches(/^[a-zA-Z ñÑáéíóúÁÉÍÓÚ,.]{1,30}$/, 'Apellido inválido'),
  telefonoInstructor: Yup.string().required('Campo requerido').matches(/^[0-9]{10,15}$/, 'Teléfono inválido, mínimo 10 y máximo 15 dígitos numéricos.'),
  correoInstructor: Yup.string().required('Campo requerido').matches(/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Correo inválido'),
  idTipoInstructor: Yup.string().required('Campo requerido'),
});


function InstructoresForm() {
  const { crearInstructor, traerInstructor, editarInstructor } =
    UseInstructores();

  const [instructor, ponerInstructor] = useState({
    documentoInstructor: "",
    nombreInstructor: "",
    apellidoInstructor: "",
    telefonoInstructor: "",
    correoInstructor: "",
    idTipoDocumento: "",
    idTipoInstructor: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      if (params.id) {
        const respuesta = await traerInstructor(params.id);
        ponerInstructor({
          documentoInstructor: respuesta.dataValues.documentoInstructor || "",
          nombreInstructor: respuesta.dataValues.nombreInstructor || "",
          apellidoInstructor: respuesta.dataValues.apellidoInstructor || "",
          telefonoInstructor: respuesta.dataValues.telefonoInstructor || "",
          correoInstructor: respuesta.dataValues.correoInstructor || "",
          idTipoDocumento: respuesta.dataValues.idTipoDocumento || "",
          idTipoInstructor: respuesta.dataValues.idTipoInstructor || "",
        });
      }
    };
    cargarDatos();
  }, []);

  return (
    <div>
      <h1>{params.id ? "Editar Instructor" : "Crear Instructor"}</h1>
      <Formik
        initialValues={instructor}
        validationSchema={validationSchema}
        enableReinitialize={true}
        validateOnBlur={true}
        onSubmit={async (values, actions) => {
          if(params.id){
            await editarInstructor(params.id, values)
            navigate("/")
          } else {
            await crearInstructor(values);
            navigate("/")
          }
          actions.resetForm();
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="p-formgrid p-grid">
              <div className="campos p-field p-col-6">
                <label htmlFor="idTipoDocumento">Tipo de documento</label>
                <InputText
                  type="text"
                  name="idTipoDocumento"
                  onChange={handleChange}
                  value={values.idTipoDocumento}
                />
                <ErrorMessage name="idTipoDocumento" component="div" className="error" />
              </div>

              <div className="p-field p-col-6">
                <label htmlFor="documentoInstructor">Documento</label>
                <InputText
                  type="text"
                  name="documentoInstructor"
                  onChange={handleChange}
                  value={values.documentoInstructor}
                />
                <ErrorMessage name="documentoInstructor" component="div" className="error" />
              </div>

              <div className="p-field p-col-6">
                <label htmlFor="nombreInstructor">Nombre</label>
                <InputText
                  type="text"
                  name="nombreInstructor"
                  onChange={handleChange}
                  value={values.nombreInstructor}
                />
                <ErrorMessage name="nombreInstructor" component="div" className="error" />
              </div>

              <div className="p-field p-col-6">
                <label htmlFor="apellidoInstructor">Apellido</label>
                <InputText
                  type="text"
                  name="apellidoInstructor"
                  onChange={handleChange}
                  value={values.apellidoInstructor}
                />
                <ErrorMessage name="apellidoInstructor" component="div" className="error" />
              </div>

              <div className="p-field p-col-6">
                <label htmlFor="telefonoInstructor">Telefono</label>
                <InputText
                  type="text"
                  name="telefonoInstructor"
                  onChange={handleChange}
                  value={values.telefonoInstructor}
                />
                <ErrorMessage name="telefonoInstructor" component="div" className="error" />
              </div>

              <div className="p-field p-col-6">
                <label htmlFor="correoInstructor">Correo</label>
                <InputText
                  type="text"
                  name="correoInstructor"
                  onChange={handleChange}
                  value={values.correoInstructor}
                />
                <ErrorMessage name="correoInstructor" component="div" className="error" />
              </div>

              <div className="p-field p-col-6">
                <label htmlFor="idTipoInstructor">Tipo de instructor</label>
                <InputText
                  type="text"
                  name="idTipoInstructor"
                  onChange={handleChange}
                  value={values.idTipoInstructor}
                />
                <ErrorMessage name="idTipoInstructor" component="div" className="error" />
              </div>
            </div>

            <div className="p-field p-col-6 p-md-3">
              <div className="p-inputgroup">
                <Button
                  type="button"
                  label="Cancelar"
                  onClick={() => {
                    navigate("/");
                  }}
                  className="cancelar p-button-secondary p-button-sm"
                />
                <Button
                  type="submit"
                  label={isSubmitting ? "Guardando..." : "Guardar"}
                  className="p-button-primary p-button-sm"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default InstructoresForm;
