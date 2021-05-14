import { Box, Grommet } from 'grommet';
import HtmlHead from '../../components/common/HtmlHead';
import PlayersTable from '../../components/common/PlayersTable';
import AppGromet from '../common/AppGrommet';

export default function Page({ streamer }) {
  return <AppGromet>
    <HtmlHead />
    <Box fill>
      <PlayersTable streamer={streamer} widget/>
    </Box>
    </AppGromet>
}