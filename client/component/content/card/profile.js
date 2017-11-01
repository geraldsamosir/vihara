import React , {Component} from  "react"
import  {Link} from  "react-router-dom"

export default class  Profile extends Component{
    render(){
        return(
            <section className="tc pa3 pa5-ns" style={{float:"left"}}>
                <article className="hide-child relative ba b--black-20 mw5 center">
                    <center>
                    <img src={this.props.profil.photo}  />
                    </center>
                    <div className="pa2 bt b--black-20">
                    <a className="f6 db link dark-blue hover-blue" href="#">{this.props.profil.name}</a>
                    <Link to={"/profil/"+this.props.profil.id} className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" >Lihat Profil</Link>
                    </div>
                </article>
            </section>
        )
    }
}