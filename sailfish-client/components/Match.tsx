import React, { useState, useRef, useEffect } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import styles from './Match.module.scss';

type ResultProps = {
	correctWords: number | undefined;
	accuracy: number | undefined;
};
const Result: React.FC<ResultProps> = ({ correctWords, accuracy }) => {
	if (correctWords)
		return (
			<>
				<div>
					<span>WPM: </span>
					<span>{correctWords * 6}</span>
				</div>
				<div>
					<span>Accuracy: </span>
					<span>{Math.ceil(accuracy || 0)}%</span>
				</div>
			</>
		);
	else return <div />;
};

const Match = () => {
	const textRef = useRef<any>(null);
	const problemText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
	const [inputText, setInputText] = useState<string>('');
	const [startTimer, setStartTimer] = useState<Boolean>(false);
	const [result, setResult] = useState<ResultProps>();
	const timeLeft = useCountdown(startTimer, 10);
	const originalWords = problemText.split(' ');

	useEffect(() => {
		if (inputText && !startTimer) {
			setStartTimer(true);
		}
	}, [inputText]);

	useEffect(() => {
		if (timeLeft === 0) {
			setStartTimer(false);
			let curIndex = 0;
			let correctWords = 0;
			inputText?.split(' ').forEach((word) => {
				if (word === originalWords[curIndex]) {
					correctWords++;
				}
				curIndex++;
			});
			setResult({
				correctWords: correctWords,
				accuracy: (correctWords / inputText?.split(' ')?.length) * 100,
			});
		}
	}, [timeLeft]);

	return (
		<div className={styles.matchBox}>
			<textarea
				readOnly
				rows={5}
				cols={100}
				className={styles.problemText}
				ref={textRef}
				value={problemText}
				onCopy={(e: any) => {
					e.preventDefault();
					return false;
				}}
			/>
			<input
				className={styles.inputText}
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				disabled={timeLeft === 0}
				onPaste={(e: any) => {
					e.preventDefault();
					return false;
				}}
			/>
			{/* TODO: add styles based on state of startTimer */}
			<div>
				<span>Time remaining: </span>
				<span>
					{timeLeft} {timeLeft == 1 ? 'second' : 'seconds'}
				</span>
			</div>
			<Result accuracy={result?.accuracy} correctWords={result?.correctWords} />
		</div>
	);
};

export default Match;
