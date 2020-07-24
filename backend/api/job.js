/* eslint-disable no-unused-vars */
var express = require('express');
var router = express.Router();
const database = require('../database');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

router.get('/', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (UserData.organisationId == null) { res.send({ 'inOrg': false, }); return; } //Check to make sure the user has an id
    if (UserData.role === "user") { res.send({ 'inOrg': true, 'authorizeRank': false }); return; } //Check to make sure the user has the required rank

    let queryRes = await database.query(`SELECT j.id,j.name jobName,j.description,j.priority,u.name userName, p.printerName 
    FROM job j
    LEFT JOIN (user u, printer p) ON (j.userId = u.id AND j.assignedPrinter = p.id)
    WHERE j.organisationId = ${UserData.organisationId};`)
    res.send({
        'jobs': queryRes
    })

})

router.get('/user', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (UserData.organisationId == null) { res.send({ 'inOrg': false, }); return; } 
    //Check to make sure the user has an id
    let queryRes = await database.query(`SELECT j.id,j.name jobName,j.description,j.priority,u.name userName, p.printerName 
    FROM job j
    LEFT JOIN (user u, printer p) ON (j.userId = u.id AND j.assignedPrinter = p.id)
    WHERE j.organisationId = ${UserData.organisationId} AND j.userId = '${req.UserId}';`)
    res.send({
        'jobs': queryRes
    })
})

router.post('/new', async function(req, res) {
    /**
     * 
     * {
     *  "jobName" string,
     *  "description": string,
     *  "settings" object,
     *  "priority" int
     * }
     */
    
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (UserData.organisationId == null) { res.send({ 'inOrg': false, }); return; } 
    if (!req.body.jobName) { res.send({"success": false, "message": "A job name is needed for success"})}

    let sql = `INSERT INTO job (name, description, settings, priority, userId, organisationId)
    VALUES ("${req.body.jobName}", "${req.body.description}", '${JSON.stringify(req.body.settings)}', ${req.body.priority}, '${req.UserId}', ${UserData.organisationId}  )`
    let response = await database.query(sql);
    
    res.send({
        'success': true,
        'insertedId': response.insertId
    })
})

router.get('/:id/printFile', async function(req, res) {
    
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userName': req.UserId
    })
})

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'printerque',
      acl: 'public-read',
      key: async function (request, file, cb) {
        console.log(file);
        var UserData = await database.getUserData(request.UserId)
        cb(null,  "files/" + UserData.organisationId + "/" + file.originalname);
      }
    })
  }).single('upload');

router.post('/:id/printFile', upload, async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    req.organisationId = UserData.organisationId
    let file = req.file;

    let response = await database.query(`UPDATE job SET fileLocation = '${file.location}' WHERE id = ${req.params.id} AND organisationId = ?`, UserData.organisationId);

    if (response.affectedRows === 1) {
        res.send({
            'success': true
        })
    } else {
        res.send({
            'success': false,
            'message': "Id does not exist"
        })
    }


})

router.delete('/:id', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (!Number.isInteger(req.params.id)) { res.send({ 'success': false, 'message': 'printerId not Integer' }); return; } //Check to make sure the user has an id
    if (UserData.organisationId == null) { res.send({ 'success':false, 'inOrg': false, }); return; } //Check to make sure the user has an id
    if (UserData.role === "user") { res.send({ 'success':false, 'inOrg': true, 'authorizeRank': false }); return; } //Check to make sure the user has the required rank

    let response = await database.query(`DELETE FROM job WHERE id = ${req.params.id} AND organisationId = ${UserData.organisationId}`);
    console.log(response);

    res.send({
        'success': (response.affectedRows === 1) ? true : false,
    })
})

router.delete('/:id/printFile', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data

    res.send({
        'userName': req.UserId
    })
})

router.get('/:id', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (!Number.isInteger(req.params.id)) { res.send({ 'success': false, 'message': 'printerId not Integer' }); return; } //Check to make sure the user has an id
    if (UserData.organisationId == null) { res.send({ 'inOrg': false, }); return; } //Check to make sure the user has an id
    if (UserData.role === "user") { res.send({ 'inOrg': true, 'authorizeRank': false }); return; } //Check to make sure the user has the required rank

    let queryRes = await database.query(`SELECT j.id,j.name jobName,j.description,j.priority,u.name userName, p.printerName, j.settings, j.fileLocation 
    FROM job j LEFT JOIN (user u, printer p) ON (j.userId = u.id AND j.assignedPrinter = p.id)
    WHERE j.organisationId = ${UserData.organisationId} AND j.id = ${req.params.id}`)
    if (queryRes.length !== 1) { res.send({ 'success': false, 'message': 'job does not exits or does not exist in the current organisation' }); return; } //Check to make sure the user has the required rank

    let data = {
        'job': queryRes[0]
    }

    data.job.settings = JSON.parse(data.job.settings);
    res.send(data)

})

module.exports = {router};