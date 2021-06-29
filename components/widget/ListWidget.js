import PlayersTable from '../common/PlayersTable';
import WidgetBox from './WidgetBox';

export default function ListWidget({ streamer }) {
  return <WidgetBox>
    <PlayersTable streamer={streamer} widget />
  </WidgetBox>
}