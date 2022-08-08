import axios from 'axios'

export const getChannelStatistics = async (channelId: string) => {
	const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
	if (!API_KEY) {
		throw new Error('Youtube API key is not defined')
	}

	const url = `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`

	const { data } = await axios.get(url)

	if (!data || !data.items || !data.items[0]) {
		throw new Error('Data not found')
	}

	return data.items[0].statistics
}
