import Image from 'next/image';
import { useState } from 'react';

const defaultPrimaryColor = '#b6eada';

const getIconPath = (key: string, isHover: boolean) =>
	'/icons/' + key + (isHover ? '-dark' : '-lite') + '.svg';

type KeyButtonProps = {
	alt: string;
	onClick?: () => void;
	children?: React.ReactNode;
	disabled?: boolean;
	primaryColor?: string;
	secondaryColor?: string;
	type?: 'primary' | 'secondary';
	icon?: string;
};
const KeyButton = ({
	alt,
	onClick,
	children,
	primaryColor = defaultPrimaryColor,
	type = 'primary',
	icon,
}: KeyButtonProps) => {
	const [isHover, setIsHover] = useState<boolean>(false);
	return (
		<div
			className={
				'border-solid border-2 px-4 py-2 border-[' +
				primaryColor +
				'] hover:bg-[#fefefe] hover:text-gray-600 font-mono font-semibold cursor-pointer flex gap-4 items-center justify-center ' +
				(type === 'primary' ? 'shadow-harsh-primary' : 'shadow-harsh-secondary')
			}
			onClick={onClick}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			{icon && (
				<Image
					priority
					src={getIconPath(icon, isHover)}
					height={14}
					width={14}
					alt={alt}
				/>
			)}
			<span>{children}</span>
		</div>
	);
};

export default KeyButton;
