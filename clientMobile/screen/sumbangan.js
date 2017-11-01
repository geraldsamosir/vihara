import React  , {Component} from  "react"
import Nav from "../component/headers/nav"
import moment from "moment"
import Sumbanganaction from  "../../client/action/sumbangan"

export default class Sumbangan  extends Component{
     constructor(props){
        super(props)
        this.state = {
            sumbangan:[],
        }
    }

    componentDidMount() {
        this.getdata()
    }

     getdata(){

        Sumbanganaction.get("").then((Response)=>{
            if(Response.code ==200){
                this.setState({sumbangan:Response.result})
            }
        })
       
    }

      _oncsearch(e){
       if(e.target.value !=""){
        let _data =  this.state.sumbangan.filter((data)=>{
            return data.dari.match(e.target.value)
        })
        this.setState({
            sumbangan : _data,
            
        })
       }
       else if(e.target.value == ""  || e.key == undefined){
           this.getdata()
       }
    }

    render(){
        let sumbangan =  this.state.sumbangan
         sumbangan =  sumbangan.map((data,index)=>{
             return(
                <div className="card card--material" key={index}>
                    <div className="card__content">
                       Hari : {moment(data.tanggal).lang("id").format('dddd')}  <br/>
                       Tanggal : {moment(data.tanggal).lang("id").format('DD-MM-YYYY ')} <br/>
                       Dari  : {data.dari} <br/>
                       Jumlah : Rp. {data.Jumlah}
                    </div>
                </div>
             )
         })
        return(
            <div>
            <Nav history={this.props.history}/>
               
               <div id="content" style={{height:(window.outerHeight -100),overflowY:"scroll"}}>
                    <center>
                    <h5>Sumbangan</h5>
                    <br/>
                     <input className="search-input" type="text" placeholder="cari nama penyumbang" onChange={this._oncsearch.bind(this)}/>
                      <br/>
                    {sumbangan}

                </center>
               </div>
            </div>
        )
    }
}