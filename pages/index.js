import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
	let [src, setSrc] = useState('/dallimage.jpeg');
	let [btnDis, setBtnDis] = useState(false);
	let [imgDescription, setImgDescription] = useState(
		'Dog standing in a feild hand paint'
	);
	function generateImg() {
		const windowUrl = window.location.search;
		const params = new URLSearchParams(windowUrl);
		let userId = params.get('user');
		let description = document.getElementById('description').value;

		if (description !== '') {
			setBtnDis(true);
			fetch(`/api/hello?q=${description}&user=${userId}`)
				.then((res) => res.json())
				.then((data) => {
					setBtnDis(false);
					if (data.status === 200) {
						setImgDescription(description);
						setSrc(data.imgUrl);
					} else {
						alert(data.msg);
					}
				});
		}
	}
	return (
		<div className={styles.container}>
			<Head>
				<title>Dall E</title>
				<meta name="description" content="Dall E Open AI" />
				<link rel="icon" href="/openailogo.png" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <span>Dall E</span>
				</h1>

				<p className={styles.description}>
					Enter a description to generate a image
					{/* <code className={styles.code}>pages/index.js</code> */}
				</p>
				<input
					id="description"
					className={styles.input}
					type={'text'}
					placeholder="Enter Image description"
				/>
				<button
					className={styles.button}
					onClick={generateImg}
					disabled={btnDis}>
					{btnDis ? 'Generating' : 'Generate'}
				</button>
				<div className={styles.grid}>
					<img src={src} className={[styles.img, styles.card].join(' ')} />
					<div className={styles.card}>
						<h2> {imgDescription}</h2>
					</div>
				</div>
			</main>

			<footer className={styles.footer}>
				<a href="https://openai.com" target="_blank" rel="noopener noreferrer">
					Powered by{' '}
					<span className={styles.logo}>
						<Image
							src="/openailogo.png"
							alt="Open AI Logo"
							width={16}
							height={16}
							style={{ marginRight: 10 }}
						/>
					</span>
					Open AI : Built by Ahzam
				</a>
			</footer>
		</div>
	);
}
