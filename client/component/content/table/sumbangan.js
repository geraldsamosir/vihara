import React ,{Component} from  "react"

import moment from "moment"


export  default class TabelSumbangan extends  Component{
    render(){
        console.log(this.props.sumbangan)
         let  Sumbangan = this.props.sumbangan.map((data,index)=>{
            return(
                        <tr className="stripe-dark">
                           <td className="pa3">{moment(data.tanggal).lang('id').format('dddd')}</td>
                             <td className="pa3">{moment(data.tanggal).format(' DD-MM-YYYY HH:mm:ss')}</td>
                            <td className="pa3">{data.dari}</td>
                            <td className="pa3">Rp.{data.Jumlah}</td>
                        </tr>
            )
        })
        return(
            <div className="pa4" >
                <div className="overflow-auto">
                    <table className="f6 w-100 mw8 center" cellspacing="0">
                    <thead>
                        <tr className="stripe-dark">
                        <th className="fw6 tl pa3 bg-white">Hari</th>
                        <th className="fw6 tl pa3 bg-white">Tanggal</th>
                        <th className="fw6 tl pa3 bg-white">Dari</th>
                        <th className="fw6 tl pa3 bg-white">Jumlah (Rp.)</th>
                        </tr>
                    </thead>
                    <tbody className="lh-copy">
                            {Sumbangan}
                    </tbody>
                    </table>
                </div>
                </div>

        )
    }
}
