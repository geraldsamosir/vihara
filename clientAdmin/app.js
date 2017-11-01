import  React ,{Component} from  "react"

import ReactDOM from 'react-dom'

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import "./style.css"
import App from  "./router"
ReactDOM.render(<App />, document.getElementById('app'))