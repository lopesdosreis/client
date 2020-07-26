import React, { useState, useEffect } from "react";
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import {
  Switch,
  List,
  Modal as ModalAntd,
  Avatar,
  Button, notification
} from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";
import EditUserForm from "../EditWorkplaceForm";
import AddUserForm from "../AddWorkplaceForm";
import {getAvatarApi, activateUserApi, deleteUserApi} from "../../../../api/workplace";
import {getAccessTokenApi} from  "../../../../api/auth";
import "./ListWorkPlaces.scss";

const {confirm} = ModalAntd;

export default function ListUsers(props){
    const { usersActive, usersInactive, setReloadUsers} = props;    
    const [viewUsersActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const addUserModal = () =>{
        //el modal ya existe simplesmente lo doy a la propriedad true para mostrar.(anteriormente hemos creado la constant con useState)
        setIsVisibleModal(true);
        //especifico el titulo del modal
        setModalTitle("Creando Usuario")
        setModalContent(
            //Aqui pasamos el componente que hemos creado en la carpeta AddUserForm/AddUserForm.js
            <AddUserForm
            //Pasamos que el modal es visible
            setIsVisibleModal={setIsVisibleModal}
            //aqui pasamos la constante para actualizar la lista de usuarios.
            setReloadUsers={setReloadUsers}
            />
            );
    };


    return(
        <div className="list-users">
            <div className="list-users__header">
               
                <div className="list-users__header-switch">
                   <Switch
                   defaultChecked
                   onChange={() => setViewUsersActives(!viewUsersActives)}
                   />
                   <span>
                    {viewUsersActives ? "Centros de Trabajo Activos" : "Centros de Trabajo Inactivos"}
                   </span>
                </div>
                <Button type="primary" onClick={addUserModal}>
                    Añadir Centro de Trabajo
                </Button>
            </div>

            {viewUsersActives ? 
            ( <UsersActive 
                usersActive={usersActive} 
                setIsVisibleModal={setIsVisibleModal}
                setModalTitle={setModalTitle}
                setModalContent={setModalContent}
                setReloadUsers={setReloadUsers}
                /> ) :
            ( <UsersInactive usersInactive={usersInactive} setReloadUsers={setReloadUsers} />)
            }
            <Modal
            title={modalTitle}
            isVisible={isVisibleModal}
            setIsVisible={setIsVisibleModal}            
            >
                {modalContent}
            </Modal>
        </div>
    )
}

function UsersActive(props){
    const {usersActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers} = props;
    
    const editUser = user =>{
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.ubicacion ? user.ubicacion : "..."}`);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}/>);    
    }

    return (
        <List 
        className="users-active"
        itemLayout="horizontal"
        dataSource={usersActive}
        renderItem={user=> <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers}/>}
        />
    );
}

function UserActive(props){
    const {user, editUser, setReloadUsers} = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() =>{
        if(user.avatar){
            getAvatarApi(user.avatar).then(response =>{
                setAvatar(response);
            })
        }else{
            setAvatar(null);
        }
    }, [user]);



    const desactivateUser = () =>{
        const accesToken = getAccessTokenApi();

        activateUserApi(accesToken, user._id, false)
            .then(response =>{
              notification["success"]({message: response});
              setReloadUsers(true);  
            }).catch(err =>{
                notification["error"]({message: err});
            })
    };

    const showDeletedConfirm = () =>{
        const accesToken = getAccessTokenApi();
        confirm({
            title: "Eliminando Usuario",
            content: `¿Estas seguro que desea eliminar a ${user.email}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk(){
                deleteUserApi(accesToken, user._id)
                    .then(response =>{
                        notification["success"]({message: response});
                        setReloadUsers(true);
                    })
                    .catch(err =>{
                        notification["error"]({message: err});
                    });
            }
        });
    };


    return(
        <List.Item
            actions={[
                <Button type="primary" onClick={()=> editUser(user)}>
                    <EditOutlined />
                </Button>,
                <Button type="danger" onClick={desactivateUser}>
                    <StopOutlined />
                </Button>,
                <Button type="danger" onClick={showDeletedConfirm}>
                    <DeleteOutlined />
                </Button>
            ]}
            >
                <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : NoAvatar}/>}
                title={`
                    ${user.name ? user.name : '...'}
                    ${user.ubicacion ? user.ubicacion : '...'}  
                `}
                description={user.ubicacion}
                />
            </List.Item>
    )
}

function UsersInactive(props){
    const {usersInactive, setReloadUsers}= props;
    return (
        <List 
        className="users-active"
        itemLayout="horizontal"
        dataSource={usersInactive}
        renderItem={user=> <UserInactive user={user} setReloadUsers={setReloadUsers}/>}
        />
    )
}

function UserInactive(props){
    const {user, setReloadUsers} = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() =>{
        if(user.avatar){
            getAvatarApi(user.avatar).then(response =>{
                setAvatar(response);
            })
        }else{
            setAvatar(null);
        }
    }, [user]);

    const activateUser = () =>{
        const accesToken = getAccessTokenApi();

        activateUserApi(accesToken, user._id, true)
            .then(response =>{
              notification["success"]({message: response});
              setReloadUsers(true);  
            }).catch(err =>{
                notification["error"]({message: err});
            })
    }

    return(
        <List.Item
            actions={[
                <Button type="primary" onClick={activateUser}>
                    <CheckOutlined />
                </Button>,
                <Button type="danger" onClick={()=> console.log("ELIMINAR")}>
                    <DeleteOutlined />
                </Button>
            ]}
            >
                <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : NoAvatar}/>}
                title={`
                    ${user.name ? user.name : '...'}
                    ${user.ubicacion ? user.ubicacion : '...'}  
                `}
                description={user.email}
                />
            </List.Item>
    )
}