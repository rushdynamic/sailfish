import React from 'react';
import { Button, Text } from '@nextui-org/react';
import styles from './Landing.module.scss';

interface LandingBoxProps {
	isSocketConnected: boolean;
	startMatch: () => void;
}
const Landing = ({ isSocketConnected, startMatch }: LandingBoxProps) => (
	<div className={styles.landingPageBox}>
		<div className={styles.landingPageBoxTaunt}>
			<Text h1 size={70} color="white">
				How fast can you type?
			</Text>
			<Button
				disabled={!isSocketConnected}
				color="gradient"
				onClick={startMatch}
			>
				{isSocketConnected ? 'Start typing' : 'Hold your horses'}
			</Button>
		</div>
	</div>
);

export default Landing;
