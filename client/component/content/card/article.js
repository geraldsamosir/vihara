import React ,{Component} from  "react"
import {Link} from  "react-router-dom"

import renderHTML from 'react-render-html';



export default class Artikel extends Component{
    render(){
        return(
           <article id="card" className="bg-white center mw5 ba b--black-10 mv4" style={{float:"left", margin:"20px"}}>
                <div className="pv2 ph3">
                    <h1 className="f6 ttu tracked">{this.props.artikel.title}</h1>
                </div>
                <img src={this.props.artikel.bannerphoto} className="w-100 db" alt="Closeup photo of a tabby cat yawning." />
                <div className="pa3">
                    <h5 className="link dim lh-title">
                        {renderHTML(this.props.artikel.body.substring(0,100))}
                    </h5>
                      <Link to={"/article/"+this.props.artikel.id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-button-costum" href="#0">Selengkapnya</Link>
                </div>
                </article>
        )
    }
}