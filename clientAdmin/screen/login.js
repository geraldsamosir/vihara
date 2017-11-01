import React ,{Component} from  "react"
import {Form ,Input,Icon,Button} from "antd"

import { toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


export default  class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email :"",
            password : "",
        }
    }

    _dologin(e){
        e.preventDefault();
        fetch("/api/usercore/users/auth",{
                method :"POST",
               headers :{
                        "Content-Type" :"application/json",
                    },
            body: JSON.stringify(this.state)
        })
         .then((response )=>{
             if(response.status == 200){
                console.log(response)
                let token = response.headers.getAll("token")[0]
                localStorage.setItem("token",token)
               
             }
          
         })

         
          fetch("/api/usercore/users/auth",{
                method :"POST",
               headers :{
                        "Content-Type" :"application/json",
                    },
            body: JSON.stringify(this.state)
        })
         .then(response => response.json())
         .then((response )=>{
             if(response.code == 200){
                localStorage.setItem("email",response.result[0].email)
                window.location.href = "/auth/#/"
                window.location.reload()
             }
             else{
                 console.log("here")
                 toast("Email atau password salah",{
                     className :'red-toast',
                     autoClose:'5000'
                 });

             }
          
         })
          


    }

    handleemail(e){
        this.setState({
            email : e.target.value
        })
    }

    handlepassword(e){
         this.setState({
            password : e.target.value
        })
    }

    render(){
        return(
           <div>
                <h1>Login</h1>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Form  className="login-form" onSubmit={this._dologin.bind(this)}>
                          <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="email" onChange={this.handleemail.bind(this)} />
                           <br/><br/>
                          <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" onChange={this.handlepassword.bind(this)} />    
                          <br/><br/>
                          <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form>
                     <ToastContainer 
                            position="top-right"
                            type="default"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            pauseOnHover
                        />
                </div>
            </div>
        )
    }
}