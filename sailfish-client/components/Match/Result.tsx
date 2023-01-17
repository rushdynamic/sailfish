import { matchConstants } from '../../constants';

export type ResultProps = {
	correctWords: number | undefined;
	accuracy: number | undefined;
};

const Result: React.FC<ResultProps> = ({ correctWords, accuracy }) => {
	if (correctWords)
		return (
			<>
				<div>
					<span>WPM: </span>
					<span>{correctWords * (60 / matchConstants.MATCH_DURATION)}</span>
				</div>
				<div>
					<span>Accuracy: </span>
					<span>{Math.ceil(accuracy || 0)}%</span>
				</div>
			</>
		);
	else return <div />;
};

export default Result;
