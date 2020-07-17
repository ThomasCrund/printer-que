/* eslint-disable no-unused-vars */
var express = require('express');
var router = express.Router();
const database = require('../database');

router.get('/', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (UserData.organisationId == null) { res.send({ 'inOrg': false, }); return; } //Check to make sure the user has an id

    var PrinterList = await database.query("SELECT printerName,printerType,currentJobId FROM printer WHERE printer.organisationId = ?", UserData.organisationId);
    

    res.send({
        'success': true,
        'printers': PrinterList
    })
})

router.get('/:id', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (UserData.organisationId == null) { res.send({ 'inOrg': false, }); return; } //Check to make sure the user has an id

    var Printer = await database.query(`SELECT printerName,printerType,currentJobId,settings FROM printer WHERE printer.id = ${req.params.id} AND printer.organisationId = ?`, UserData.organisationId);
    
    console.log(Printer.length);
    if (Printer.length === 0) {res.send({'success':false, 'exists':false}); return;};

    let data = {
        'success': true,
        'printer': Printer[0]
    }

    data.printer.settings = JSON.parse(data.printer.settings);

    res.send(data)      
})

router.put('/:id', async function(req, res) {
    /**
     * {
     *  "printerName": string,
     *  "printerType": string,
     *  "settings": object
     * }
     */
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (UserData.organisationId == null) { res.send({ 'success':false, 'inOrg': false, }); return; } //Check to make sure the user has an id
    if (UserData.role === "user") { res.send({ 'success':false, 'inOrg': true, 'authorizeRank': false }); return; } //Check to make sure the user has the required rank

    if (req.body.printerName) {
        var responseName = await database.query(`UPDATE printer SET printerName = '${req.body.printerName}' WHERE id = ${req.params.id} AND printer.organisationId = ?`, UserData.organisationId)
        //console.log(responseName);
    } 
    if (req.body.printerType) {
        var responseType = await database.query(`UPDATE printer SET printerType = '${req.body.printeType}' WHERE id = ${req.params.id} AND printer.organisationId = ?`, UserData.organisationId)
        //console.log(responseType);
    } 
    if (req.body.settings) {
        var responseSettings = await database.query(`UPDATE printer SET settings = '${JSON.stringify(req.body.settings)}' WHERE id = ${req.params.id} AND printer.organisationId = ?`, UserData.organisationId)
        //console.log(responseSettings);
    } 

    res.send({
        'nameSuccess': ((responseName === undefined ? 0 : responseName.affectedRows) === 1),
        'typeSuccess': ((responseType === undefined ? 0 : responseType.affectedRows) === 1),
        'settingsSuccess': ((responseSettings === undefined ? 0 : responseSettings.affectedRows) === 1),
    })
    
})

router.delete('/:id', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (UserData.organisationId == null) { res.send({ 'success':false, 'inOrg': false, }); return; } //Check to make sure the user has an id
    if (UserData.role === "user") { res.send({ 'success':false, 'inOrg': true, 'authorizeRank': false }); return; } //Check to make sure the user has the required rank

    let response = await database.query(`DELETE FROM printer WHERE id = ${req.params.id} AND printer.organisationId = ?`, UserData.organisationId)

    console.log(response);
    if (response.affectedRows !== 1) { res.send({ 'success':false, 'recordToBeDeleted': false, }); return; }

    res.send({
        'success': true,
    })
})

router.post('/new', async function(req, res) {
    /**
     * {
     *  "printerName": string,
     *  "printerType": string,
     *  "settings": object
     * }
    */
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (UserData.organisationId == null) { res.send({ 'inOrg': false, }); return; } //Check to make sure the user has an id
    if (UserData.role === "user") { res.send({ 'inOrg': true, 'authorizeRank': false }); return; } //Check to make sure the user has the required rank

    let response = await database.query(`INSERT INTO printer (printerName, printerType, settings) VALUES ('${req.body.printerName}', '${req.body.printerType}', '${JSON.stringify(req.body.settings)}')`)
    
    console.log(response);

    res.send({
        'success': true,
        'id': response.insertId
    })
})

router.get('/:id/jobs', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userName': req.UserId
    })
})

module.exports = {router};