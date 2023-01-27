import React, { useState, useRef, useEffect } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { matchConstants } from '../../constants';
import Result, { ResultProps } from './Result';
import styles from './Match.module.scss';

const highlightWord = (problemText: string, index: number) => {
	const problemTextArr = problemText.split(' ');
	const originalWord = problemTextArr[index];
	const before = problemTextArr.slice(0, index);
	const after = problemTextArr.slice(index + 1, problemTextArr.length - 1);
	return (
		before.join(' ') +
		' ' +
		`<mark>${originalWord}</mark>` +
		' ' +
		after.join(' ')
	);
};

const Match = () => {
	const problemRef = useRef<any>(null);
	const hlRef = useRef<any>(null);
	const problemText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
	const [hlText, setHlText] = useState<string>(problemText);
	const [inputText, setInputText] = useState<string>('');
	const [startTimer, setStartTimer] = useState<Boolean>(false);
	const [result, setResult] = useState<ResultProps>();
	const timeLeft = useCountdown(startTimer, matchConstants.MATCH_DURATION);
	const originalWords = problemText.split(' ');

	useEffect(() => {
		if (inputText && !startTimer) {
			setStartTimer(true);
		}
		const curIndex = inputText.split(' ').length - 1;
		if (startTimer) setHlText(highlightWord(problemText, curIndex));
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

	useEffect(() => {
		if (hlRef.current) hlRef.current.innerHTML = hlText;
	}, [hlText]);

	return (
		<div className={styles.matchBox}>
			{timeLeft === 0 ? (
				<Result
					accuracy={result?.accuracy}
					correctWords={result?.correctWords}
				/>
			) : (
				<>
					<div className={styles.container}>
						<div className={styles.backdrop}>
							<span className={styles.highlights} ref={hlRef} />
						</div>
						<textarea
							readOnly
							rows={5}
							cols={100}
							className={styles.problemText}
							ref={problemRef}
							value={problemText}
							onCopy={(e: any) => {
								e.preventDefault();
								return false;
							}}
						/>
					</div>
					<input
						className={styles.inputText}
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
						disabled={timeLeft === 0}
						onPaste={(e: any) => {
							e.preventDefault();
							return false;
						}}
						placeholder="Start typing..."
						autoFocus
					/>
					{/* TODO: add styles based on state of startTimer */}
					{(inputText || startTimer) && (
						<div>
							<span>Time remaining: </span>
							<span>
								{timeLeft} {timeLeft == 1 ? 'second' : 'seconds'}
							</span>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Match;
