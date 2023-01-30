import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Landing from '../components/Landing';
import Match from '../components/Match/Match';
import { matchConstants } from '../constants';
import { connectionConstants } from '../constants';

export const getServerSideProps = async () => {
	const problemKeys = process.env.PROBLEM_WORDS?.split(',');
	const resp = await fetch(
		`${matchConstants.WIKIPEDIA_API_URI}${
			problemKeys &&
			problemKeys[Math.floor(Math.random() * (problemKeys?.length || 0))]
		}`
	);
	const data = await resp.json();
	return {
		props: data,
	};
};

export default function Home(data: any) {
	useEffect(() => {
		initSocket();
	}, []);

	const socket = useRef<Socket>();
	const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
	const [isMatchStarted, setIsMatchStarted] = useState<boolean>(false);
	const cleanProblemText = data.query.pages[
		Object.keys(data.query.pages)[0]
	]?.extract
		?.replace(/(\r\n|\n|\r)/gm, '')
		.replace(/[^\x00-\x7F]/g, '');

	const initSocket = () => {
		socket.current = io(connectionConstants.CONNECTION_URI, {
			transports: ['websocket'],
		});
		socket.current.on('connect', () => {
			console.log('Connected to server');
			setIsSocketConnected(true);
		});
	};

	const startMatch = () => {
		setIsMatchStarted(true);
	};

	return (
		<>
			<Head>
				<title>Sailfish</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="bg-primary-dark-bg text-primary-dark-text flex flex-col h-full overflow-y-hidden">
				<div className="h-full">
					{isMatchStarted ? (
						<Match problemText={cleanProblemText} />
					) : (
						<Landing
							isSocketConnected={isSocketConnected}
							startMatch={startMatch}
						/>
					)}
				</div>
				<footer className="w-full flex justify-end">
					<p className="p-4 text-xxs font-mono">
						{isSocketConnected
							? 'Connected to server'
							: 'Waiting for connection...'}
					</p>
				</footer>
			</main>
		</>
	);
}
