import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NextUIProvider>
			<div style={{ height: '100vh', overflowY: 'hidden' }}>
				<Component {...pageProps} />;
			</div>
		</NextUIProvider>
	);
}
