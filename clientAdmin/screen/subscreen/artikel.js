import React ,{Component} from  "react"
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import {Form , Button, Input , Select,Icon ,Modal , DatePicker, TimePicker}from 'antd'
import moment from "moment"



const Option = Select.Option;
import Artikelaction from  "../../../client/action/artikel"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

let _images  =""

class Modals extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            visible: false ,
            files : [],
            upload :"",
            url :"",
            selected :""
        }
    }

    componentDidMount() {
        this.getdata()
    }

    getdata(){
         fetch("/api/news/post/files",{Method :"GET"})
        .then(response => response.json())
        .then((response)=>{

            this.setState({
                files :response.result,
                url : response.url,
                selected : "/default.png"
            })
         
        })
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
          let formdata  = new FormData()
          formdata.append("bannerphoto",this.state.upload)
         fetch("/api/news/post/upload",{
             method: "Post",
             headers :{
                email : localStorage.email,
                token :localStorage.token
             },
             body : formdata

         })
         .then(response => response.json())
         .then((response)=>{
          
              this.getdata()
         })
    }

    handleimage(e){
        this.setState({
            upload :e.target.files[0],
        })
    }

    selectImage(name){
       // console.log("selected "+name)
        this.setState({
            selected : name
        })
//this.props.getbannerphoto.bind(this)
        _images = this.state.url+""+name

    }

    deleteimage(){
         fetch("/api/news/post/files?name="+this.state.selected,{
             method: "delete",
             headers :{
                email : localStorage.email,
                token :localStorage.token
             }

         })
        .then(response => response.json())
         .then((response)=>{
             console.log(response)
              this.getdata()
         })
    }

     imageclick(){
         console.log("here")
         document.getElementById("getimage").click()
     }

    render() {
        let image =  this.state.files.map((data)=>{
            return(
                <img id="image" src={this.state.url+"/"+data} style={{width:"150px",height:"100",margin:"10px"}} 
                    onClick={this.selectImage.bind(this,data)}/>
            )
        })
        
        return (
        <div>
                {
                    (this.props.bannerphoto != "")?
                      <div>
                          <img  src={this.props.bannerphoto} style={{width:"150px",height:"100",margin:"0px"}}/> 
                          <br/> <br/> 
                           gambar Sebelumnya
                      </div>
                    :""
                }
            <img  src={this.state.url +""+this.state.selected } style={{width:"150px",height:"100px"}} onClick={this.imageclick.bind(this)}/>
            <p className=""> klik gambar untuk memilih gambar dari galeri</p>
            <br/>
            <Button id="getimage" type="primary" onClick={this.showModal.bind(this)} style={{display:"none"}}><Icon type="camera"  />Galeri</Button>
            <Modal
            width={1000}
            title="Galeri artikel"
            visible={this.state.visible}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel.bind(this)}
            >   
               
                <Form onSubmit={this.handleSubmit.bind(this)}>

                    Upload Image
                    <br/>
                        <a href="https://tinypng.com/" target="_blank" className="">Sebelum upload  gambarnya di kompress dulu disini</a>
                        <Input className="primary" type="file" onChange={this.handleimage.bind(this)}/>
                    <br/>
                      <Button
                        type="primary"
                        htmlType="submit"

                    >
                        Upload
                    </Button>
                </Form>
                <br/><br/>
                <div className="col-3" style={{float:"left",border:"1px Solid black",marginRight:"2%"}}>
                Selected Image
                <br/>
                <img id="image" src={this.state.url+"/"+this.state.selected} style={{width:"150px",height:"100",margin:"10px"}} 
                    />
                </div>
                <div className="col-8">
                List Image
                <br/>
                {image}
                </div>
                 <br/><br/>
                 <Button type="danger" onClick={this.deleteimage.bind(this)}>Hapus</Button>
            </Modal>
        </div>
        );
    }
}

export default  class Article extends Component{

   constructor(props) {
        super(props);
        this.state = {
            editorState: "",
            data : {
                bannerphoto : "",
                title : "",
                tanggal : "",
                time : "",
                category:"",
                body :""
            }
        };
    }

   componentDidMount() {
        console.log("here")
        console.log(this.props.match.params.id)

       this.getdata(this.props.match.params.id)
     
    }

     getdata(id){
        if(id != "news"){
            console.log("get update")
            Artikelaction.get("id="+id).then((Response)=>{
                        if(Response.code == 200){
                            const html =  Response.result[0].body
                            const contentBlock =  htmlToDraft(html)
                            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                            const _editorState = EditorState.createWithContent(contentState);
                            this.setState({
                                data:{
                                bannerphoto : Response.result[0].bannerphoto,
                                title : Response.result[0].title,
                                tanggal : moment(Response.result[0].created_at).lang("id").format('DD-MM-YYYY'),
                                time : moment(Response.result[0].created_at).lang("id").format('HH:mm:ss') ,
                                category:Response.result[0].category,
                                body :Response.result[0].body
                                },
                                editorState :  _editorState
                            })

                        }
                })
            }
        else{
            this.setState({
                editorState :EditorState.createEmpty()
            })
        }
       
    }
    onEditorStateChange (editorState) {
        this.setState({
            editorState,
         });
    //     console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))

    };

    onhandletitile(e){
        this.setState({
            data :{
                title : e.target.value,
                bannerphoto : _images,
                tanggal : this.state.data.tanggal,
                time : this.state.data.time,
                body : this.state.data.body,
                category  :this.state.data.category
            }
        })

    }

    onhanletanggal(date, dateString){
        this.setState({
            data :{
            tanggal : dateString,
            title : this.state.data.title,
            bannerphoto : _images,
            time : this.state.data.time,
            body : this.state.data.body,
            category  :this.state.data.category
            }
        })
    }

    onhanletime(time,timeString){
        this.setState({
            data:{
                title : this.state.data.title,
                bannerphoto : _images,
                tanggal : this.state.data.tanggal,
                body : this.state.data.body,
                time: timeString,
                category  :this.state.data.category
            }
        })
    }

    onhandlekategory(value){
        this.setState({
            data :{
                category :value,
                title : this.state.data.title,
                bannerphoto : _images,
                tanggal : this.state.data.tanggal,
                time : this.state.data.time,
                body : this.state.data.body
            }
        })

    }


    onsubmit(e){
        e.preventDefault()
        let _data = {
                title :this.state.data.title,
                category :this.state.data.category,
                bannerphoto: (_images == "")?this.state.data.bannerphoto:_images,
                body :  draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
                created_at : this.state.data.tanggal+" "+this.state.data.time
            };

        if(this.props.match.params.id == "news"){
            Artikelaction.create(_data).then((response)=>{
                this.props.history.goBack();
                console.log(response)
            })
        }
        else{
            console.log("here update")
            console.log(_data)
            console.log(this.props.match.params.id)
            Artikelaction.update(_data,this.props.match.params.id).then((response)=>{
                this.props.history.goBack();
                console.log(response)
            })
        }

    }
    render(){
        console.log(this.state.data)
        const { editorState } = this.state;
        return(
            <div>
                <h1>Article</h1>
                <div style={{ background: '#fff', padding: 50, minHeight: 280 }}>
                    <Form action="" onSubmit={this.onsubmit.bind(this)}>
                    <div>
                        <Input placeholder="Judul Artikel"  onChange={this.onhandletitile.bind(this)} value={this.state.data.title}/>
                        <br/><br/>
                        <Modals  bannerphoto={this.state.data.bannerphoto}/>
                        <br/><br/>
                        {
                            (this.state.data.category !="")?
                                <div>
                                    {
                                        (this.state.data.category == 1 )?
                                            "Artikel"
                                         :"Kegiatan"
                                    }
                                </div>
                            :""
                        }
                         <Select defaultValue={this.state.data.category}  onChange={this.onhandlekategory.bind(this)}>
                            <Option value=""disabled>Pilih kategori</Option>
                            <Option value={1}>Artikel</Option>
                            <Option value={2}>kegiatan</Option>
                        </Select>
                        <br/><br/>
                        {
                            (this.state.data.tanggal!="")?
                                <div>
                                    {moment(this.state.data.tanggal).lang("id").format('dddd DD-MM-YYYY HH:mm:ss')}
                                </div>
                            :""
                        }
                        <DatePicker placeholder="Tanggal artikel" onChange={this.onhanletanggal.bind(this)} />
                        <br/><br/>
                        <TimePicker placeholder="waktu artikel" defaultOpenValue={moment('00:00', 'HH:mm')}  onChange={this.onhanletime.bind(this)}/>,
                        <br/><br/>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={this.onEditorStateChange.bind(this)}
                        />
                         <textarea
                            style={{display:"none"}}
                            disabled
                    //        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                            />
                                 <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Simpan 
                                </Button>
                    </div>
                    </Form>
                </div>
            </div>
        )
    }
}