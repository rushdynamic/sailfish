import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { connectionConstants } from '../constants';
import type { AppProps } from 'next/app';
import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		initSocket();
	}, []);

	const socket = useRef<Socket>();
	const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);

	const initSocket = () => {
		socket.current = io(connectionConstants.CONNECTION_URI, {
			transports: ['websocket'],
		});
		socket.current.on('connect', () => {
			console.log('Connected to server');
			setIsSocketConnected(true);
		});
	};
	return (
		<div style={{ height: '100vh', overflowY: 'hidden' }}>
			<main className="bg-primary-dark-bg text-primary-dark-text flex flex-col h-full overflow-y-hidden">
				<Component {...pageProps} />
			</main>
			<footer className="w-full flex justify-end">
				<p className="p-4 text-xxs font-mono">
					{isSocketConnected
						? 'Connected to server'
						: 'Waiting for connection...'}
				</p>
			</footer>
		</div>
	);
}
