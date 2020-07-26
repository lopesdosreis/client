import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu} from "antd";
import { HomeOutlined, UserOutlined, QrcodeOutlined,  
  LogoutOutlined, ReconciliationOutlined, NotificationOutlined, BarChartOutlined } from "@ant-design/icons";

import "./MenuSider.scss";

function MenuSider(props) {
const {menuCollapsed, location} = props;
const { Sider } = Layout;
const { SubMenu } = Menu;

console.log(location.pathname);


  return (
    <Sider className="admin-sider" collapsed={menuCollapsed} >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
        <Menu.Item key="/admin">
          <Link to="/admin"> 
          <HomeOutlined/>
          <span className="nav-text">Dashboard</span>
          </Link>
        </Menu.Item>
        
        <Menu.Item key="/admin/users">
          <Link to="/admin/users"> 
          <UserOutlined />
          <span className="nav-text">Usuarios</span>
          </Link>
        </Menu.Item>

       {/* <Menu.Item key="/admin/workplaces">
          <Link to="/admin/workplaces"> 
          <ReconciliationOutlined />
          <span className="nav-text">Centros de Trabajo</span>
          </Link>
  </Menu.Item>*/}

        <SubMenu key="sub1" icon={<ReconciliationOutlined />} title="Obras">
            <Menu.Item key="/admin/workplaces">
            <Link to="/admin/workplaces"> Centros de Trabajo </Link>
            </Menu.Item>
            <Menu.Item key="6">Clientes
            </Menu.Item>
            <Menu.Item key="7">Centros de Coste            
            </Menu.Item>            
          </SubMenu>
        
        <Menu.Item key="/admin/informes">
          <Link to="/admin/menu-web"> 
          <BarChartOutlined />
          <span className="nav-text">Informes</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/control-herramientas">
          <Link to="/admin/menu-web"> 
          <QrcodeOutlined />
          <span className="nav-text">Control Herramientas</span>
          </Link>
        </Menu.Item>       

        <Menu.Item key="/admin/notificaciones">
          <Link to="/admin/menu-web"> 
          <NotificationOutlined />
          <span className="nav-text">Notificaciones</span>
          </Link>
        </Menu.Item>  

        <Menu.Item key="/admin/salir">
          <Link to="/admin/menu-web"> 
          <LogoutOutlined />
          <span className="nav-text">Salir</span>
          </Link>
        </Menu.Item>

      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);