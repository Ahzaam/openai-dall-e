// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ apiKey: process.env.OPEN_API_KEY });

const openai = new OpenAIApi(configuration);

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri =
	'mongodb+srv://Ahzam:Yui0b4AFQzTp1apu@cluster0.fpgv2os.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
	const collection = client.db('dalle').collection('users');
	// perform actions on the collection object
});

export default async function handler(req, res) {
	let userid = ObjectId(req.query.user);
	let description = req.query.q;
	console.log(userid);
	let data = await client
		.db('dalle')
		.collection('users')
		.find({ id: 'kfjweugfuwegf' })
		.toArray()
		.catch((err) => {
			console.log(err);
		});
	console.log(userid);
	// if (data.length > 0) {
	// 	if (data[0].count >= data[0].current) {
	// 		// client
	// 		// 	.db('dalle')
	// 		// 	.collection('users')
	// 		// 	.updateOne(
	// 		// 		{ _id: ObjectId(userId) },
	// 		// 		{ $set: { current: data[0].current + 1 } }
	// 		// 	);
	// 		// let response = await openai.createImage({
	// 		// 	prompt: description,
	// 		// 	n: 1,
	// 		// 	size: '256x256',
	// 		// });
	let image_url = 'response.data.data[0].url';
	res.json({ status: 200, imgUrl: image_url });
	// 	} else {
	// 		res.json({ status: 403, msg: 'Limit exceed' });
	// 	}
	// } else {
	// 	res.json({ status: 404, msg: 'User not found' });
	// }
}
