import React from "react";

const UserTable = (props) => (
  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th scope="col">Código</th>
        <th scope="col">Nombre</th>
        <th scope="col">Especie</th>
        <th scope="col">Raza</th>
        <th scope="col">Nombre Dueño</th>
        <th scope="col">Telefono</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.nombreMascota}</td>
            <td>{user.especie}</td>
            <td>{user.raza}</td>
            <td>{user.nombreDueño}</td>
            <td>{user.telfContacto}</td>
            <td>
              <div className="btn-group">
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    props.editRow(user);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => props.deleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No encontrado</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default UserTable;
