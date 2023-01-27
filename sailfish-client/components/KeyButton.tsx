const defaultPrimaryColor = '#b6eada';
const defaultSecondaryColor = '#fefefe';

type KeyButtonProps = {
	onClick: () => void;
	children?: React.ReactNode;
	disabled?: boolean;
	primaryColor?: string;
	secondaryColor?: string;
};
const KeyButton = ({
	onClick,
	children,
	disabled,
	primaryColor = defaultPrimaryColor,
	secondaryColor = defaultSecondaryColor,
}: KeyButtonProps) => {
	return (
		<button
			className={`border-solid border-2 px-4 py-2 border-[${primaryColor}] 
            hover:bg-[${secondaryColor}] hover:text-gray-600 
            font-mono shadow-harsh-primary font-semibold`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default KeyButton;
