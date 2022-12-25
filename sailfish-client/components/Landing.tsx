import React from 'react';
import { Button, Text } from '@nextui-org/react';

interface LandingBoxProps {
	isSocketConnected: boolean;
	findMatch: () => void;
}
const Landing = ({ isSocketConnected, findMatch }: LandingBoxProps) => (
	<div className="landing-page__box">
		<div className="landing-page__box-taunt">
			<Text h1 size={70} color="white">
				How fast can you type?
			</Text>
			<Button
				disabled={!isSocketConnected}
				color="gradient"
				onClick={findMatch}
			>
				{isSocketConnected ? 'Find a match' : 'Hold your horses'}
			</Button>
		</div>
	</div>
);

export default Landing;
