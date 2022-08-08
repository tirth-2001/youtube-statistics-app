export const getChannelId = (channelUrl: string) => {
	if (channelUrl.includes('/channel/')) {
		return channelUrl.split('/channel/')[1]
	} else {
		return channelUrl
	}
}
