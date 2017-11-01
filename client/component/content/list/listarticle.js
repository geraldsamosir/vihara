import React ,{Component} from "react"
import Artikel  from  "../card/article"

export default class Listarticle extends Component{
    render(){
      //  let articles = this.props.artikel.slice(0,0 + 5)
       let articles = this.props.artikel
        articles =  articles.map((data)=>{
            return <Artikel artikel={data}/>
        })
        return(
            <div className="fl w-100 pa2">
                 {articles}
            </div>
        )
    }
}