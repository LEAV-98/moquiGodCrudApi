import React from "react";
import { useForm } from "react-hook-form";

const EditYo = (props) => {
  const { register, errors, handleSubmit, setValue } = useForm({
    defaultValues: props.currentUser,
  });

  setValue("nombreMascota", props.currentUser.nombreMascota);
  setValue("especie", props.currentUser.especie);
  setValue("raza", props.currentUser.raza);
  setValue("nombreDueño", props.currentUser.nombreDueño);
  setValue("telfContacto", props.currentUser.telfContacto);

  const onSubmit = (data, e) => {
    data.id = props.currentUser.id;
    console.log(data);
    props.updateUser(props.currentUser.id, data);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Nombre</label>
        <input
          className="form-control"
          type="text"
          name="nombreMascota"
          ref={register({
            required: { value: true, message: "Valor requerido" },
          })}
        />
      </div>
      <div>{errors?.nombreMascota?.message}</div>

      <div className="form-group">
        <label>Especie</label>
        <input
          className="form-control"
          type="text"
          name="especie"
          ref={register({
            required: { value: true, message: "Valor requerido" },
          })}
        />
      </div>
      <div>{errors?.especie?.message}</div>

      <div className="form-group">
        <label>Raza</label>
        <input
          className="form-control"
          type="text"
          name="raza"
          ref={register({
            required: { value: true, message: "Valor requerido" },
          })}
        />
      </div>
      <div>{errors?.raza?.message}</div>

      <div className="form-group">
        <label>Nombre Dueño</label>
        <input
          className="form-control"
          type="text"
          name="nombreDueño"
          ref={register({
            required: { value: true, message: "Valor requerido" },
          })}
        />
      </div>
      <div>{errors?.nombreDueño?.message}</div>

      <div className="form-group">
        <label>Telefono</label>
        <input
          className="form-control"
          type="text"
          name="telfContacto"
          ref={register({
            required: { value: true, message: "Valor requerido" },
          })}
        />
      </div>
      <div>{errors?.telfContacto?.message}</div>

      <div className="btn-group">
        <button type="submit" className="btn btn-warning">
          Editar
        </button>
        <button
          onClick={() => props.setEditing(false)}
          className="btn btn-danger"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditYo;
