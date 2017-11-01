import React , {Component} from "react"
import  {Link} from 'react-router-dom'

export default class HomeBanner extends Component {
    render(){
        return(
             <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/news">News</Link></li>
            </ul>
        )
    }
}