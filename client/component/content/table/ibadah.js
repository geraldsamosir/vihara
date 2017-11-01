import React ,{Component}from "react"
import moment from "moment"
export default class Tabelibadah extends  Component{
    render(){
     

      let  Ibadah = this.props.ibadah.map((data,index)=>{
            return(
                        <tr className="stripe-dark" key={index}>
                            <td className="pa3">{moment(data.tanggal).lang('id').format('dddd')}</td>
                            <td className="pa3">{moment(data.tanggal).format(' DD-MM-YYYY HH:mm:ss')}</td>
                            <td className="pa3">{data.ibadah}</td>
                        </tr>
            )
        })
        return(
            <div className="pa4" style={{maxHeight:"300px", overflowY:"scroll"}}>
                <div className="overflow-auto">
                    <table className="f6 w-100 mw8 center" cellspacing="0">
                    <thead>
                        <tr className="stripe-dark">
                        <th className="fw6 tl pa3 bg-white">Hari</th>
                        <th className="fw6 tl pa3 bg-white">Tanggal</th>
                        <th className="fw6 tl pa3 bg-white">Ibadah</th>
                        </tr>
                    </thead>
                    <tbody className="lh-copy">
                        {Ibadah}
                    </tbody>
                    </table>
                </div>
                </div>

        )
    }
}