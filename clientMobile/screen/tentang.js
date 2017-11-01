import React  , {Component} from  "react"


import Nav from "../component/headers/nav"
import {Link} from  "react-router-dom"


export default class Tentang  extends Component{
    render(){
        return(
            <div>
                <Nav history={this.props.history}/>
                <div id="content" style={{height:(window.outerHeight -200)}}>
                    <center>
                    <h5>Tentang Viara</h5>
                    <br/>
                       <Link to={"/tentang/sejarah"} className="card card--material lk" >
                            <div className="card__content">
                                Sejarah Vihara
                            </div>
                        </Link>
                        <Link to={"/tentang/lokasi"} className="card card--material lk" >
                            <div className="card__content">
                              Lokasi
                            </div>
                        </Link>
                        <Link to={"/tentang/profil"} className="card card--material lk" >
                            <div className="card__content">
                              Profil Sangha
                            </div>
                        </Link>
                </center>
               </div>
            </div>
        )
    }
}