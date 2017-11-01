import React , {Component} from "react"

import  {Link} from  "react-router-dom"

import ReactDOM from 'react-dom'

export default class Home  extends Component{
  
    _goback(){
        this.props.history.goBack()
    }
    render(){
        return(
            <div>
                <div id="mainmenu" className="toolbar">
                   {(window.location.hash.substr(1) !="/")?
                    <div className="toolbar__left" >
                    <span className="toolbar-button" onClick={this._goback.bind(this)}>
                         <i className="ion-android-arrow-back" style={{fontSize:"32px",verticalAlign:"-6px",color:"white"}}></i>
                    </span>
                    </div>
                    :""
                   }
                    <div className="toolbar__center">
                        <Link className="lk " to={"/"}>
                        <b style={{color:"white"}}>
                            <img src="http://www.dhammacakka.org/themes/vjdj/images/icon.png" alt=""
                            width={40} height={40}/>
                            
                        </b>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}