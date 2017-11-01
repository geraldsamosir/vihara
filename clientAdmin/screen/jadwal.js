import React ,{Component} from  "react"

import { Table, Icon ,Modal, Button , Form , Input ,DatePicker ,TimePicker} from 'antd';

import moment from 'moment';

import Binder from 'react-binding';




import Ibadahaction from  "../../client/action/ibadah"

class Modals extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false ,
            data :{
                ibadah :"",
                tanggal:"",
                hari: "",
                time :""
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

    handleSubmit(e){

         e.preventDefault();

       
            
         Ibadahaction.create({
             Ibadah :this.state.data.ibadah,
             hari : this.state.data.hari,
             tanggal : this.state.data.tanggal +" "+this.state.data.time
         })
         .then((Response)=>{
             console.log(Response)
            this.props.getdata()  
         })
         
    }

    handleibdah(e){
        this.setState({
            data :{
                ibadah : e.target.value,
                tanggal  :this.state.data.tanggal,
                hari : moment(this.state.data.tanggal).lang("id").format("dddd"),
                time : this.state.data.time
            }
        })
    }

    handledate(date, dateString){
        this.setState({
            data :{
                ibadah : this.state.data.ibadah,
                tanggal  :dateString,
                hari : moment(dateString).lang("id").format("dddd"),
                time : this.state.data.time
            }
        })
    }

    handletime(time, timeString){
        console.log(timeString)
        this.setState({
            data :{
                ibadah : this.state.data.ibadah,
                tanggal  :this.state.data.tanggal,
                hari : moment(this.state.data.tanggal).lang("id").format("dddd"),
                time : timeString
            }
        })
    }
    render() {
        return (
        <div>
            <Button type="primary" onClick={this.showModal.bind(this)}><Icon type="plus-circle" />Tambah Jadwal</Button>
            <Modal
            title="Jadwal"
            visible={this.state.visible}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel.bind(this)}
            >
                <Form onSubmit={this.handleSubmit.bind(this)} layout="">
                     
                    <DatePicker placeholder="Tanggal ibadah" onChange={this.handledate.bind(this)}/>
                    
                     <br/><br/>
                     <TimePicker placeholder="Jam ibadah" onChange={this.handletime.bind(this)} defaultOpenValue={moment('00:00', 'HH:mm')} />,
                     <br/><br/>
                    <Input placeholder="Nama ibadah" type="text" onChange={this.handleibdah.bind(this)} />
                     <br/><br/>
                     <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Simpan Jadwal
                    </Button>
                </Form>
            </Modal>
        </div>
        );
    }
}





export default  class jadwal extends Component{
        constructor(props){
        super(props)
        this.state = {
            ibadah : []
        }
    }
     componentDidMount() {
        this.getdata()
    }

     getdata(){
        Ibadahaction.get("").then((Response)=>{
            if(Response.code ==200){
                this.setState({ibadah:Response.result})
            }
        })
       
    }

    delete(id){
        Ibadahaction.delete(id).then((Response)=>{
            if(Response.code == 200){
                this.getdata()
            }
        })

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
            title: 'Ibadah',
            dataIndex: 'ibadah',
            key: 'ibadah',
            }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button onClick={this.delete.bind(this,record.id)}>Delete</Button>
                </span>
                ),
            }];


        let data = this.state.ibadah

        data =  data.map((_data)=>{
           return {
                id :_data.id,
                hari : moment(_data.tanggal).lang("id").format('dddd'),
                tanggal :moment(_data.tanggal).lang("id").format('DD-MM-YYYY HH:mm:ss'),
                ibadah : _data.ibadah
            }
        })
        return(
            <div>
                <h1>Jadwal Ibadah</h1>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        
                       <Modals getdata={this.getdata.bind(this)}/>
                       <br/>
                        <Table columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}