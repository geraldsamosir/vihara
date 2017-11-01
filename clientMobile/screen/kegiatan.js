import React  , {Component} from  "react"
import Nav from "../component/headers/nav"

import {Link} from  "react-router-dom"
import renderHTML from 'react-render-html';
import Artikelaction from  "../../client/action/artikel"
import moment from "moment"

export default class Kegiatan  extends Component{
        constructor(props){
        super(props)
        this.state = {
            kegiatan : []
        }
    }

    componentDidMount() {
        this.getdata()
    }

     getdata(){
       Artikelaction.get("").then((Response)=>{
                if(Response.code == 200){
                    let _artikel =  Response.result.filter((data)=>data.category == 2 )
                    this.setState({kegiatan:_artikel})
                  

                }
        })
    }
    render(){
        let kegiatan =  this.state.kegiatan
        kegiatan =  kegiatan.map((data,index)=>{
            return(
                <div style={{ padding:" 1px 0 0 0"}} key={index}>
                    <Link to={"/article/"+data.id}  className="card lk">
                        <h2 className="card__title">{data.title}</h2>
                        <p className="">{moment(data.created_at).lang("id").format('dddd DD-MM-YYYY HH:mm:ss')}</p>
                        <div className="card__content">
                            <div className="row">
                                 <div className="col-xs-4">
                                     <img 
                                         style={{width: "100%",height: "100px"}}
                                         src={data.bannerphoto} alt=""/>
                                 </div>
                                 <div className="col-xs-8">
                                       {renderHTML(data.body.substring(0,100))}
                                 </div>
                            </div>
                        </div>
                    </Link>
                    </div>
            )
             
        })
        return(
            <div>
                <Nav history={this.props.history}/>
                 <div id="content" style={{height:(window.outerHeight -200)}}>
                    <center>
                    <h5>Kegiatan</h5>
                    {kegiatan}
                </center>
               </div>
            </div>
        )
    }
}