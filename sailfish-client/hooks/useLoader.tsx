import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const useLoader = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleChangeStart = (url: string) => {
		if (url !== router.asPath) setIsLoading(true);
	};

	const handleChangeComplete = (url: string) => {
		if (url !== router.asPath) setIsLoading(false);
	};

	useEffect(() => {
		router.events.on('routeChangeStart', handleChangeStart);
		router.events.on('routeChangeComplete', handleChangeComplete);

		return () => {
			router.events.off('routeChangeStart', handleChangeStart);
			router.events.off('routeChangeComplete', handleChangeComplete);
		};
	}, []);

	return { isLoading };
};

export default useLoader;
