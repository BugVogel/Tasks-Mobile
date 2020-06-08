const {authSecret} = require('../.env');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');



module.exports = app => {

    const signin = async (req, res) => {

        if(!req.body.email || !req.body.password){ //Verificação de preenchimento
            res.status(400).send('Dados não preenchidos')
            return
        } 

        const user = await app.db('users').whereRaw('LOWER(email) = LOWER(?)', req.body.email).first(); //Requisição 
        
        if(user){

            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {

                if(err || !isMatch){
                    
                    res.status(401).send('Senha incorreta');
                    return
                }

            const payload = {id: user.id};
            res.json({
                name: user.name,
                email: user.email,
                token: jwt.encode(payload, authSecret)

            }) 


            })



        }
        else{
            res.status(400).send('Usuário não cadastrado');
        }



    }

    return {signin};


}