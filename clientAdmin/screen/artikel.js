import React ,{Component} from  "react"

import { Table, Icon , Button , Form , Input ,DatePicker ,TimePicker} from 'antd';

import moment from 'moment';

import {Link} from  "react-router-dom"

import Artikelaction from  "../../client/action/artikel"

import renderHTML from 'react-render-html';






export default  class Artikel extends Component{
    constructor(props){
        super(props)
        this.state = {
            artikel : []
        }
    }

    componentDidMount() {
        this.getdata()
    }

     getdata(){
       Artikelaction.get("").then((Response)=>{
                if(Response.code == 200){
                    let _artikel =  Response.result
                    this.setState({artikel:_artikel})
                  

                }
        })
    }

    _delete(id){
        console.log("delte art")
        Artikelaction.delete(id)
        .then((Response)=>{
            this.getdata()
        })

    }

     _oncsearch(e){
       if(e.target.value !=""){
        let _data =  this.state.artikel.filter((data)=>{
            return data.title.match(e.target.value)
        })
        this.setState({
            artikel : _data,
            
        })
       }
       else if(e.target.value == ""  || e.key == undefined){
           this.getdata()
       }
    }

    render(){
        const columns = [
            {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: text => <p>{text}</p>,
            },
            {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                <Link to={"/artikel/"+record.id+""}>Edit</Link>
                <span className="ant-divider" />
                <Button onClick={this._delete.bind(this,record.id)}>Delete </Button> 
                </span>
            ),
        }];
        
        const data = this.state.artikel
        return(
            <div>
                <h1>Artikel</h1>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Button type="primary" ><Icon type="plus-circle" />
                            <Link to={"/artikel/news"} style={{color:"white"}}>
                                Tambah Artikel
                            </Link>
                        </Button>
                        <br/><br/>
                         <Input type="search" placeholder="cari berdasarkan judul" onChange={this._oncsearch.bind(this)}/>
                         <br/><br/>
                        <Table columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}