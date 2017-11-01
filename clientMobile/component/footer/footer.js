import React , {Component} from "react"

import {Link} from  "react-router-dom"

import ReactDOM from 'react-dom'

export default class footer  extends Component{
    render(){
        return(
            <div>
                <div className="tabbar tabbar--material" style={{background:"#fcbc3f"}}>
                    <label className="tabbar--material__item">
                        <Link className="tabbar__button" to="/article/">
                            <div className="tabbar__label" style={{color:"white"}}>Artikel</div>
                        </Link>
                    </label>

                    <label className="tabbar--material__item">
                        <Link to={"/sumbangan/"} className="tabbar__button">
                        <div className="tabbar__label" style={{color:"white"}}>Sumbangan <br/></div>
                        </Link>
                    </label>

                    <label className="tabbar--material__item">
                        
                        <Link to={"/kegiatan/"} className="tabbar__button">
                        <div className="tabbar__label" style={{color:"white"}}>Kegiatan <br/></div>
                        </Link>
                    </label>
                    <label className="tabbar--material__item">
                        
                        <Link to={"/tentang/"} className="tabbar__button">
                        <div className="tabbar__label" style={{color:"white"}}>Tentang vihara</div>
                        </Link>
                    </label>
                </div>
            </div>
        )
    }
}