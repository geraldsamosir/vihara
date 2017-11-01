import React ,{Component} from  "react"
import Nav from  "../../component/headers/nav"

export default class  Sejarah extends Component {
    render(){
        return(
            <div>
            <Nav history={this.props.history}/>
            <div id="content" style={{height:(window.outerHeight - 100)}}>
                 <center>
                     <h5>Sejarah Vihara</h5>
                 </center>
                 <div className="row">
                     <img src="/images/item/building.png" style={{width:"100%"}} alt="" className=""/>
                 </div>
                 <div className="row col-xs">
                    <br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores voluptatibus, laudantium magni sequi, labore explicabo et, optio amet blanditiis quidem ipsa cum alias libero commodi iste, provident aliquam saepe consectetur!
                 </div>

            </div>
            </div>
        )
    }
}