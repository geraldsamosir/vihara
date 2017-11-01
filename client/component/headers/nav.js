import React , {Component} from "react"
import  {Link} from 'react-router-dom'


export default class Navbar extends Component {
    render(){
        return(
            <header className="sans-serif">
            <div className="cover bg-left bg-center-l" id="homebanner">
                <div className="nila pb5 pb6-m pb7-l">  
                    <nav className="dt w-100 mw8 center"> 

                        <div className="pa3" id="logo">
                            <Link to="/">
                                <img src="http://www.dhammacakka.org/themes/vjdj/images/icon.png" alt=""/>
                            </Link>
                        </div>
                        <div className="dtc v-mid tr pa3">
                        <Link id="mainmenu" className="f6 fw4 hover-white no-underline white-80 dn dib-ns pv2 ph3" to="/"><h2>Home</h2></Link>
                        <Link id="mainmenu" className="f6 fw4 hover-white no-underline white-80 dn dib-ns pv2 ph3" to="/news"><h2>Artikel</h2></Link>
                        <Link id="mainmenu" className="f6 fw4 hover-white no-underline white-80 dn dib-ns pv2 ph3" to="/sumbangan"><h2>Sumbangan</h2></Link>
                        <Link id="mainmenu" className="f6 fw4 hover-white no-underline white-80 dn dib-ns pv2 ph3" to="/kegiatan"><h2>Kegiatan</h2></Link>
                        <Link id="mainmenu" className="f6 fw4 hover-white no-underline white-80 dn dib-ns pv2 ph3" to="/tentang"><h2>Tentang Vihara</h2></Link>

                        </div>
                    </nav>   
                    <center>
                        <br/>
                        <h1 className="white-80 dn dib-ns pv2 ph3">White Dragon King</h1>
                        <br/>
                        <h3 className="white-80 dn dib-ns pv2 ph3">Jl. Serbaguna No.876, Tj. Gusta, Sunggal, Kabupaten Deli Serdang, Sumatera Utara 20116</h3>
                     </center>
                </div>
            </div>    
            </header>



        )
    }
}