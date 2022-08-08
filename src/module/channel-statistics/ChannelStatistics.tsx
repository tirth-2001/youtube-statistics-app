import { useCallback, useState } from 'react'
import {
	Badge,
	Box,
	Button,
	Card,
	createStyles,
	Group,
	Stack,
	Text,
	TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Confetti from 'react-confetti'
import { ChannelAPI } from '../../api'
import { ChannelService } from '../../services/channel'
import { toast } from 'react-toastify'

export interface ChannelStatsData {
	viewCount: string
	subscriberCount: string
	videoCount: string
}

const styles = createStyles((theme) => ({
	card: {
		minHeight: '50vh',
		minWidth: '50vw',
		margin: theme.spacing.xl,
		transition: 'all 1s ease-in',
	},
	button: {
		// alignItems: 'center',
	},
	results: {
		border: `1px solid red`,
		padding: theme.spacing.md,
		marginBlock: theme.spacing.sm,
		borderRadius: theme.radius.md,
		boxShadow: '0px 1px 10px rgba(0,0,0,0.5)',
		transition: 'all 1s ease-in',
	},
}))

export const ChannelStaticstics: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState<ChannelStatsData | null>(null)
	const [confettiCount, setConfettiCount] = useState(0)
	const { classes } = styles()

	const form = useForm({
		initialValues: {
			channelId: '',
		},
	})

	const handleSubmit = useCallback(async (values: { channelId: string }) => {
		try {
			setIsLoading(true)
			const id = ChannelService.getChannelId(values.channelId)
			const stats = await ChannelAPI.getChannelStatistics(id)
			setData(stats)
			setConfettiCount(500)
			await new Promise((resolve) => setTimeout(resolve, 1000))
			setConfettiCount(0)
		} catch (error) {
			console.error(error)
			toast((error as Error).message, { type: 'error' })
		} finally {
			setIsLoading(false)
		}
	}, [])

	const handleReset = useCallback(() => {
		form.reset()
		setData(null)
	}, [form])

	return (
		<Box>
			<Confetti numberOfPieces={confettiCount} tweenDuration={4000} />
			<Card className={classes.card} shadow='lg' radius='xl' p={'lg'}>
				<Stack spacing='xl'>
					<Text align='center' size='xl'>
						Channel Statistics
					</Text>
					<Text size='md'>Enter Channel ID to fetch statistics</Text>
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<Stack spacing='lg'>
							<TextInput
								required
								label='Channel ID/URL'
								placeholder='Enter your channel ID'
								{...form.getInputProps('channelId')}
							/>
							<Group position='center' mt='md'>
								<Button
									color={'red'}
									type='submit'
									variant='filled'
									fullWidth={false}
									className={classes.button}
									loading={isLoading}
									loaderPosition='right'
								>
									Get Results
								</Button>
								{!!data && (
									<Button
										className={classes.button}
										fullWidth={false}
										color={'gray'}
										variant='outline'
										onClick={handleReset}
									>
										Reset
									</Button>
								)}
							</Group>
						</Stack>
					</form>
					{data && (
						<Box className={classes.results}>
							<Group>
								<Badge color='red' variant='outline' sx={{ flex: 1 }}>
									Videos
								</Badge>
								<Text sx={{ flex: 2 }}>{data?.videoCount}</Text>
							</Group>
							<Group>
								<Badge color='red' variant='outline' sx={{ flex: 1 }}>
									Subscribers
								</Badge>
								<Text sx={{ flex: 2 }}>{data?.subscriberCount}</Text>
							</Group>
							<Group>
								<Badge color='red' variant='outline' sx={{ flex: 1 }}>
									Views
								</Badge>
								<Text sx={{ flex: 2 }}>{data?.viewCount}</Text>
							</Group>
						</Box>
					)}
				</Stack>
			</Card>
		</Box>
	)
}
