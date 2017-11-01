import React ,{Component} from 'react'

import Listarticle from  "../component/content/list/listarticle"
import Artikelaction from "../action/artikel"

export default class News extends Component {
    constructor(props){
        super(props)
        this.state = {
            artikel : [],
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

    render () {
        return (
            <div className="fl w-100 pa5 animated fadeInUp">
                <center>
                    <h1>Artikel</h1>
                </center>
                <Listarticle artikel={this.state.artikel}/>
            </div>
        )
    }
}
