import React ,{Component} from  "react"
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,convertFromHTML, convertToRaw, ContentState } from 'draft-js';

import Profileaction from  "../../../client/action/profil"
import renderHTML from 'react-render-html';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import linkState from 'react-link-state';

import {Form , Button, Input , Select,Icon ,Modal}from 'antd'


const Option = Select.Option;



import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

let _images  =""

class Modals extends React.Component {
    constructor(props){
        super(props)
       this.state = { 
            files : [],
            upload :"",
            url :"",
            selected :""
        }
    }

    componentDidMount(){
        this.getdata()
    }
    getdata(){
        fetch("/api/profile/files",{Method :"GET"})
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
          formdata.append("photo",this.state.upload)
         fetch("/api/profile/upload",{
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
        console.log("selected "+name)
        this.setState({
            selected : name
        })
        _images = this.state.url+""+name
    }

    deleteimage(){
         fetch("/api/profile/files?name="+this.state.selected,{
             method: "delete",
             headers :{
                email : localStorage.email,
                token :localStorage.token
             }

         })
        .then(response => response.json())
         .then((response)=>{
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
                <img src={this.state.url+"/"+data} style={{width:"150px",height:"100",margin:"10px"}}
                     onClick={this.selectImage.bind(this,data)}/>
            )
        })
        return (
        <div>
             {
                    (this.props.photo != "")?
                      <div>
                          <img  src={this.props.photo} style={{width:"150px",height:"100",margin:"0px"}}/> 
                          <br/> <br/> 
                           gambar Sebelumnya
                      </div>
                    :""
                }
             <img  src={this.state.url +""+this.state.selected } style={{width:"150px",height:"100px"}} onClick={this.imageclick.bind(this)}/>
             <p className=""> klik gambar untuk memilih gambar dari galeri</p>
            <Button id="getimage" type="primary" onClick={this.showModal.bind(this)} style={{display:"none"}}><Icon type="camera"  />Galeri</Button>
            <Modal
            width={1000}
            title="Galeri Sangha"
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

export default  class Profile extends Component{

    constructor(props){
        super(props)
        this.state = {
            profil : {
                name : "",
                photo:"",
                body :"",
            },
            editorState: ""
        }
    }
     componentDidMount() {
        // let isnew =  Number.isInteger(parseInt(this.props.match.params.id))
        
        // if(isnew == false){
        // }
        // else{
        //     this.getdata(this.props.match.params.id)
            
        // }
         this.getdata(this.props.match.params.id)
        
    }

     getdata(id){
     

     if(id != "news"){
        Profileaction.get("id="+id).then((Response)=>{
                    if(Response.code == 200){
                         const html =  Response.result[0].body
                         const contentBlock =  htmlToDraft(html)
                         const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                         const _editorState = EditorState.createWithContent(contentState);
                        this.setState({
                            profil:{
                                name :Response.result[0].name,
                                photo :Response.result[0].photo, 
                                body : Response.result[0].body
                            },
                             editorState :_editorState
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

    onselectChange(value) {
        console.log(`selected ${value}`);
    }
    onEditorStateChange (editorState) {
        this.setState({
            editorState,
         });
       //  console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))

    };

     onhandlename(e){
         
        this.setState({
            profil :{
                name : e.target.value,
                photo :this.state.profil.photo,
                body : (_images == "" )?this.state.profil.photo :_images,
            }
        })

    }

    onsubmitprofil(e){
        e.preventDefault()
        let _data = {
                name :this.state.profil.name,
                body :  draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
                photo : (_images == "" )?this.state.profil.photo :_images,
        }

        console.log(_data)
        console.log(this.props.match.params.id)
        if(this.props.match.params.id == "news"){
            Profileaction.create(_data).then((response)=>{
                if(response.code == 201){
                    this.props.history.goBack();
                    console.log(response)
                }
            })
        }
        else{
            Profileaction.update(_data,this.props.match.params.id).then((response)=>{
                console.log(response)
                if(response.code == 200){
                    this.props.history.goBack();
                    console.log(response)
                }
            })
        }

    }

    render(){
        const { editorState } = this.state;
        return(
            <div>
                <h1>Profil</h1>
                <div style={{ background: '#fff', padding: 50, minHeight: 280 }}>
                    <Form action="" onSubmit={this.onsubmitprofil.bind(this)}>
                    <div>
                        <Input placeholder="Nama Sangha" type="text" onChange={this.onhandlename.bind(this)} value={this.state.profil.name}/>
                        <br/><br/>
                        <Modals photo={this.state.profil.photo}/>
                        <br/><br/>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={this.onEditorStateChange.bind(this)}
                        />
                         <textarea
                            style={{display:"none"}}
                            disabled
                          //  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                            />
                              <Button
                                    type="primary"
                                    htmlType="submit">
                                Simpan 
                             </Button>
                    </div>
                    </Form>
                </div>
            </div>
        )
    }
}