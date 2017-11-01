import  React ,{Component} from  "react"

import { Layout, Menu, Breadcrumb, Icon ,Avatar ,LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

const { Header, Content, Footer, Sider } = Layout;

import {
  HashRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'



const SubMenu = Menu.SubMenu;

import "./style.css"


//screen
import Home from  "./screen/home"
import Artikel from "./screen/artikel"
import Jadwal from "./screen/jadwal"
import Login from "./screen/login"
import Profil from "./screen/profil"
import Sumbangan from "./screen/sumbangan"

//subscreen 
import Artikeldetail from  "./screen/subscreen/artikel"
import Profildettail  from  "./screen/subscreen/profil"

export default class App extends Component{
    constructor(props){
        super(props)
        this.state = {
              collapsed: false,
        }
    }

    componentDidMount() {
      if(localStorage.email == undefined || localStorage.token == undefined){
          let menu  =  document.getElementById("menu")
           menu.style.display = 'none'; 
           if(window.location.href !="/auth/#/login"){
             window.location.href = "/auth/#/login"
           }
      }
      else{
          let menu  =  document.getElementById("menu")
           menu.style.display = ''; 
      }
       
    }
    
     onCollapse(collapsed)  {
      this.setState({ collapsed });
    }
     linkTo(item) {
       if(item.key =="logout"){
         localStorage.removeItem("token")
         localStorage.removeItem("email")
         window.location.href = "/auth/#/login"
         window.location.reload()
       }
    }
    render(){
        return(
           <LocaleProvider locale={enUS}> 
            <div>
              <Router>
                <Layout style={{ minHeight: '100vh' }}>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse.bind(this)}
            >
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['home']} mode="inline" onClick={this.linkTo.bind(this)} id="menu">
                <Menu.Item key="home">
                     <Link to={"/"}>
                      <center>
                        <Avatar src="http://www.dhammacakka.org/themes/vjdj/images/icon.png" />
                      </center>
                     </Link>

                </Menu.Item >
                <Menu.Item key="jadwal">
                  <Link to={"/Jadwal"}>
                    <Icon type="bars" />
                    <span>Jadwal Ibadah</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="sumbangan">
                  <Link to={"/sumbangan"}>
                    <Icon type="bars" />
                    <span>Sumbangan</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="artikel">
                   <Link to={"/artikel"}>
                    <Icon type="file" />
                    <span>Artikel</span>
                   </Link>
                </Menu.Item>
                <Menu.Item key="profil">
                <Link to={"/profil"}>
                  <Icon type="user" />
                    <span>Profil Sangha</span>
                </Link>
                </Menu.Item>
                  <Menu.Item key="logout">
                    <Link to={"/login"} >
                      <Icon type="logout" />
                        <span>Logout</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    
                        <Switch>
                            <Route  exact path="/"  component={Home} />
                            <Route  exact path="/artikel"  component={Artikel} />
                            <Route  exact path="/artikel/:id"  component={Artikeldetail} />
                            <Route  exact path="/jadwal"  component={Jadwal} />
                            <Route  exact path="/login"  component={Login} />
                            <Route  exact path="/profil"  component={Profil} />
                             <Route  exact path="/profil/:id"  component={Profildettail} />
                            <Route  exact path="/sumbangan"  component={Sumbangan} />
                        </Switch>
                  
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                © Vihara White Dragon King | 
                Develop with ❤ by Gerald Halomoan Samosir
              </Footer>
            </Layout>
          </Layout>
       </Router>
            </div>
            </LocaleProvider>
        )
    }
}