import IconButton from '../IconButton';

type BottomBarProps = {
	timeLeft: number;
	reset: () => void;
};
const BottomBar = ({ timeLeft, reset }: BottomBarProps) => {
	return (
		<div className="w-2/4 flex justify-between">
			<div>
				<span>
					{timeLeft} {timeLeft == 1 ? 'second' : 'seconds'}
				</span>
			</div>
			<IconButton alt="reset" icon="reload" onClick={reset} />
		</div>
	);
};

export default BottomBar;
