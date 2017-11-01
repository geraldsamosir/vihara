import React ,{Component} from  "react"
import {Link} from  "react-router-dom"

import Nav from  "../../component/headers/nav"
import Profileaction from  "../../../client/action/profil"
export default class  Profil extends Component {
     constructor(props){
        super(props)
        this.state = {
            profil : [],
     
        }
    }
    componentDidMount() {
        this.getdata()
    }
     getdata(){
        Profileaction.get("").then((Response)=>{
            if(Response.code ==200){
                this.setState({profil:Response.result})
            }
        })
       
    }
    render(){
        const profil =  this.state.profil.map((data , index)=>{
            return(
                 <li className="list-item" key={index}>
                        <Link to={"/tentang/profil/"+data.id} className="lk list-item">
                        <div className="list-item__left">
                        <img className="list-item__thumbnail" src={data.photo} alt="Cute kitten" />
                        </div>

                        <div className="list-item__center">
                        <div className="list-item__title">{data.name}</div>
                        </div>
                        </Link>
                    </li>
            )
        })
        return(
            <div>
            <Nav history={this.props.history}/>
            <div id="content" style={{height:(window.outerHeight - 100),overflowY:"scroll"}}>
                 <center>
                     <h5>Profil Sangha</h5>
                 </center>
                 <ul className="list">
                   
                    {profil}
                  
                    </ul>

            </div>
            </div>
        )
    }
}