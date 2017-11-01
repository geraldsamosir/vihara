import React  ,{Component} from  "react"

import Nav from  "../../component/headers/nav"
import moment from "moment"

import Artikelaction from  "../../../client/action/artikel"
import renderHTML from 'react-render-html';

export default class Article extends Component{
     constructor(props){
        super(props)
        this.state = {
            artikel : {}
        }
    }
    componentDidMount() {
        this.getdata(this.props.match.params.id)
    }   

     getdata(id){

       Artikelaction.get("id="+id).then((Response)=>{
                if(Response.code == 200){
                    this.setState({artikel:Response.result[0]})
                }
        })
       
    }
    render(){
        return(
            <div> 
            <Nav history={this.props.history}/>
            <div id="content" style={{height:(window.outerHeight -100),overflowY:"scroll"}}>
                 <center>
                     <h5>{this.state.artikel.title}</h5>
                     <p>{moment(this.state.artikel.created_at).lang("id").format('dddd DD-MM-YYYY HH:mm:ss')}</p>
                 </center>
                     <img src={this.state.artikel.bannerphoto} alt="" style={{width:"100%",height:"280px"}}/>
                       {(this.state.artikel.body != undefined)?renderHTML(this.state.artikel.body):""}
            
            </div>
            </div>
        )
    }
}