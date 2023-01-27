import { matchConstants } from '../../constants';
import KeyButton from '../KeyButton';

type ResultItemProps = {
	fieldName: string;
	fieldValue: string;
};
const ResultItem = ({ fieldName, fieldValue }: ResultItemProps) => {
	return (
		<div className="flex flex-col gap-2 items-center">
			<span className="text-2xl text-orange-400">{fieldName}</span>
			<span className="text-gray-300">{fieldValue}</span>
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
			<div className="flex justify-between border border-orange- rounded-md p-5 w-56">
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
			</div>
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
