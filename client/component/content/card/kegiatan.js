import React ,{Component} from  "react"

import {Link} from  "react-router-dom"
import moment from "moment"



export default class Slide extends Component{
    
    render(){
             return(
              <div>
                <article id="card" className="">
                    <img src={this.props.kegiatan.bannerphoto} className="db w-100 br2 br--top" alt="Photo of a kitten looking menacing." 
                        />
                    <div className="pa2 ph3-ns pb3-ns">
                        <div className="dt w-100 mt1">
                        <div className="dtc">
                            <b><h7 className="f5 f4-ns mv0">{this.props.kegiatan.title}</h7></b>
                            <br/>
                            <h8 className="f5 mv0"></h8>
                        </div>
                        <br/>
                        </div>
                        <div style={{width:"100px"}}>
                            {moment(this.props.kegiatan.created_at).lang('id').format('dddd')}
                            <br/>
                            {moment(this.props.kegiatan.created_at).lang('id').format('DD-MM-YYYY HH:mm:ss')}
                        </div>
                        <p className="f6 lh-copy measure mt2 mid-gray">
                         <Link to={"/article/"+this.props.kegiatan.id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-button-costum" href="#0">Selengkapnya</Link>
                        </p>
                    </div>
                    </article>
                </div>
             )
    }
}

