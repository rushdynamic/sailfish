import type { AppProps } from 'next/app';
import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div style={{ height: '100vh', overflowY: 'hidden' }}>
			<Component {...pageProps} />;
		</div>
	);
}
