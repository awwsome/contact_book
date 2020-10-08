/* eslint-disable no-console */
// var express = require('express');
// var mongoose = require('mongoose');
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();

// DB setting
mongoose.set('useNewUrlParser', true); // 1
mongoose.set('useFindAndModify', false); // 1
mongoose.set('useCreateIndex', true); // 1
mongoose.set('useUnifiedTopology', true); // 1
mongoose.connect(process.env.MONGO_DB); // 2
const db = mongoose.connection; // 3

db.once('open', () => { console.log('DB connected'); });
db.on('error', (err) => { console.log('DB ERROR : ', err); });

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Schema
const contactSchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String },
        phone: { type: String },
    },
);
const Contact = mongoose.model('contact', contactSchema);

// Routes
app.get('/', (req, res) => {
    res.redirect('/contacts');
});
app.get('/contacts', (req, res) => {
    Contact.find({}, (err, contacts) => {
        if (err) return res.json(err);
        res.render('contacts/index', { contacts });
    });
});
app.get('/contacts/new', (req, res) => {
    res.render('contacts/new');
});

app.post('/contacts', (req, res) => {
    Contact.create(req.body, (err, contact) => {
        if (err) return res.json(err);
        res.redirect('/contacts');
    });
});

// Port setting
const port = 3000;
app.listen(port, () => {
    console.log(`server on! http://localhost:${port}`);
});
