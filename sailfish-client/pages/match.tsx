import MatchBox from '../components/Match/Match';
import { matchConstants } from '../constants';

export const getServerSideProps = async () => {
	const problemKeys = process.env.PROBLEM_WORDS?.split(',');
	const resp = await fetch(
		`${matchConstants.WIKIPEDIA_API_URI}${
			problemKeys &&
			problemKeys[Math.floor(Math.random() * (problemKeys?.length || 0))]
		}`
	);
	const data = await resp.json();
	return {
		props: data,
	};
};

const Match = (data: any) => {
	const cleanProblemText = data.query.pages[
		Object.keys(data.query.pages)[0]
	]?.extract
		?.replace(/(\r\n|\n|\r)/gm, '')
		.replace(/[^\x00-\x7F]/g, '');

	return <MatchBox problemText={cleanProblemText} />
};

export default Match;
