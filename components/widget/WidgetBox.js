import { Box } from 'grommet';
import HtmlHead from '../../components/common/HtmlHead';
import AppGromet from '../common/AppGrommet';

export default function WidgetBox({ children }) {
  return <AppGromet>
    <HtmlHead />
    <Box fill>{children}</Box>
  </AppGromet>
}