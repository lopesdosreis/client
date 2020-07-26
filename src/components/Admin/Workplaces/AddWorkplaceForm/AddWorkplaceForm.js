import React, { useState} from "react";
import moment from "moment";
import { Form, Input, Select, Button, Row, Col, notification, DatePicker} from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, LockOutlined, HomeOutlined,
    SolutionOutlined, ApartmentOutlined,EuroOutlined } from "@ant-design/icons";
import {signUpAdminApi} from "../../../../api/workplace";
import { getAccessTokenApi } from "../../../../api/auth";
import "./AddWorkplaceForm.scss";

//Aquí es donde se comunica con la API para añadir el usuario. (recebemos los datos pasados por props de ListUsers.js)
export default function EditUserForm(props){
    const {setIsVisibleModal, setReloadUsers} = props;
    
    //aqui guardamos los datos del formulario para añadir el usuario.
    const [userData, setUserData] = useState({});
    const addUser = event =>{
        event.preventDefault();
        
        if(
            !userData.name ||
            !userData.lastname ||
            !userData.email ||
            !userData.dni ||
            !userData.role ||
            !userData.password ||
            !userData.repeatPassword){
            notification["error"]({ message: "Campos Obligatorios: Nombre, Apellidos, Email, DNI, Perfil y Contraseña."});
        }else if(userData.password !== userData.repeatPassword){
            notification["error"]({ message: "Las contrseñas deben ser iguales."});
        }else{
            const accesToken = getAccessTokenApi();

            signUpAdminApi(accesToken, userData)
                .then(response =>{                    
                    notification["success"]({
                        
                        message: response
                    });
                    setIsVisibleModal(false);
                    setReloadUsers(true);
                    setUserData({});
                }).catch(err =>{
                    notification["error"]({
                        message: err
                    });
                });
        }        
    };

    return (
        <div className="add-user-form">
         <AddForm 
         userData={userData}
         setUserData={setUserData}
         addUser={addUser} 
         /> 
        </div>
    );
}

//hacemos una funcion aparte para añadir al return de la funcion por defecto *Se podria crear esto directamente en el return.
function AddForm(props){
    const {userData, setUserData, addUser} = props;
    const {Option} = Select;

    return (
        <Form className="form-add" onSubmitCapture={addUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                        prefix={<UserOutlined />}
                        placeholder="Nombre"
                        value={userData.name}
                        onChange={e => setUserData({...userData, name: e.target.value})}
                        />                        
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                        prefix={<UserOutlined />}
                        placeholder="Apellidos"
                        value={userData.lastname}
                        onChange={e => setUserData({...userData, lastname: e.target.value})}
                        />                        
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                        prefix={<MailOutlined />}
                        placeholder="Correo electronico"
                        value={userData.email}
                        onChange={e => setUserData({...userData, email: e.target.value})}
                        />                        
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                        prefix={<IdcardOutlined />}
                        placeholder="DNI"
                        value={userData.dni}
                        onChange={e => setUserData({...userData, dni: e.target.value})}
                        />                        
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                        prefix={<PhoneOutlined />}
                        placeholder="Téfono Móvil"
                        value={userData.movil}
                        onChange={e => setUserData({...userData, movil: e.target.value})}
                        />                        
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                        placeholder="Seleccione Perfil"
                        onChange={e => setUserData({ ...userData, role: e })}
                        value={userData.role}
                        >
                            <Option value="gerente">Gerente</Option>
                            <Option value="tecnico">Técnico</Option>
                            <Option value="encargado">Encargado</Option>
                        </Select>                              
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                    <Input.Password
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Contraseña"
                    value={userData.password}
                    onChange={e =>
                    setUserData({ ...userData, password: e.target.value })}
                    />
                </Form.Item>
            </Col>
                <Col span={12}>
                <Form.Item>
                    <Input.Password
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Repetir contraseña"
                    value={userData.repeatPassword}
                    onChange={e =>
                    setUserData({ ...userData, repeatPassword: e.target.value })}
                    />
                </Form.Item>
                </Col>
            </Row>
            {/* INICIO Codigo de Prueba */ }
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                <Select
                        placeholder="Seleccione Sexo"
                        onChange={e => setUserData({ ...userData, sexo: e })}
                        value={userData.sexo}
                        >
                            <Option value="Hombre">Hombre</Option>
                            <Option value="Mujer">Mujer</Option>                            
                        </Select>  
                </Form.Item>
            </Col>
                <Col span={12}>
                <Form.Item>
                <DatePicker 
                style={{width: "100%"}}
                format="DD-MM-YYYY"
                placeholder="Fecha Nac."
                value={userData.fechanac && moment(userData.fechanac)}
                onChange={(e, value) =>
                    setUserData({ 
                        ...userData, 
                        fechanac: moment(value, "DD-MM-YYYY").toISOString() 
                    })}
                />
                </Form.Item>
                </Col>
            </Row>            
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                    <Input
                    prefix={<HomeOutlined />}                   
                    placeholder="Dirección"
                    value={userData.direccion}
                    onChange={e =>
                    setUserData({ ...userData, direccion: e.target.value })}
                    />
                </Form.Item>
            </Col>
                <Col span={12}>
                <Form.Item>
                    <Input
                    prefix={<HomeOutlined />}                    
                    placeholder="Cod.Postal"
                    value={userData.codpostal}
                    onChange={e =>
                    setUserData({ ...userData, codpostal: e.target.value })}
                    />
                </Form.Item>
                </Col>
            </Row>            
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                    <Input
                    prefix={<HomeOutlined />}                    
                    placeholder="Población"
                    value={userData.poblacion}
                    onChange={e =>
                    setUserData({ ...userData, poblacion: e.target.value })}
                    />
                </Form.Item>
            </Col>
                <Col span={12}>
                <Form.Item>
                    <Input
                    prefix={<HomeOutlined />}                    
                    placeholder="Provincia"
                    value={userData.provincia}
                    onChange={e =>
                    setUserData({ ...userData, provincia: e.target.value })}
                    />
                </Form.Item>
                </Col>
            </Row>            
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                <DatePicker 
                style={{width: "100%"}}
                format="DD-MM-YYYY"
                placeholder="Inicio actividad."
                value={userData.inicioactividad && moment(userData.inicioactividad)}
                onChange={(e, value) =>
                    setUserData({ 
                        ...userData, 
                        inicioactividad: moment(value, "DD-MM-YYYY").toISOString() 
                    })}
                />
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                <DatePicker 
                style={{width: "100%"}}
                format="DD-MM-YYYY"
                placeholder="Fin actividad."
                value={userData.finactividad && moment(userData.finactividad)}
                onChange={(e, value) =>
                    setUserData({ 
                        ...userData, 
                        finactividad: moment(value, "DD-MM-YYYY").toISOString() 
                    })}
                />
                </Form.Item>
                </Col>
            </Row>            
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                    <Input
                    prefix={<IdcardOutlined />}                    
                    placeholder="Nº Seguridad Social"
                    value={userData.numss}
                    onChange={e =>
                    setUserData({ ...userData, numss: e.target.value })}
                    />
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                    <Input
                    prefix={<SolutionOutlined />}                    
                    placeholder="Tipo Contrato"
                    value={userData.tipocontrato}
                    onChange={e =>
                    setUserData({ ...userData, tipocontrato: e.target.value })}
                    />
                </Form.Item>
                </Col>
            </Row>            
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                    <Input
                    prefix={<ApartmentOutlined />}                    
                    placeholder="Categoria"
                    value={userData.categoria}
                    onChange={e =>
                    setUserData({ ...userData, categoria: e.target.value })}
                    />
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                    <Input
                    prefix={<EuroOutlined />}                    
                    placeholder="Salario"
                    value={userData.salario}
                    onChange={e =>
                    setUserData({ ...userData, salario: e.target.value })}
                    />
                </Form.Item>
                </Col>
            </Row>
            {/* FIM Codigo de Prueba */ }

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Crear Usuario
                </Button>
            </Form.Item>
        </Form>
    )
}