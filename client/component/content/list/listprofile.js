import React ,{Component} from  "react"

import Profile from "../card/profile"

export default class Listkegiatan extends Component{
    render(){
        let profiles = this.props.profil
        profiles =  profiles.map((data)=>{
            return(
                <div className="fl w-25 pa2">
                 <Profile profil={data}/>
                </div>
            )
        })
        return(
            <div>
                 {profiles}
            </div>
        )
    }
}