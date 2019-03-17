const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

let originsAccepted = [ 'http://localhost:8080', 'http://localhost:4200', 'https://shares-233708.appspot.com', 'http://shares-233708.appspot.com', 'https://20190316t211204-dot-shares-233708.appspot.com', 'http://20190316t211204-dot-shares-233708.appspot.com'];

const Countrycodes = require('./src/countrycodes');
const Faresbyflight = require('./src/faresbyflight');
//Mongodb Connection Detail
const mongoose = require('mongoose');
const mongoConnectionString = `mongodb+srv://ea-user_01:01_user-ea@clustera-dcqt0.gcp.mongodb.net/eacloud?retryWrites=true`;
mongoose.connect(mongoConnectionString); // process.MONGOOSE = mongoose.connect(mongoConnectionString);
var mConnect = mongoose.connection;
const {Schema} = mongoose;
const {objectId} = Schema;
mConnect.on('connected', () => console.log('Connected'));
mConnect.on('disconnected', () => console.log('Disconnected'));
mConnect.on('error', () => console.log('Error'));
mConnect.once('open', () => {
    console.log('Connection Open');
});
process.on('SIGINT', () => {
    mConnect.close(() => {
        console.log('Mongoose Connection Closed');
        process.exit(0);
    });
});

app.get('/', (req, res) => {
    res.send({'Success': 'You are connected'});
});

app.get('/countrycodes', (req, res) => {
    getAll(Countrycodes, req, res);
});

app.get('/faresbyflight', (req, res) => {
    getAll(Faresbyflight, req, res);
});
// Get All document by collection name
function getAll(document, req, res) {
    if(document) {
        document.find().exec().then(resp => {
            res.send(resp);
        }).catch(err => console.log(err));
    }
}

//Get Country detail by _id
app.get('/countrycodes/:aid', (req, res) => {
    Avengers.findById(req.params.aid).exec().then(resp => {
        if(resp)    res.send(`${resp._id} - ${resp.name} - ${resp.nickname}`);
        else    res.send(`No Document Found`);
    }).catch(err => res.send(`Error Conecting To Country Codes`));
});

app.use(cors({
    origin : (origin, callback) => {
        if(!origin) 
            return callback(null, true);

        if(originsAccepted.indexOf(origin) === -1) 
            return callback('You are not supposed utilize this service', false);

        return callback(null, true);
    }
}));
app.listen(port, () => console.log(`Example app listening on port ${port} - ${__dirname}`) );