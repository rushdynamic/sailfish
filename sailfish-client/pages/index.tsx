import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Text } from '@nextui-org/react';
import Landing from '../components/Landing';
import Match from '../components/Match';

export default function Home() {
	useEffect(() => {
		setTimeout(() => initSocket(), 1000);
	}, []);

	const socket = useRef<Socket>();
	const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
	const [isFindingMatch, setIsFindingMatch] = useState<boolean>(false);

	const initSocket = () => {
		socket.current = io('http://localhost:3000', { transports: ['websocket'] });
		socket.current.on('connect', () => {
			console.log('Connected to server');
			setIsSocketConnected(true);
		});
	};

	const findMatch = () => {
		setIsFindingMatch(true);
	};

	return (
		<>
			<Head>
				<title>Sailfish</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div className="primary-container">
					{isFindingMatch ? (
						<Match />
					) : (
						<Landing
							isSocketConnected={isSocketConnected}
							findMatch={findMatch}
						/>
					)}
				</div>
				<footer>
					<Text size="$xs" color="white" className="footer-text">
						{isSocketConnected
							? 'Connected to server'
							: 'Waiting for connection...'}
					</Text>
				</footer>
			</main>
		</>
	);
}
