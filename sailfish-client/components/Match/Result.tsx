import { matchConstants } from '../../constants';
import KeyButton from '../KeyButton';
import { motion } from 'framer-motion';

type ResultItemProps = {
	fieldName: string;
	fieldValue: string;
};
const ResultItem = ({ fieldName, fieldValue }: ResultItemProps) => {
	return (
		<div className="flex flex-col gap-2 items-center">
			<span className="text-2xl text-orange-400">{fieldName}</span>
			<span className="text-7xl text-gray-200 font-accent">{fieldValue}</span>
		</div>
	);
};

export type ResultProps = {
	correctWords: number | undefined;
	accuracy: number | undefined;
	reset?: () => void;
};
const Result = ({ correctWords, accuracy, reset }: ResultProps) => {
	return (
		<>
			<motion.div
				className="flex gap-5 justify-around border border-orange-400 rounded-md p-5 w-56"
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.8,
					ease: [0, 0.71, 0.2, 1.01],
				}}
			>
				<ResultItem
					fieldName="WPM"
					fieldValue={
						(correctWords || 0) * (60 / matchConstants.MATCH_DURATION) + ''
					}
				/>
				<ResultItem
					fieldName="Accuracy"
					fieldValue={Math.ceil(accuracy || 0) + '%'}
				/>
			</motion.div>
			<KeyButton
				alt="reset-button"
				onClick={reset}
				type="secondary"
				icon="reload"
			>
				Play again
			</KeyButton>
		</>
	);
};

export default Result;
