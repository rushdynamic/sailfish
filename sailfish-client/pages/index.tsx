import Head from 'next/head';
import { useState } from 'react';
import Landing from '../components/Landing';

export default function Home(data: any) {
	const [isMatchStarted, setIsMatchStarted] = useState<boolean>(false);

	const startMatch = () => setIsMatchStarted(true);

	return (
		<>
			<Head>
				<title>Sailfish</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="h-full">
				<Landing startMatch={startMatch} />
			</div>
		</>
	);
}
