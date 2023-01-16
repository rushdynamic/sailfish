import { useState, useEffect } from 'react';

const useCountdown = (start: Boolean, timeInSeconds: number) => {
	const [timeLeft, setTimeLeft] = useState(timeInSeconds);
	const [timerInterval, setTimerInterval] = useState<
		NodeJS.Timer | undefined
	>();
	useEffect(() => {
		if (start) {
			setTimerInterval(
				setInterval(() => setTimeLeft((curTime) => curTime - 1), 1000)
			);
		}
		return () => clearInterval(timerInterval);
	}, [start]);

	useEffect(() => {
		if (timeLeft <= 0) {
			clearInterval(timerInterval);
		}
	}, [timeLeft]);

	return timeLeft;
};

export { useCountdown };
