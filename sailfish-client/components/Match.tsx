import React, { useState, useRef, useEffect } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import styles from './Match.module.scss';

const Match = () => {
	const textRef = useRef<any>(null);
	const problemText = `Lorem Ipsum is simply dummy text of the printing and typesetting
	industry. Lorem Ipsum has been the industry's standard dummy text ever
	since the 1500s, when an unknown printer took a galley of type and
	scrambled it to make a type specimen book. It has survived not only five
	centuries, but also the leap into electronic typesetting, remaining
	essentially unchanged. It was popularised in the 1960s with the release
	of Letraset sheets containing Lorem Ipsum passages, and more recently
	with desktop publishing software like Aldus PageMaker including versions
	of Lorem Ipsum.`;
	const [inputText, setInputText] = useState<string>('');
	const [startTimer, setStartTimer] = useState<Boolean>(false);
	const timeLeft = useCountdown(startTimer, 5);

	useEffect(() => {
		if (inputText) {
			setStartTimer(true);
		}
	}, [inputText]);
	return (
		<div className={styles.matchBox}>
			<textarea
				readOnly
				rows={5}
				cols={100}
				className={styles.problemText}
				ref={textRef}
				value={problemText}
			/>
			<input
				className={styles.inputText}
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				disabled={timeLeft === 0}
			/>
			<div>
				<span>Time remaining: </span>
				<span>{timeLeft}</span>
			</div>
		</div>
	);
};

export default Match;
