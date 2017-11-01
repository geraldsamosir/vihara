import React  , {Component} from  "react"
import Nav from "../component/headers/nav"

import {Link} from  "react-router-dom"

import Artikelaction from  "../../client/action/artikel"

import renderHTML from 'react-render-html';

export default class article  extends Component{
    constructor(props){
        super(props)
        this.state = {
            artikel : []
        }
    }

    componentDidMount() {
        this.getdata()
    }

     getdata(){
       Artikelaction.get("").then((Response)=>{
                if(Response.code == 200){
                    let _artikel =  Response.result.filter((data)=>data.category == 1 )
                    this.setState({artikel:_artikel})
                  

                }
        })
    }
    render(){
        let article =  this.state.artikel
        article = article.map((data,index)=>{
            return(
                    <div style={{ padding:" 1px 0 0 0"}} key={index}>
                    <Link to={"/article/"+data.id} className="card card--material lk">
                        <h2 className="card__title">{data.title}</h2>
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
                    <h5>Artikel</h5>
                    <br/>

                    {article}

                </center>
               </div>
            </div>
        )
    }
}