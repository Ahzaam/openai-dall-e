// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ apiKey: process.env.OPEN_API_KEY });

const openai = new OpenAIApi(configuration);

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.fpgv2os.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
client.connect();

export default async function handler(req, res) {
	console.log();

	let userid = ObjectId(req.query.user.toString());
	let description = req.query.q;

	let data = await client
		.db('dalle')
		.collection('users')
		.findOne({ _id: userid });

	if (data) {
		if (data.count > data.current) {
			client
				.db('dalle')
				.collection('users')
				.updateOne({ _id: userid }, { $set: { current: data.current + 1 } })

				.catch((err) => console.log(err));
			let response = await openai.createImage({
				prompt: description,
				n: 1,
				size: '256x256',
			});
			let image_url = response.data.data[0].url;
			res.json({ status: 200, imgUrl: image_url });
		} else {
			res.json({ status: 403, msg: 'Limit exceed' });
		}
	} else {
		res.json({ status: 404, msg: 'User not found' });
	}
}
