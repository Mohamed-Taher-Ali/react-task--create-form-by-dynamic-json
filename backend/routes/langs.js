const
router = require('express').Router(),
{routerWrapper} = require("../config/helper"),
{ getLang } = require("../controlers/langs");


// params for each router
const params = {
    getLang: ['params.lang']
}


router
.get('/:lang', routerWrapper(getLang, params.getLang));


module.exports = router;