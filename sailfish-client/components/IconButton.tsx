import Image from 'next/image';

const getIconPath = (key: string, isDark: boolean) =>
	'/icons/' + key + (isDark ? '-dark' : '-lite') + '.svg';

type IconButtonProps = {
	alt: string;
	onClick: () => void;
	icon: string;
	height?: number;
	width?: number;
	isDark?: boolean;
};
const IconButton = ({
	alt,
	icon,
	onClick,
	height = 16,
	width = 16,
	isDark = false,
}: IconButtonProps) => {
	return (
		<Image
			className="cursor-pointer"
			priority
			alt={alt}
			src={getIconPath(icon, isDark)}
			onClick={onClick}
			height={height}
			width={width}
		/>
	);
};

export default IconButton;
