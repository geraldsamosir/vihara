import React ,{Component} from 'react'

import {Link} from  "react-router-dom"

//comonent
import Listarticle from  "../component/content/list/listarticle"
import Tabelibadah from  "../component/content/table/ibadah"
import TabelSumbangan from  "../component/content/table/sumbangan"
import Slide from "../component/content/slide/kegiatanHome"


// action

import Artikelaction from "../action/artikel"
import Ibadahaction from  "../action/ibadah"
import Sumbanganaction from  "../action/sumbangan"

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            artikel : [],
            kegiatan: [],
            ibadah : [],
            sumbangan:[],
        }
    }

    componentDidMount() {
        this.getdata()
    }

     getdata(){
       Artikelaction.get("").then((Response)=>{
                if(Response.code == 200){
                    let _artikel =  Response.result.filter((data)=>data.category == 1 )
                    let  _kegiatan =  Response.result.filter((data)=>data.category == 2)
                    this.setState({artikel:_artikel.slice(0,0 + 8)})
                    this.setState({kegiatan :_kegiatan.slice(0, 0 + 3)})

                }
        })
        Ibadahaction.get("").then((Response)=>{
            if(Response.code ==200){
                this.setState({ibadah:Response.result})
            }
        })

        Sumbanganaction.get("").then((Response)=>{
            if(Response.code ==200){
                this.setState({sumbangan:Response.result.slice(0,0 + 8)})
            }
        })
       
    }

    render () {
        return (
            <div className="pa3 pa5-ns animated fadeInUp" >  
                 <div className="fl w-50 pa2">
                     <center>
                        <h2>Jadwal Ibadah</h2>
                    </center>
                    <Tabelibadah ibadah={this.state.ibadah}/>
                </div>
                <div className="fl w-50 pa2">
                    <center>    
                        <h2>Kegiatan </h2>
                    </center>
                    
                    <Slide kegiatan={this.state.kegiatan}/>
                    <Link to={"/kegiatan"} className="f6 link dim br3 ph3 pv2 mb2 dib white bg-black" href="#0">Semua Kegiatan</Link>
                </div>
                <div className="fl w-100 pa2">
                    <center>
                        <h2>Artikel</h2>    
                    </center>
                    <Listarticle  artikel={this.state.artikel}/>
                    <center>
                         <Link to={"/news"}className="f6 link dim br3 ph3 pv2 mb2 dib white bg-black" href="#0">Semua artikel</Link>
                     </center>
                    
                </div>
                <div className="fl w-100 pa2">
                    <center>
                    <h2>Sumbangan</h2>
                    </center>
                    <div style={{maxHeight:"300px", overflowY:"scroll"}}>
                         <TabelSumbangan sumbangan={this.state.sumbangan}/>
                    </div>
                     <center>
                         <Link to={"/sumbangan"} className="f6 link dim br3 ph3 pv2 mb2 dib white bg-black" href="#0">Semua Sumbangan</Link>
                     </center>
                </div>
            </div>
        )
    }
}
