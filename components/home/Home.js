import { Box, Button, Form, FormField, Text, TextInput, ThemeContext } from 'grommet';
import Main from '../Main';
import { SearchContainer, UserContainer } from './Containers'

export default function Home({ user }) {
  return <Main isSignedIn={user}>
    <ThemeContext.Extend
      value={{
        global: {
          breakpoints: {
            custom: {
              value: 830
            }
          }
        },
        box: { responsiveBreakpoint: "custom" }
      }}
    >
      <Box
        direction="row-responsive"
        justify="center"
        align="center"
        fill={true}
        pad="medium"
        gap="medium"
      >
        <UserContainer user={user}/>
        <SearchContainer />
      </Box>
    </ThemeContext.Extend>
  </Main>
}