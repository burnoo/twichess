import { Button, Box, Form, FormField, Text, TextInput } from 'grommet';
import { useRouter } from 'next/router';
import { twitchUsernameRegex } from '../../../utils/string'

export default function SearchContent() {
  const router = useRouter();

  return <>
    <Text textAlign="center">Check out players currently watching<br />streams:</Text>
    <Form onSubmit={({ value }) => { router.push(`/streamer/${value.streamer.toLowerCase()}`); }}>
      <FormField
        validate={{ regexp: twitchUsernameRegex, message: "Invalid Twitch username" }}
        name="streamer"
      >
        <TextInput placeholder="Enter streamer name" name="streamer" />
      </FormField>
      <Box alignContent="center">
        <Button type="submit" label="Search" alignSelf="center" />
      </Box>
    </Form>
  </>
}