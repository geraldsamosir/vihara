import React ,{Component} from "react"

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


//component
import Nav from "./component/headers/nav"
import Footer from  "./component/footer/footer"

//screan 
import Home from  "./screen/home"
import News from  "./screen/news"
import Sumbangan from  "./screen/sumbangan"
import Kegiatan from  "./screen/kegiatan"
import Tentangvihara from  "./screen/tentangvihara"
import Profil from    "./screen/subscreen/profile"
import Notfound  from  "./screen/404"

import  Artikel from  "./screen/subscreen/article"

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}



export default class routers extends Component {

 constructor(props){
     super(props)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }


   render(){
       return(
            <Router>
                <ScrollToTop>
                <div>
                    <Nav />
                    <div>
                        <Switch>
                        <Route  exact path="/"  component={Home} />
                        <Route exact path="/news" component={News}/>
                        <Route exact path="/Sumbangan" component={Sumbangan} />
                        <Route exact path="/Kegiatan" component={Kegiatan} />
                        <Route exact path="/tentang" component={Tentangvihara} />
                         <Route exact path="/article/:id" component={Artikel} />
                         <Route exact path="/profil/:id" component={Profil} />
                         <Route component={Notfound}/>
                         </Switch>
                     </div>
                     <Footer/>
                </div>
                </ScrollToTop>
            </Router>
       )
   }
}




