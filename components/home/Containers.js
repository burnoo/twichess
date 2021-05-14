import { Box } from 'grommet';
import { GuestContent, LinkedContent, LoggedInContent, UnlinkedContent} from './content/UserContent';
import SearchContent from './content/SearchContent';

function HomeContainer({ color, children }) {
  return <Box
    pad="large"
    align="center"
    background={color}
    round
    gap="small"
    flex={false}
  >
    {children}
  </Box>
}

export function UserContainer({ user }) {
  return <HomeContainer color="light-4">
    {!user && <GuestContent />}
    {user && !user.lichess && <>
      <LoggedInContent name={user.name} />
      <UnlinkedContent />
    </>}
    {user && user.lichess && <>
      <LoggedInContent name={user.name} />
      <LinkedContent lichess={user.lichess} />
    </>}
  </HomeContainer>
}

export function SearchContainer() {
  return <HomeContainer color="dark-2">
    <SearchContent />
  </HomeContainer>
}

