const
    { Lang } = require('../models/lang'),
    langsHardCoded = require("../config/langs.json");

exports.getLang = async (symbol='en') => {
    const langs = await Lang.find({
        $or:[ 
            {lang: symbol},
            {lang :'en'}
        ]
    });

    const {lang, fields, title} = langs[0];
    
    return { lang, fields, title };
};


//self-invoke seed questions to database :)
(async () => {
    let langsLength = await Lang.find().count();

    if (!langsLength) {
        await Lang.insertMany(langsHardCoded);
    }
})();