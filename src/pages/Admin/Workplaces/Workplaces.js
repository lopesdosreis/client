import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersActiveApi } from "../../../api/workplace";
import ListUsers from "../../../components/Admin/Workplaces/ListWorkPlaces/ListWorkPlaces";
//import "./Users.scss";

export default function Users() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const token = getAccessTokenApi();

  useEffect(() => {
    //enviamos la solicitud a la api para recibir los datos.
    getUsersActiveApi(token, true).then(response => {

      //aqui va el nombre de la base de datos donde cogemos response.workplaces
      setUsersActive(response.workplaces);
    });
    getUsersActiveApi(token, false).then(response => {
      setUsersInactive(response.workplaces);
    });
    setReloadUsers(false);
  }, [token, reloadUsers]);

  return (
    <div className="users">
     <ListUsers usersActive={usersActive} usersInactive={usersInactive} setReloadUsers={setReloadUsers}/>
    </div>
  );
}
