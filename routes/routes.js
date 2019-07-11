module.exports = (app) => {
    const nodemailer = require('../controllers/controller.js');
    

    // Create a new Note
    app.post('/nodemailer', nodemailer.send);
    app.get('/Zoho', nodemailer.getZoho);
    app.post('/Zoho',nodemailer.postZoho);
    app.post('/Zoho1', nodemailer.create1);
    


//     // Retrieve all Notes
//     app.get('/nodemailer', nodemailer.findAll);

//      Retrieve a single Note with noteId
 //    app.get('/nodemailer/:nodemailerId', nodemailer.findOne);

//     // Update a Note with noteId
 //   app.put('/nodemailer/:nodemailerId', nodemailler.update);

//     // Delete a Note with noteId
//     app.delete('/nodemailer/:nodemailerId', nodemailer.delete);
}