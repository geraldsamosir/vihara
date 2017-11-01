import React , {Component} from "react"

import ReactDOM from 'react-dom'
import moment from "moment"
import Nav from "../component/headers/nav"

import Ibadahaction from  "../../client/action/ibadah"

export default class Home  extends Component{

    constructor(props){
        super(props)
        this.state = {
            ibadah : []
        }
    }
     componentDidMount() {
        this.getdata()
    }

     getdata(){
        Ibadahaction.get("").then((Response)=>{
            if(Response.code ==200){
                this.setState({ibadah:Response.result})
            }
        })
       
    }

   
    render(){
         let ibadah =  this.state.ibadah
         ibadah =  ibadah.map((data,index)=>{
             return(
                <div className="card" key={index}>
                    <div className="card__content">{moment(data.tanggal).lang("id").format('dddd DD-MM-YYYY HH:mm:ss')} - {data.ibadah}.</div>
                </div>
             )
         })
        return(
            <div>
               <Nav history={this.props.history}/>
              <div id="headers">
                    <div>
                        <center>    
                            <br/>   
                           <h5> Vihara White Dragon King</h5>
                           <h5>Jl. Serbaguna No.876, Tj. Gusta, Sunggal, Kabupaten Deli Serdang, Sumatera Utara 20116</h5>
                       </center>
                    </div>
                </div>
            <div id="content" style={{height:(window.outerHeight - 300)}}>
                <center>
                    <h5>Jadwal Ibadah</h5>
                </center>
                {ibadah}
            </div>
          
            </div>

        )
    }
}