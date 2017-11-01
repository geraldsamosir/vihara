import React ,{Component} from 'react'

import ListKegiatan from  "../component/content/list/listkegiatan"

import Artikelaction from "../action/artikel"

export default class Kegiatan extends Component {
    constructor(props){
        super(props)
        this.state = {
            kegiatan: [],
        }
    }
      componentDidMount() {
        this.getdata()
    }

     getdata(){
       Artikelaction.get("").then((Response)=>{
                if(Response.code == 200){
                    let  _kegiatan =  Response.result.filter((data)=>data.category == 2)
                    this.setState({kegiatan :_kegiatan})

                }
        })

       
    }

    render () {
        return (
            <div className="fl w-100 pa5 animated fadeInUp">
                <center>
                    <h1>Kegiatan</h1>
                </center>
                
                <ListKegiatan  kegiatan={this.state.kegiatan}/>
            </div>
        )
    }
}
