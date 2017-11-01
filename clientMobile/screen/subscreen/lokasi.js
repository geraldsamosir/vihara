import React ,{Component} from  "react"
import Iframe from 'react-iframe'

import Nav from  "../../component/headers/nav"


export default class  Sejarah extends Component {
    render(){
        return(
            <div>
            <Nav history={this.props.history}/>
            <div id="content" style={{height:(window.outerHeight -100)}}>
                 <center>
                     <h5>Lokasi Vihara</h5>
                     <h7>Jl. Serbaguna No.876, Tj. Gusta, Sunggal, Kabupaten Deli Serdang, Sumatera Utara 20116</h7>
                 </center>
                     <Iframe url="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15927.26427799865!2d98.6609568!3d3.6294412!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x718f1776de62be7!2sVihara+White+Dragon+King!5e0!3m2!1sid!2sid!4v1506737299424"
                                width="100%"
                                height="450px"
                                display="initial"
                                position="relative"
                                />
                    
            </div>
            </div>
        )
    }
}