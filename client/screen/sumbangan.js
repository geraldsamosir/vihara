import React ,{Component} from 'react'

import TabelSumbangan from  "../component/content/table/sumbangan"

import Sumbanganaction from  "../action/sumbangan"

import linkState from 'react-link-state';



export default class Sumbangan extends Component {
    constructor(props){
        super(props)
        this.state = {
            sumbangan:[]
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
    render () {
        return (
            <div className="fl w-100 pa5 animated fadeInUp">
                <center>
                    <h1>Sumbangan</h1>
                </center>
                <center>
                    <input type="text" placeholder="cari nama penyumbang" onKeyPress={this._oncsearch.bind(this)} onChange={this._oncsearch.bind(this)} />
                </center>
                <TabelSumbangan sumbangan={this.state.sumbangan}/>
            </div>
        )
    }
}
