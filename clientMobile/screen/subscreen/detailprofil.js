import React  ,{Component} from  "react"

import Nav from  "../../component/headers/nav"

import Profileaction from  "../../../client/action/profil"
import renderHTML from 'react-render-html';

export default class Article extends Component{
     constructor(props){
        super(props)
        this.state = {
            profil : {},
     
        }
    }
     componentDidMount() {

        this.getdata(this.props.match.params.id)
    }

     getdata(id){

       Profileaction.get("id="+id).then((Response)=>{
                if(Response.code == 200){
                    this.setState({profil:Response.result[0]})                                                                                                          

                }
        })
       
    }
    render(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        return(
            <div> 
            <Nav history={this.props.history}/>
            <div id="content" style={{height:(window.outerHeight -100) }}>
                 <center>
                     <h5>{this.state.profil.name}</h5>
                     <img src={this.state.profil.photo} alt=""/>
                     <br/><br/>
                 </center>  
                 {(this.state.profil.body != undefined)?renderHTML(this.state.profil.body):""}
            </div>
            </div>
        )
    }
}