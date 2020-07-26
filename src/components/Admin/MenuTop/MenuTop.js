import React from "react";
import { Button } from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined} from "@ant-design/icons";
import {logout} from "../../../api/auth";

import "./MenuTop.scss";

import logo from "../../../assets/img/png/LogoTroya_web.png";

const logoutUser = ()=>{
  logout();
  window.location.reload();  
}

export default function MenuTop({menuCollapsed, setCollapsed}) {
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img className="menu-top__left-logo" src={logo} alt="logo de rolando" />
           <Button type="link" onClick={()=> setCollapsed(!menuCollapsed)} > 
           {menuCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined  />}
           </Button> 
      </div>
      <div className="menu-top__rigth">
           <Button type="link" onClick={logoutUser} > 
           <PoweroffOutlined />
           </Button> 
      </div>
    </div>
  );
}