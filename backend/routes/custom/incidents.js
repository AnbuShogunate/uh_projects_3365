const express = require('express')
const router = express.Router({ caseSensitive: true })
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.incidentLog.findAll({
        include: [
            {
                model: db.users,
                as: 'createdBy',
                attributes: ['user_id','email','f_name','l_name']
            },
            {
                model: db.users,
                as: 'assignedUser',
                attributes: ['user_id','email','f_name','l_name']
            },
            {
                model: db.incidentType,
                attributes: ['incidentType_id','incidentType_name']
            },
            {
                model: db.incidentStatus,
                attributes: ['incidentStatus_id','incidentStatus_name']
            },
            {
                model: db.incidentUrgency,
                attributes: ['incidentUrgency_id','incidentUrgency_name']
            },
            {
                model: db.locations,
                attributes: ['location_id','location_name']
            },
            {
                model: db.teams,
                attributes: ['team_id','team_name']
            }
        ],
        where: {
            is_resolved: {
                [Op.not]: 'true'
            }
        }
    })
        .then((incidentLog) => {
            res.send(incidentLog)
        })
        .catch((err) => {
            console.log('There was an error querying incidents', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/findall', (req, res, next) => {
    const db = req.app.get('db')

    return db.incidentLog.findAll({
        include: [
            {
                model: db.users,
                as: 'createdBy',
                attributes: ['user_id','email','f_name','l_name']
            },
            {
                model: db.users,
                as: 'assignedUser',
                attributes: ['user_id','email','f_name','l_name']
            },
            {
                model: db.incidentType,
                attributes: ['incidentType_id','incidentType_name']
            },
            {
                model: db.incidentStatus,
                attributes: ['incidentStatus_id','incidentStatus_name']
            },
            {
                model: db.incidentUrgency,
                attributes: ['incidentUrgency_id','incidentUrgency_name']
            },
            {
                model: db.locations,
                attributes: ['location_id','location_name']
            },
            {
                model: db.teams,
                attributes: ['team_id','team_name']
            },
            {
                model: db.resolvedList,
                attributes: ['resolvedList_id','resolvedList_name']
            }
        ]
    })
        .then((incidentLog) => {
            res.send(incidentLog)
        })
        .catch((err) => {
            console.log('There was an error querying incidents', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')

    return db.incidentLog.findAll({
        attributes:['incident_id','incident_name'],
        raw : true,
    })
        .then((incidentLog) => res.send(incidentLog))
        .catch((err) => {
            console.log('There was an error querying incidents', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:incidentID', (req, res, next) => {
    const incident_id = req.params.incidentID
    const db = req.app.get('db')

    return db.incidentLog.find({
        where: {incident_id:incident_id},
        include: [
            {
                model: db.users,
                as: 'createdBy',
                attributes: ['user_id','email','f_name','l_name']
            },
            {
                model: db.users,
                as: 'assignedUser',
                attributes: ['user_id','email','f_name','l_name']
            },
            {
                model: db.incidentType,
                attributes: ['incidentType_id','incidentType_name']
            },
            {
                model: db.incidentStatus,
                attributes: ['incidentStatus_id','incidentStatus_name']
            },
            {
                model: db.incidentUrgency,
                attributes: ['incidentUrgency_id','incidentUrgency_name']
            },
            {
                model: db.locations,
                attributes: ['location_id','location_name']
            },
            {
                model: db.teams,
                attributes: ['team_id','team_name']
            }
        ]
    })
        .then((incidentLog) => {
            res.send(incidentLog)
        })
        .catch((err) => {
            console.log('There was an error querying incidents', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')

    db.incidentLog.create({
        incident_name: req.body.incidentName,
        incidentTypeId: req.body.incidentTypeId,
        incident_description: req.body.incidentDescription,
        incidentUrgencyId: req.body.incidentUrgencyId,
        incident_createdBy: req.body.createdById,
        incident_assignedUser: req.body.assignedToId,
        locationId: req.body.locationId,
        incidentStatusId: req.body.incidentStatusId,
        incident_assignedTeam: req.body.assignedTeamId
    })
        .then((result) => {
            res.json(result.incident_id)
        })
        .catch(err => {
            console.log('There was an error creating a incident', JSON.stringify(err))
            return res.send(err)
        })
})
router.put('/update/:incidentID', (req, res, next) => {
    const db = req.app.get('db')

    db.ticketLog.update({
        incident_name: req.body.incidentName,
        incidentTypeId: req.body.incidentTypeId,
        incident_description: req.body.incidentDescription,
        incidentUrgencyId: req.body.incidentUrgencyId,
        incident_createdBy: req.body.createdById,
        incident_assignedUser: req.body.assignedToId,
        locationId: req.body.locationId,
        incidentStatusId: req.body.incidentStatusId,
        incident_assignedTeam: req.body.assignedTeamId
    }, {
        where: {
            incident_id: req.params.incidentID
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating incident', JSON.stringify(err))
            return res.send(err)
        })
})
router.delete('/delete/:incidentID', (req, res, next) => {
    const incident_id = req.params.incidentID;
    const db = req.app.get('db')

    db.incidentLog.destroy({
        where: { incident_id: incident_id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting incident', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router