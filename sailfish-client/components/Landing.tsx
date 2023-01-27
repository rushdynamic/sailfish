import React from 'react';
import KeyButton from './KeyButton';

interface LandingBoxProps {
	isSocketConnected: boolean;
	startMatch: () => void;
}
const Landing = ({ isSocketConnected, startMatch }: LandingBoxProps) => (
	<div className="h-full flex justify-center items-center">
		<div className="flex flex-col items-center justify-center gap-10">
			<h1 className="font-sans text-5xl tracking-tight font-semibold">
				How fast can you type?
			</h1>
			<KeyButton disabled={!isSocketConnected} onClick={startMatch}>
				{isSocketConnected ? 'Start' : 'Hold your horses'}
			</KeyButton>
		</div>
	</div>
);

export default Landing;
