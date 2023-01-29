import React from 'react';
import KeyButton from './KeyButton';
import { motion } from 'framer-motion';

interface LandingBoxProps {
	isSocketConnected: boolean;
	startMatch: () => void;
}
const Landing = ({ isSocketConnected, startMatch }: LandingBoxProps) => (
	<div className="h-full flex justify-center items-center">
		<div className="flex flex-col items-center justify-center gap-10">
			<motion.h1
				className="font-sans text-5xl tracking-tight font-extrabold"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				How fast can you type?
			</motion.h1>
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.8,
					delay: 0.5,
					ease: [0, 0.71, 0.2, 1.01],
				}}
			>
				<KeyButton
					alt="start-button"
					disabled={!isSocketConnected}
					onClick={startMatch}
					icon="start"
				>
					{isSocketConnected ? 'Start' : 'Hold your horses'}
				</KeyButton>
			</motion.div>
		</div>
	</div>
);

export default Landing;
