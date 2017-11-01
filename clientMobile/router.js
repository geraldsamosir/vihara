import React ,{Component} from "react"

import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


//component
import Footer from  "./component/footer/footer"

//screan 
import Home from  "./screen/home"
import Article from  "./screen/article"
import Sumbangan from  "./screen/sumbangan"
import tentang from  "./screen/tentang"
import kegiatan from  "./screen/kegiatan"

//subscreen 

import Sejarah from  "./screen/subscreen/sejarah"
import Profile from  "./screen/subscreen/profil"
import Lokasi  from  "./screen/subscreen/lokasi"
import Articledetail from  "./screen/subscreen/article"
import Profildetail from  "./screen/subscreen/detailprofil"


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
                   
                    <div>
                        <Switch>
                            <Route  exact path="/"  component={Home} />
                             <Route  exact path="/article/"  component={Article} />
                             <Route  exact path="/article/:id"  component={Articledetail} />
                              <Route  exact path="/sumbangan/"  component={Sumbangan} />
                              <Route  exact path="/tentang/"  component={tentang} />
                              <Route  exact path="/tentang/sejarah"  component={Sejarah} />
                              <Route  exact path="/tentang/profil"  component={Profile} />
                              <Route  exact path="/tentang/profil/:id"  component={Profildetail} />
                              <Route  exact path="/tentang/lokasi"  component={Lokasi} />
                              <Route  exact path="/kegiatan/"  component={kegiatan} />
                         </Switch>
                     </div>
                     <Footer/>
                </div>
                </ScrollToTop>
            </Router>
       )
   }
}




