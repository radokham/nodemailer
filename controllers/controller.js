const Nodemailer = require('../models/model.js');
const nodemailer = require("nodemailer");
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    console.log(req.body)
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const nodemailer = new Nodemailer({
        nom: req.body.nom || "Untitled Note",
        email: req.body.email
    });

    // Save Note in the database
    nodemailer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Nodemailer.find()
        .then(nodemailer => {
            res.send(nodemailer);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Nodemailer.findById(req.params.nodemailerId)
        .then(nodemailer => {
            if (!nodemailer) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.nodemailerId
                });
            }
            res.send(nodemailer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.nodemailerId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.nodemailerId
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.email) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Nodemailer.findByIdAndUpdate(req.params.nodemailerId, {
        nom: req.body.nom || "Untitled Note",
        email: req.body.email
    }, { new: true })
        .then(nodemailer => {
            if (!nodemailer) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.nodemailerId
                });
            }
            res.send(nodemailer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.nodemailerId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.nodemailerId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Nodemailer.findByIdAndRemove(req.params.nodemailerId)
        .then(nodemailer => {
            if (!nodemailer) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.nodemailerId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.nodemailerId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.nodemailerId
            });
        });
};

exports.send = function (req, res) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "chessclub471@gmail.com",
            pass: "chessclub1234"
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: " chessclub471@gmail.com", // sender address
        to: "radokham6@gmail.com", // list of receivers
        subject: "Nodemailer", // Subject line
        text: "Hello World?", // plain text body
        html: "<p>connexion ok</p>" // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.sendStatus(200);
    });
};
