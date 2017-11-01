import React , {Component} from  "react"

import Profileaction from  "../../action/profil"

import renderHTML from 'react-render-html';

export default class Profile extends Component {
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
        console.log(this.state.profil)
        return(
            <div className="fl w-100 pa5 animated fadeIn">
                <center>
                   <h2>{this.state.profil.name}</h2>
                </center>
                <div className="fl w-25 pa2">
                    <img src={this.state.profil.photo}/>
                </div>
                <div className="fl w-75 pa2">
                    {/*{renderHTML(this.state.profil.body)}*/}
                     {(this.state.profil.body != undefined)?renderHTML(this.state.profil.body):""}
                </div>
            </div>
        )
    }
}