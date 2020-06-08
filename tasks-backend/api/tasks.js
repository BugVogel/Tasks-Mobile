const moment = require('moment');


module.exports = app => {

    const getTasks = (req, res) => {

        
        const date = req.query.date ? req.query.date : moment().format('YYYY-MM-DD 23:59:59');
      

        app.db('tasks').where({userId: req.user.id})
        .where('estimateAt', '<=', date)
        .orderBy('estimateAt')
        .then(tasks =>   res.json(tasks))
        .catch(err => res.status(400).json(err))


    }

    const save = (req, res) => {

        if(!req.body.desc.trim() ){

            return res.status(400).send('Descrição é um campo obrigatório')
        }

        req.body.userId = req.user.id;

        app.db('tasks')
        .insert(req.body)
        .then( _ => res.status(200).send())
        .catch(err => res.status(400).json(err))
        


    }


    const remove = (req, res) => {

        app.db('tasks').where({id : req.params.id})
        .del()
        .then( rowsDeleted => {
            if(rowsDeleted > 0){
                res.status(200).send()
            }
            else{
                const msg = `Não foi encontrado tasks com id ${req.params.id}`
                res.status(400).send(msg)
            }

        })
        .catch( err => res.status(400).json(err))


    }

    const updateTaskDoneAt = (req, res, doneAt) => {


        app.db('tasks')
        .where({id: req.params.id, userId: req.user.id})
        .update({doneAt})
        .then(res.status(200).send())
        .catch(err => res.status(400).json(err));

    }


    const toggleTask = (req, res) => {

        app.db('tasks')
        .where({id: req.params.id, userId: req.user.id} )
        .first()
        .then( task => {

            if(task){
                
                const doneAt = task.doneAt ? null : new Date();

                updateTaskDoneAt(req, res, doneAt);

                res.status(200).send()

            }
            else{
                const msg = "Id de task inexistente"
                return res.status(400).send(msg)
            }

        })
        .catch(err => res.status(400).json(err))


    }


    return { getTasks , remove, save, toggleTask}


}