import React from "react";
import { useForm } from "react-hook-form";

const AddUserForm = (props) => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);
    props.addUser(data);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="nombreMascota">Nombre</label>
        <input
          className="form-control"
          id="nombreMascota"
          type="text"
          name="nombreMascota"
          ref={register({
            required: { value: true, message: "Valor requerido" },
          })}
        />
      </div>

      <div>{errors?.name?.message}</div>
      <div className="form-group">
        <label htmlFor="especie">Especie</label>
        <input
          className="form-control"
          id="especie"
          type="text"
          name="especie"
          ref={register({
            required: { value: true, message: "Valor requerido" },
          })}
        />
      </div>
      <div>{errors?.username?.message}</div>

      <div className="form-group">
        <label htmlFor="especie">Raza</label>
        <input
          className="form-control"
          id="raza"
          type="text"
          name="raza"
          ref={register({
            required: { value: true, message: "Valor requerido" },
          })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="especie">Nombre Dueño</label>
        <input
          className="form-control"
          id="raza"
          type="text"
          name="nombreDueño"
          ref={register({
            required: { value: true, message: "Valor requerido" },
          })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="especie">Telefono</label>
        <input
          className="form-control"
          id="raza"
          type="text"
          name="telfContacto"
          ref={register({
            required: { value: true, message: "Valor requerido" },
          })}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Agregar Mascota
      </button>
    </form>
  );
};

export default AddUserForm;
