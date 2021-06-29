import { Heading, Box } from 'grommet';
import { useStreamerSWR } from '../../utils/client/streamer-swr';
import WidgetBox from './WidgetBox';

export default function AvgWidget({ streamer }) {
  const { data, error } = useStreamerSWR(streamer);
  const rating = error && "error" || !data && "..." || (data?.avgViewersRating ?? "?")

  return <WidgetBox>
    <Box align="center">
      <Heading level="3">{rating}</Heading>
    </Box>
  </WidgetBox>
}