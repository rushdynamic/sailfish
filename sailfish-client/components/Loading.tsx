import Image from 'next/image';
import { motion } from 'framer-motion';

const Loading = () => {
	return (
		<motion.div
			className="w-full h-full flex justify-center items-center"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: 0.8,
				ease: [0, 0.71, 0.2, 1.01],
			}}
		>
			<Image src="/pacman-loader.svg" alt="loading" height={150} width={150} />
		</motion.div>
	);
};

export default Loading;
