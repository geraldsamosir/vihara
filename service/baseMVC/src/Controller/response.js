module.exports = new( class Response {
    constructor(){
        this.Response = {
            code : "",
            message: "",
            result : [],
            err : {}   
        }
    }

    /**
     * 
     * @param {String} data from table 
     * @param {Boolean} isauth check for validation password
     * @param {Object} err 
     */
    authResponse(data, isauth , err ){
        //if data null is email flase
        if(data  == null  && err != -1){
            this.Response = {
                code : 403,
                message : "Email or password wrong",
                result : [],
                 err : {
                        errmessage : ""
                 }
            }
        }
        //if err.errmessage -1 your not auth
        else if(err == -1 && data == null && isauth == false ){
            this.Response = {
                code : 403,
                message : "Your not auth or maybe your request false",
                result : [],
                 err : {
                        errmessage : ""
                 }
            }
        }
        else if(isauth ==  false){
             this.Response = {
                code : 403,
                message : "Email or password wrong",
                result : [],
                err : {
                     errmessage : ""
                }
            }
        }   
        else if(data  != null && isauth == true){
              this.Response = {
                  code: "200",
                  message : "Welcome",
                  result :  [data],
                  err : {
                        errmessage : ""
                  }
              }  
        }
        
        //handle for internall server err
        else {
            this.Response = {
                code:"500",
                message:"internal server error",
                result : [],
                err : {
                    errmessage : err.sqlMessage || ""
                 }
            }
        }

        return this.Response

    }

    /**
     * 
     * @param {String} tablename  name alias for message 
     * @param {Boolean} validation  validation from  Joi js
     * @param {Object} err 
     */
    createResponse(tablename,validation,err){
        //created 
        
        if(err == null){
            this.Response = {
                code:"201",
                message:tablename+" Created",
                result : [],
                err : {
                    errmessage :""
                 }
            }
        }
        else{
            if(err.errno == 1062 ){
                this.Response = {
                    code:"409",
                    message : tablename+" exist",
                    result : [],
                    err : {
                        errmessage :err.sqlMessage
                    }
                }
            }
            else  if(err.errno == 1452 ){
                 this.Response = {
                    code:"409",
                    message : "Relation false",
                    result : [],
                    err : {
                        errmessage :err.sqlMessage
                    }
                }
            }

            //validation is get form err.isJoi (Joi)
            else if(validation){
                err.errmessage  = "Maybe you have wrong"
                this.Response = {
                    code:"400",
                    message : "validation err",
                    result : [],
                    err : err
                }   
            }
            else{
                 err.errmessage ="Maybe you have wrong"
                this.Response = {
                    
                    code:"500",
                    message : "internal server error",
                    result : [],
                    err : err
                }
            }

        }
        return this.Response

    }

    /**
     * @param {String} tablename  name alias for message 
     * @param {Boolean || Undefined} validation  validation from  Joi js
     * @param {Object} err 
     */
    updateResponse(tablename,validation,err){
        if(err == null){
            this.Response = {
                code:"200",
                message:tablename+" updated",
                result : [],
                err : {
                        errmessage : ""
                    }
            }
        }
        else if(validation == true){
            err.errmessage ="Maybe you have wrong"
            this.Response = {
                  code:"400",
                  message : "validation err",
                  result : [],
                  err : err
            }
        }

        else if(validation == undefined && err.errno ==1062){
                this.Response = {
                    code:"409",
                    message : tablename+" exist",
                    result : [],
                    err : {
                        errmessage : err.sqlMessage
                    }
                }
        }
        else if(validation == undefined && err.errno ==1452){
                this.Response = {
                    code:"409",
                    message : "Relation false",
                    result : [],
                    err : {
                        errmessage : err.sqlMessage
                    }
                }
        }
        
        else if (validation == undefined && err != null){
            err.errmessage ="Maybe you have wrong"
            this.Response = {
                  code:"400",
                  message : "must use id for update "+tablename,
                  result : [],
                  err : err
            }
        }
        else if(err.errno = err.errno ){
                this.Response = {
                    code:"409",
                    message : tablename+" exist",
                    result : [],
                    err : {
                        errmessage : err.sqlMessage
                    }
                }
        }

        else if(err != null && validation == false){
             err.errmessage ="Maybe you have wrong"
             this.Response = {
                code:"500",
                message:"internal server error",
                result : [],
                err :err
            }
        }
        return this.Response
    }   


    /**
     * 
     * @param {String} tablename  alias table name
     * @param {Object || Array} result  response from db if data delete or not
     * @param {Object} err 
     */
    deleteResponse(tablename ,result,err){

        //get data from table 
        if(result == undefined){
            this.Response = {
                code:"404",
                message:"Deleted "+tablename+" not found",
                result : [],
                err : {
                        errmessage : err.sqlMessage
                    }
            }
        }   
        else if(result != undefined){
            this.Response = {
                code:"200",
                message:tablename+" deleted",
                result : [],
                err : {
                        errmessage : ""
                    }
            }

        }
        else{
            err.errmessage ="Maybe you have wrong"
            this.Response = {
                code : "500",
                message : "internal server error",
                result : [],
                err :err

            }
        }
        return this.Response
    }

    /**
     * 
     * @param {String} tablename  name alias for message 
     * @param {Object} data     data from database 
     * @param {Object} err  
     */
    filterResponse(tablename, data , err){
        //if wrong validation from  Joi will return  undefined
        if(data == undefined){
            this.Response = {
                code : "400",
                message: "please check your request maybe wrong",
                result : [],
                err : {
                        errmessage : err.sqlMessage
                    }
            }
        }
        else if(err == null  && data.length ==0){
            this.Response = {
               code:"404",
                message:tablename+" not found",
                result : [],
                err : {
                        errmessage : ""
                    }
            }
        }

        else if(err == null  && data.length !=0){
            this.Response = {
                code:"200",
                message: tablename,
                result : (data.length != undefined)?data:[data],
                err : {
                        errmessage : ""
                    }
            }
        }
        else{
            err.errmessage ="Maybe you have wrong"
            this.Response = {
                code:"500",
                message:"internal server error",
                result : [],
                err :err
            }
        }
        return this.Response
        
    }
})