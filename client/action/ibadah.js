export default new class Ibadah {
    /**
     * 
     * @param {*} filter for url  if get all just send ""
     */

    get(filter){
        return fetch('/api/ibadah?'+filter,{method:'GET'})
         .then(response => response.json())
         
    }
    create(data){
        return fetch('/api/ibadah',{
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
         return fetch('/api/ibadah?id='+id ,
                    {
                        method :'delete',
                        headers :{
                            "Content-Type" :"application/json",
                            email : localStorage.email,
                            token :localStorage.token
                        },
                    }
                ).then(response => response.json())
    }
}