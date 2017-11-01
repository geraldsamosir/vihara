import React ,{Component} from 'react'

import Artikelaction from "../../action/artikel"

import renderHTML from 'react-render-html';

import moment from "moment"

export default class Artikel extends Component {
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

    render () {
        return (
            <div className="fl w-100 pa5 animated fadeIn">
                <center>
                    <h1>{this.state.artikel.title}</h1>
                </center>
                 <center>
                    </center>
                    <div className="fl w-25 pa2">
                        <img src={this.state.artikel.bannerphoto}/>
                        <br/>
                        {moment(this.state.artikel.created_at).lang('id').format('dddd DD-MM-YYYY HH:mm:ss')}
                    </div>
                    <div className="fl w-75 pa2">
                        {/*{renderHTML(this.state.profil.body)}*/}
                        {(this.state.artikel.body != undefined)?renderHTML(this.state.artikel.body):""}
                    </div> 
               
                
            </div>
        )
    }
}
