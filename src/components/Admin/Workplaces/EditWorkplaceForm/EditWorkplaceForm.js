import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { Avatar, Form, Input, Select, Button, Row, Col, notification, DatePicker} from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, LockOutlined, HomeOutlined,
  SolutionOutlined, ApartmentOutlined,EuroOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {updateUserApi, uploadAvatarApi, getAvatarApi} from "../../../../api/workplace";
import { getAccessTokenApi } from "../../../../api/auth";
import "./EditWorkplaceForm.scss";

export default function EditUserForm(props) {
  const { user, setIsVisibleModal, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData({
      name: user.name,
      ubicacion: user.ubicacion,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      movil: user.movil,
      dni: user.dni,
      sexo: user.sexo,
      fechanac: user.fechanac,
      direccion: user.direccion,
      codpostal: user.codpostal,
      poblacion: user.poblacion,
      provincia: user.provincia,
      inicioactividad: user.inicioactividad,
      finactividad: user.finactividad,
      numss: user.numss,
      tipocontrato: user.tipocontrato,
      categoria: user.categoria,
      salario: user.salario
    });
  }, [user]);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = e => {
    e.preventDefault();
    const token = getAccessTokenApi();
    let userUpdate = userData;


    if (
      !userData.name ||
      !userData.ubicacion ){
      notification["error"]({ message: "Campos Obligatorios: Nombre, Ubicación."});
      return;
    }

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then(response => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then(result => {
          notification["success"]({
            message: result.message
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
        });
      });
    } else {
      updateUserApi(token, userUpdate, user._id).then(result => {
        notification["success"]({
          message: result.message
        });
        setIsVisibleModal(false);
        setReloadUsers(true);
      });
    }
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit" onSubmitCapture={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
            title="Nombre"
              prefix={<UserOutlined />}
              placeholder="Nombre"
              value={userData.name}
              onChange={e => setUserData({ ...userData, name: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
            title="Apellidos"
              prefix={<UserOutlined />}
              placeholder="Ubicación"
              value={userData.ubicacion}
              onChange={e =>
                setUserData({ ...userData, ubicacion: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
            title="E-mail"
              prefix={<MailOutlined />}
              placeholder="E-mail"
              value={userData.email}
              onChange={e =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item>
            <Input
            title="DNI"
              prefix={<IdcardOutlined />}
              placeholder="DNI"
              value={userData.dni}
              onChange={e =>
                setUserData({ ...userData, dni: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
            title="Teléfono"
              prefix={<PhoneOutlined />}
              placeholder="Teléfono"
              value={userData.movil}
              onChange={e =>
                setUserData({ ...userData, movil: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item>
            <Select
              placeholder="Seleccióna una rol"
              onChange={e => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="erente">Gerente</Option>
              <Option value="tecnico">Técnico</Option>
              <Option value="encargado">Encargado</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              onChange={e =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Repetir contraseña"
              onChange={e =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
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
                    title="Dirección"                    
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
                    title="Cod. Postal"
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
                    title="Población"
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
                    title="Provincia"
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
                placeholder="Inicio Actividad"
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
                placeholder="Fin Actividad"
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
                    title="Seguridad social"
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
                    title="Tipo contrato"
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
                    title="Categoria"
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
                    title="Salario"
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
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}