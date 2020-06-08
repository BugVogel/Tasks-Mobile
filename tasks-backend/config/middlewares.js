const BodyParser = require('body-parser');
const cors = require('cors'); //Responder requisições de origens diferentes (outras URLs)


module.exports = app =>{

    app.use(BodyParser.json());
    app.use(cors({
        origin: '*'
    }))

}

