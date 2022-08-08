import { Box, createStyles, MantineProvider } from '@mantine/core'
import { ChannelStaticstics } from './module/channel-statistics'

const styles = createStyles((theme) => ({
	root: {
		minHeight: '100vh',
		background: theme.fn.linearGradient(45, '#FF0000', '#c91c1c'),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}))

function App() {
	const { classes } = styles()
	return (
		<MantineProvider
			withNormalizeCSS
			withGlobalStyles
			theme={{ fontFamily: 'Inter' }}
		>
			<div className='App'>
				<Box className={classes.root}>
					<ChannelStaticstics />
				</Box>
			</div>
		</MantineProvider>
	)
}

export default App
