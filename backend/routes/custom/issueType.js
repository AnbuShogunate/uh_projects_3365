const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.issueType.findAll({
        include: [
            db.issueCategory
            ]
    })
        .then((issueType) => res.send(issueType))
        .catch((err) => {
            console.log('There was an error querying issueType', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')
    const whereStatement = {};
    if(req.query.issueCategoryId) {whereStatement.issueCategoryId = req.query.issueCategoryId}

    return db.issueType.findAll({
        attributes:['issueType_id','issueType_name'],
        where: whereStatement
    })
        .then((issueType) => res.send(issueType))
        .catch((err) => {
            console.log('There was an error querying issueType', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const description_text = req.body.description
    const name_text = req.body.name
    const db = req.app.get('db')
    db.issueType.create({
        issueType_description: description_text,
        issueType_name: name_text
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error updating issueType', JSON.stringify(err))
        return res.send(err)
    })
})

router.put('/update', (req, res, next) => {
    //update departments

    const issueType_id = req.body.id
    const issueType_names = req.body.name
    const description_text = req.body.description
    const db = req.app.get('db')

    //console.log(req.body.id)
    //console.log(req.body.name)
    //console.log(req.body.description)
    //console.log(JSON.stringify(req.body))

    db.issueType.update({
        issueType_description: description_text,
        issueType_name: issueType_names
        }, {
            where: {
            issueType_id: issueType_id
            }
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating issueType', JSON.stringify(err))
            return res.send(err)
    })
})

router.delete('/delete/:issueType_id', (req, res, next) => {
    //delete departments
    const id = req.params.issueType_id;
    const db = req.app.get('db')

    db.issueType.destroy({
        where: { issueType_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting issueType', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router