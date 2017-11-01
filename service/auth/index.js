const  Express =  require('express') 

const App =  Express()

App.disable('x-powered-by');


const {usersApi , rolesApi} = require('./api')

App.use('/users',usersApi)

App.use('/roles', rolesApi)

module.exports = {
    usersApi : App    
}