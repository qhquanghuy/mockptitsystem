const { join } = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;

const app = express();

const { 
	es256Private, 
	es256Public, 
	ethAddress,
	ethPrivate,
	jobNetworkPublic
} = require('./helper/constant')
const EthereumTx = require('ethereumjs-tx')
const PORT = 9098;


const mockUsers = [
	{
		id: "B14DCCN069",
		password: "111111"
	},
	{
		id: "B14DCCN132",
		password: "111111"
	}
]

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors())

app.use(express.static(join(__dirname, 'dist')));


app.get("/eth/address", (req, res) => {
	const arr = [
		{
			ethAddress: ethAddress,
			from: 1543743011
		}
	]
	res.send({addresses: arr})
})

app.get("/cert/revoked", (req, res) => {
	res.send({revoked: []})
})

app.post("/eth/sign", (req, res) => {
	try {
		const deocdedData = jwt.verify(req.body.token, jobNetworkPublic, {algorithms: "ES256"})
		console.log(deocdedData)
		const tx = new EthereumTx(deocdedData)
		tx.sign(Buffer.from(ethPrivate, 'hex'))
		res.send({signed: tx.serialize().toString('hex')})
	} catch (error) {
		res.sendStatus(401)
	}
	
})




app.post('/signin', (req, res) => {

	const users = mockUsers.filter((user) => { return user.id === req.body.email && user.password === req.body.password })
	if (users.length === 0) {
		res.status(404).send("not found user")
	} else {
		const header = { 'Content-Type': 'application/json; charset=utf-8' };
		const url = "http://localhost:8080/api/issuer/verifymember"
		const signature = jwt.sign({ token: req.body.token, id: users[0].id }, es256Private, { algorithm: "ES256" })
		const body = { encoded: signature }
		fetch(url, {
			method: 'post',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		})
			.then(res => res.json())
			.then(json => res.send(json));
	}
	
})


app.get('*', (req, res) => {
	res.sendFile(join(__dirname, '../../public/index.html'));
});




app.listen(PORT, () => console.log('listening on port', PORT));
