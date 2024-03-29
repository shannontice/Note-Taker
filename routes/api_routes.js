const express = require('express');
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const { v4 } = require('uuid');
const filePath = path.resolve(__dirname, '../db/db.json');


router.get('api/notes', (requestObj, responseObj) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            const notes = JSON.parse(data);
            responseObj.json(notes);
        }
    })
})

router.post('api/notes', async (requestObj, responseObj) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            
            const notes = JSON.parse(data);

            const newNote = {
                title: requestObj.body.title,
                text: requestObj.body.text,
                id: v4()
            };

            notes.push(newNote);


            fs.writeFile(filePath, JSON.stringify(notes), (err) => {
                if (err) {
                    console.log(err)
                }

                responseObj.json(newNote);
            })
        }

    })
})

router.delete('/notes/:id', async (requestObj, responseObj) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        
        const notes = JSON.parse(data);
        const noteID = requestObj.params.id;
        
        // Find the index of the give note ID
        if (noteID !== -1) {
            notes.splice(noteID, 1);
        }

        fs.writeFile(filePath, JSON.stringify(notes), err => {
            if (err) {
                console.log(err);
            }
            else {
                responseObj.send({
                    message: 'User Deleted Successfully!'
                })
            }
        })

        responseObj.send({
            message: 'No user found with this ID'
        })

    })
})

module.exports = router;
