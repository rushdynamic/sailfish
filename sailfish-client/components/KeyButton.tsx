const defaultPrimaryColor = '#b6eada';
const defaultSecondaryColor = '#fefefe';

type KeyButtonProps = {
	onClick?: () => void;
	children?: React.ReactNode;
	disabled?: boolean;
	primaryColor?: string;
	secondaryColor?: string;
	type?: 'primary' | 'secondary';
};
const KeyButton = ({
	onClick,
	children,
	disabled,
	primaryColor = defaultPrimaryColor,
	secondaryColor = defaultSecondaryColor,
	type = 'primary',
}: KeyButtonProps) => {
	return (
		<button
			className={`border-solid border-2 px-4 py-2 border-[${primaryColor}] 
            hover:bg-[${secondaryColor}] hover:text-gray-600 
            font-mono font-semibold
            ${
							type === 'primary'
								? 'shadow-harsh-primary'
								: 'shadow-harsh-secondary'
						}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default KeyButton;
