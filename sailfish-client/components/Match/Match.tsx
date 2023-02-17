import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCountdown } from '../../hooks/useCountdown';
import { matchConstants } from '../../constants';
import Loading from '../Loading';
import BottomBar from './BottomBar';
import Result, { ResultProps } from './Result';
import styles from './Match.module.scss';

const highlightWord = (problemText: string, index: number) => {
	//TODO: correct/incorrect highlight distinction
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

const Match = ({ problemText }: { problemText: string }) => {
	const router = useRouter();
	const [reloading, setReloading] = useState<boolean>(false);
	const problemRef = useRef<any>(null);
	const backdropRef = useRef<any>(null);
	const hlRef = useRef<any>(null);
	const inputRef = useRef<any>(null);
	const [hlText, setHlText] = useState<string>(problemText);
	const [inputText, setInputText] = useState<string>('');
	const [startTimer, setStartTimer] = useState<Boolean>(false);
	const [result, setResult] = useState<ResultProps>();
	const [lastScrollIndex, setLastScrollIndex] = useState<number>(0);
	const { timeLeft, setTimeLeft } = useCountdown(
		startTimer,
		matchConstants.MATCH_DURATION
	);
	const originalWords = problemText.split(' ');

	const resetMatch = () => {
		setReloading(true);
		router.reload();

		// setHlText(problemText);
		// setStartTimer(false);
		// setTimeLeft(matchConstants.MATCH_DURATION);
		// setResult(undefined);
		// setInputText('');
	};

	const handleScrollProblemText = (scroll: any) => {
		backdropRef.current.scrollTop = scroll.target.scrollTop;
	};

	const handleScrollHighlights = (scroll: any) => {
		problemRef.current.scrollTop = scroll.target.scrollTop;
	};

	// When problem text has fully loaded, we stop showing the loading screen
	useEffect(() => {
		if (problemText) setReloading(false);
	}, [problemText]);

	useEffect(() => {
		// If user has started typing and timer has not started yet, start the timer
		if (inputText && !startTimer) {
			setStartTimer(true);
		}

		// Highlight current word
		const curIndex = inputText.split(' ').length - 1;
		if (startTimer) setHlText(highlightWord(problemText, curIndex));

		// Auto-scroll problem text
		if (
			problemRef?.current &&
			curIndex != 0 &&
			curIndex % 30 == 0 &&
			lastScrollIndex != curIndex
		) {
			problemRef.current.scrollTop += 30;
			setLastScrollIndex(curIndex);
		}
	}, [inputText]);

	// End of match
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

	// Autofocus input text field
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return reloading ? (
		<Loading />
	) : (
		<div className={styles.matchBox}>
			{timeLeft === 0 ? (
				<Result
					accuracy={result?.accuracy}
					correctWords={result?.correctWords}
					reset={resetMatch}
				/>
			) : (
				<>
					<div className={styles.container}>
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
							onScroll={handleScrollProblemText}
						/>
						<div
							className={styles.backdrop}
							ref={backdropRef}
							onScroll={handleScrollHighlights}
						>
							<span className={styles.highlights} ref={hlRef} />
						</div>
					</div>
					<input
						ref={inputRef}
						className={styles.inputText}
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
						disabled={timeLeft === 0}
						onPaste={(e: any) => {
							e.preventDefault();
							return false;
						}}
						placeholder="Start typing..."
					/>
					{(inputText || startTimer) && (
						<BottomBar timeLeft={timeLeft} reset={resetMatch} />
					)}
				</>
			)}
		</div>
	);
};

export default Match;
