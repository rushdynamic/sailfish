import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Landing from '../components/Landing';
import Match from '../components/Match/Match';
import { connectionConstants } from '../constants';

export default function Home() {
	useEffect(() => {
		initSocket();
	}, []);

	const socket = useRef<Socket>();
	const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
	const [isMatchStarted, setIsMatchStarted] = useState<boolean>(false);

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
						<Match />
					) : (
						<Landing
							isSocketConnected={isSocketConnected}
							startMatch={startMatch}
						/>
					)}
				</div>
				<footer className="w-full flex justify-end">
					<p className="p-4 text-xs">
						{isSocketConnected
							? 'Connected to server'
							: 'Waiting for connection...'}
					</p>
				</footer>
			</main>
		</>
	);
}
