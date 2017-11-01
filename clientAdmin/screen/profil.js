import React ,{Component} from  "react"

import { Table, Icon , Button , Form , Input ,DatePicker ,TimePicker} from 'antd';

import {Link} from  "react-router-dom"

import moment from 'moment';

import Profileaction from  "../../client/action/profil"





export default  class Profil extends Component{
  constructor(props){
        super(props)
        this.state = {
            profil : [],
     
        }
    }
    componentDidMount() {
        this.getdata()
    }
     getdata(){
        Profileaction.get("").then((Response)=>{
            if(Response.code ==200){
                this.setState({profil:Response.result})
            }
        })
       
    }

    deleteprofil(id){
        Profileaction.delete(id).then((response)=>{
            this.getdata()
        })
    }

    render(){
        const columns = [
        {
        title: 'Nama,',
        dataIndex: 'name',
        key: 'name',
        render: text => <p>{text}</p>,
        },
        {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
            <Link to={"/profil/"+record.id+""} >Edit </Link>
            <span className="ant-divider" />
            <Button onClick={this.deleteprofil.bind(this,record.id)} >Delete</Button>
            </span>
        ),
    }];
    
        const data =this.state.profil
        return(
            <div>
                <h1>Profil</h1>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Button type="primary" ><Icon type="plus-circle" />
                            <Link to={"/profil/news"} style={{color:"white"}}> Tambah Profil</Link>
                        </Button>
                        <br/><br/>
                        <Table columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}