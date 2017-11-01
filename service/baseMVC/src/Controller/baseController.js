const   ResponseController   = require("./response")

const {Catcherr}  = require("*Catcherr")

const Jwt = require('jwt-simple');


module.exports =    class baseController {


    /**this method handle for  filter data from  client
     * 
     * note  : this method is parrent for controller child class
     *         if want to use this method must extend to child controller class
     * 
     * @param {*} req request from client
     * @param {*} res response for client
     */
   async  get (req,res){
        const  Model  =   require(req.headers.modelpath)        
        let params =  req.query;
        let filter_field =  req.headers.filter_field || "created_at"
        let filter_type =  req.headers.filter_type || "ASC"
        let data,err;
        [err,data] = await  Catcherr(Model.findAll(params,{withRelated:req.headers.related},filter_field,filter_type))
        if(data != undefined){
            data =  data.toJSON()
                data  = data.map((data)=>{
                    req.headers.privatefield.map((_data)=>{
                        delete data[_data]
                    })
                return data
            })
        }
      
        let response =  ResponseController.filterResponse(req.headers.message,data,err)
        res.status(response.code)
        res.json(response)
        res.end()
    }


    /**this method handle for  create new data  from  client
     * 
     * note  : this method is parrent for controller child class
     *         if want to use this method must extend to child controller class
     * 
     * @param {*} req request from client
     * @param {*} res response for client
     */
    async create(req,res){
        const  Model  =   require(req.headers.modelpath )
        let data = req.body;
        let result,err;
        [err,result]  = await Catcherr (Model.create(data))
        let response =  ResponseController.createResponse(req.headers.message,(err != null)?err.isJoi:false , err)  
        res.status(response.code)
        res.json(response)
        res.end()       
    }

    /**this method handle for  update data from  client 
     * 
     * note  : *)this method is parrent for controller child class
     *           if want to use this method must extend to child controller class
     *         *) for update must use parameter id for get the last data 
     * 
     * @param {*} req request from client
     * @param {*} res response for client
     */
    async update(req,res){
        const  Model  =   require(req.headers.modelpath )
        let params = req.query
        let dataupdated = req.body;
        let result ,err ;
        [err,result] =  await Catcherr(new Model(params).save(dataupdated, {method:'update'}))
        let response =  ResponseController.updateResponse(req.headers.message,(err != null)?err.isJoi:false ,err)
        res.set(response.code)
        res.json(response)
        res.end()
    }

        /**this method handle for  delete daata from  client
     * 
     * note  : this method is parrent for controller child class
     *         if want to use this method must extend to child controller class
     * 
     * @param {*} req request from client
     * @param {*} res response for client
     */
    async delete(req,res){
         const  Model  =   require(req.headers.modelpath )
        let params  = req.query;
        let result , err ,data ;
        [err, data]  =  await Catcherr( Model.forge(params).fetch())        
        if(data != null){
            [err, result] = await  Catcherr( Model.destroy(params));
        }
        let response  = ResponseController.deleteResponse(req.headers.message,result,err)
        res.status(response.code)
        res.json(response)
        res.end()
    }

}