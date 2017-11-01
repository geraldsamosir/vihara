import React ,{Component} from  "react"

import Kegiatan from  "../card/kegiatan"

export default class Listkegiatan extends Component{
    render(){
        let _Kegiatan = this.props.kegiatan
        _Kegiatan =  _Kegiatan.map((data)=>{
            return(
                <div className="br2 ba dark-gray b--black-10 mv4 w-30 fl" style={{height:"520px"}}>
                 <Kegiatan kegiatan={data}/>
                </div>
            )
        })
        return(
            <div>
                 {_Kegiatan}
            </div>
        )
    }
}