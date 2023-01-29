import IconButton from '../IconButton';
import { motion } from 'framer-motion';

type BottomBarProps = {
	timeLeft: number;
	reset: () => void;
};
const BottomBar = ({ timeLeft, reset }: BottomBarProps) => {
	return (
		<motion.div
			className="w-2/4 flex justify-between"
			initial={{ y: -25 }}
			animate={{ y: 0 }}
		>
			<div>
				<span>
					{timeLeft} {timeLeft == 1 ? 'second' : 'seconds'}
				</span>
			</div>
			<IconButton alt="reset" icon="reload" onClick={reset} />
		</motion.div>
	);
};

export default BottomBar;
