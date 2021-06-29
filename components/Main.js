import HtmlHead from './common/HtmlHead';
import { Grid, Box } from 'grommet';
import AppGrommet from './common/AppGrommet';
import Navigation from './navigation/Navigation';

export default function Main({ children, isSignedIn }) {
  return <AppGrommet>
    <HtmlHead />
    <Grid
      fill
      rows={['auto', 'flex']}
      columns={['auto', 'flex']}
      areas={[
        { name: 'header', start: [0, 0], end: [1, 0] },
        { name: 'main', start: [1, 1], end: [1, 1] },
      ]}
    >
      <Box
        gridArea="header"
        direction="row"
        align="center"
        justify="between"
        pad={{ horizontal: 'medium', vertical: 'small' }}
        background="dark-1"
      >
        <Navigation isSignedIn={isSignedIn}/>
      </Box>
      <Box gridArea="main">
        {children}
      </Box>
    </Grid>
  </AppGrommet>
}