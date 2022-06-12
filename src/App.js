import React, { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import AddUserForm from "./components/AddUserForm";
import EditYo from "./components/EditYo";
import { useForm } from "react-hook-form";
import axios from "axios";

function App() {
  // Agregar usuarios
  const usersData = [
    {
      id: "1",
      nombreMascota: "fifi",
      especie: "perro",
      raza: "chusco",
      fechaNac: "21/03/2020",
      peso: "21.3",
      talla: "22",
      nombreDueño: "Pepe",
      telfContacto: "999888222",
    },
    {
      id: "2",
      nombreMascota: "fifi2",
      especie: "perro",
      raza: "chusco",
      fechaNac: "21/03/2020",
      peso: "21.3",
      talla: "22",
      nombreDueño: "Pepe",
      telfContacto: "111222444",
    },
    {
      id: "3",
      nombreMascota: "fifi3",
      especie: "perro",
      raza: "chusco",
      fechaNac: "21/03/2020",
      peso: "21.3",
      talla: "22",
      nombreDueño: "Pepe",
      telfContacto: "111222333",
    },
  ];

  const [users, setUsers] = useState([]);
  const cargarMascotas = () => {
    axios.get(`http://veterinaria.test:90/api/mascotas`).then((res) => {
      console.log(res.data.data);
      setUsers(res.data.data);
    });
  };
  useEffect(() => {
    cargarMascotas();
  }, []);

  const addUser = (user) => {
    // user.id = uuidv4();
    // console.log(user);
    // setUsers([...users, user]);

    axios({
      method: "post",
      data: user,
      url: "http://veterinaria.test:90/api/mascota",
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        cargarMascotas();
      })
      .catch((error) => console.log(error));
  };

  // Eliminar usuario
  const deleteUser = (id) => {
    //Api Delete
    // setUsers(users.filter((user) => user.id !== id));
    axios
      .delete(`http://veterinaria.test:90/api/mascota/${id}`)
      .then((res) => {
        console.log(res);
        cargarMascotas();
      })
      .catch((error) => error);
  };

  // Editar usuario
  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: null,
    nombreMascota: "",
    especie: "",
    raza: "",
    nombreDueño: "",
    telfContacto: "",
  };
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({
      id: user.id,
      nombreMascota: user.nombreMascota,
      especie: user.especie,
      raza: user.raza,
      nombreDueño: user.nombreDueño,
      telfContacto: user.telfContacto,
    });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    // setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    axios
      .put(`http://veterinaria.test:90/api/mascota/${id}`, updatedUser)
      .then((res) => {
        console.log(res);
        cargarMascotas();
      })
      .catch((err) => console.log(err));
  };
  // Filtrar usuario
  const { register, errors, handleSubmit, setValue } = useForm();
  const onFilter = (data, e) => {
    filtrarUsuario(data.idMascotaFiltrar);
    e.target.reset();
  };
  const filtrarUsuario = (id) => {
    if (id === "") {
      axios.get(`http://veterinaria.test:90/api/mascotas`).then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
      });
    } else {
      axios
        .get(`http://veterinaria.test:90/api/mascota/${id}`)
        .then((res) => {
          console.log(res.data.data);
          setUsers([res.data.data]);
        })
        .catch((error) => {
          setUsers([]);
          console.log(error);
        });
    }
    console.log("filtrar");
  };

  return (
    <div className="container">
      <h1>Veterinaria GUAU GUAU</h1>
      <div className="row">
        <div className="col-sm-4">
          {editing ? (
            <div>
              <h2>Editar Registro</h2>
              <EditYo
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Añadir nuevo registro</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="col-sm-8">
          <h2>Ver registros</h2>
          <div>
            <form onSubmit={handleSubmit(onFilter)}>
              <div className="form-group">
                <label>Buscar</label>
                <div className="d-flex">
                  <input
                    className="form-control"
                    placeholder="Codigo..."
                    name="idMascotaFiltrar"
                    ref={register({
                      required: { value: false, message: "Valor requerido" },
                    })}
                  />
                  <button className="btn btn-primary">Buscar</button>
                </div>
              </div>
            </form>
          </div>

          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
}

export default App;
