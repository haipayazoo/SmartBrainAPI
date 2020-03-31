const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: process.env.POSTGRES_URI
});

const app = express();
app.use(morgan('combined'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('It is working!');
});
app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});
app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
	profile.handleProfileGet(req, res, db);
});
app.put('/image', (req, res) => {
	image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
});

app.listen(3000, () => {
	console.log(`app is running on port 3000`);
});
