import { useRouter } from 'next/router';
import { PlayersTable } from "../../../components/streamer/PlayersTable";
import { Box, Grommet } from 'grommet';
import Header from '../../../components/Header';
import theme from '../../../utils/theme'

export default function Page() {
  const router = useRouter()
  const { streamer } = router.query;

  return <Grommet full theme={theme}>
    <Header />
    <Box>
      <PlayersTable streamer={streamer} widget/>
    </Box>
    </Grommet>
}