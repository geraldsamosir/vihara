export default new class Articles {
    /**
     * 
     * @param {*} filter for url  if get all just send ""
     */

    get(filter){
        return fetch('/api/news/post?'+filter,{method:'GET'})
         .then(response => response.json())
         
    }
    create(data){
        return fetch('/api/news/post',{
             method : "Post",
              headers :{
                        "Content-Type" :"application/json",
                        email : localStorage.email,
                        token :localStorage.token
                    },
            body: JSON.stringify(data)
        })
        .then(response => response.json())

    }
    
    update(data,id){
           return fetch('/api/news/post?id='+id,{
             method : "PUT",
              headers :{
                        "Content-Type" :"application/json",
                        email : localStorage.email,
                        token :localStorage.token
                    },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
    }

    delete(id){
         return fetch('/api/news/post?id='+id ,
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