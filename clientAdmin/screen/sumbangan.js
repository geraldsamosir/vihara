import React ,{Component} from  "react"

import { Table, Icon ,Modal, Button , Form , Input ,DatePicker ,TimePicker} from 'antd';

import moment from "moment"
import Sumbanganaction from  "../../client/action/sumbangan"


class Modals extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false ,
            data :{
                dari :"",
                Jumlah:"",
                tanggal:"",
                hari: "",
            }   
        }
    }
  
    showModal() {
        this.setState({
          visible: true,
        });
    }
    handleOk(e){
        console.log(e);
        this.setState({
        visible: false,
        });
    }
    handleCancel(e){
        console.log(e);
        this.setState({
        visible: false,
        });
    }

    handlefrom(e){
        this.setState({
            data :{
                dari : e.target.value,
                tanggal  :this.state.data.tanggal,
                hari : this.state.data.hari,
                Jumlah : this.state.data.Jumlah
            }
        })
    }

    handledate(date, dateString){
        this.setState({
            data :{
                dari : this.state.data.dari,
                tanggal  :dateString,
                hari : moment(dateString).lang("id").format("dddd"),
                Jumlah : this.state.data.Jumlah
            }
        })
    }

    handleJumlah(e){
        this.setState({
            data :{
                dari : this.state.data.dari,
                tanggal  :this.state.data.tanggal,
                hari : this.state.data.hari,
                Jumlah : e.target.value
            }
        })
    }

    

    handleSubmit(e){
         e.preventDefault();

         Sumbanganaction.create({
             dari : this.state.data.dari,
             tanggal  :this.state.data.tanggal,
             hari : this.state.data.hari,
             Jumlah : this.state.data.Jumlah
         })
          .then((Response)=>{
            this.props.getdata()  
         })
    }
    render() {
        return (
        <div>
            <Button type="primary" onClick={this.showModal.bind(this)}><Icon type="plus-circle" />Tambah Sumbangan</Button>
            <Modal
            title="Sumbangan"
            visible={this.state.visible}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel.bind(this)}
            >
                <Form onSubmit={this.handleSubmit.bind(this)} layout="">
                     
                    <DatePicker placeholder="Tanggal" onChange={this.handledate.bind(this)}/>
                     <br/><br/>
                     <Input  placeholder="Jumlah" type="number" onChange={this.handleJumlah.bind(this)}/>
                     <br/><br/>
                    <Input placeholder="Dari (yang memeberi Sumbangan)" type="text" onChange={this.handlefrom.bind(this)} />
                     <br/><br/>
                     <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Simpan Sumbangan
                    </Button>
                </Form>
            </Modal>
        </div>
        );
    }
}







export default  class sumbangan extends Component{
      constructor(props){
        super(props)
        this.state = {
            sumbangan:[],
        }
    }

    componentDidMount() {
        this.getdata()
    }

     getdata(){

        Sumbanganaction.get("").then((Response)=>{
            if(Response.code ==200){
                this.setState({sumbangan:Response.result})
            }
        })
     }
     delete(id){
       Sumbanganaction.delete(id).then((Response)=>{
            if(Response.code == 200){
                this.getdata()
            }
        })

    }

     _oncsearch(e){
       if(e.target.value !=""){
        let _data =  this.state.sumbangan.filter((data)=>{
            return data.dari.match(e.target.value)
        })
        this.setState({
            sumbangan : _data,
            
        })
       }
       else if(e.target.value == ""  || e.key == undefined){
           this.getdata()
       }
    }

    render(){
        const columns = [
                {
                title: 'Hari',
                dataIndex: 'hari',
                key: 'hari',
                render: text => <p>{text}</p>,
                }, {
                title: 'Tanggal',
                dataIndex: 'tanggal',
                key: 'tanggal',
                }, {
                title: 'Dari',
                dataIndex: 'dari',
                key: 'dari'
                }, 
                {
                    title: 'Jumlah',
                    dataIndex: 'Jumlah',
                    key: 'Jumlah',
                    render: text => <p>Rp. {text}</p>
                },
                {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                    <Button onClick={this.delete.bind(this,record.id)}>Delete</Button>
                    </span>
                ),
                }];
        let data = this.state.sumbangan
        data =  data.map((_data)=>{
           return {
                id :_data.id,
                hari : moment(_data.tanggal).lang("id").format('dddd'),
                tanggal :moment(_data.tanggal).lang("id").format('DD-MM-YYYY HH:mm:ss'),
                dari : _data.dari,
                Jumlah :_data.Jumlah
            }
        })
        return(
            <div>
                <h1>Sumbangan</h1>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                       <Modals getdata={this.getdata.bind(this)}/>
                       <br/>
                        <Input type="search" placeholder="cari berdasarkan dari penyumbang" onChange={this._oncsearch.bind(this)}/>
                        <br/><br/>
                        <Table columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}