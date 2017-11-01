export default new class sumbangan {
    /**
     * 
     * @param {*} filter for url  if get all just send ""
     */

    get(filter){
        return fetch('/api/sumbangan?'+filter,{method:'GET'})
         .then(response => response.json())
         
    }
   create(data){
        return fetch('/api/sumbangan',{
            method :"POST",
            headers :{
                        "Content-Type" :"application/json",
                        email : localStorage.email,
                        token :localStorage.token
                    },
            body: JSON.stringify(data)
        })
         .then(response => response.json())

    }
    
    update(){
        
    }

    delete(id){
         return fetch('/api/sumbangan?id='+id ,
                    {
                        method :'delete',
                        headers :{
                            email : localStorage.email,
                            token :localStorage.token
                        },
                    }
                ).then(response => response.json())
    }
}