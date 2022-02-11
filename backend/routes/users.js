const
{
    addUser,
    checkUserName,
} = require('../controlers/users'),
router = require('express').Router(),
{routerWrapper} = require("../config/helper")


// params for each router
const params = {
    addUser: ['body'],
    checkUserName: ['params.name']
}


router
.post('/', routerWrapper(addUser, params.addUser))
.get('/checkUserName/:name', routerWrapper(checkUserName, params.checkUserName))


module.exports = router;