import Link from 'next/link';
import { signIn, signOut } from 'next-auth/client';
import { Layer, Text, Nav, Anchor } from 'grommet';
import React from 'react';

function LichessPermissionsAnchor() {
  const [show, setShow] = React.useState();
  return (
    <>
      <Anchor
        href="javascript:;"
        onClick={() => setShow(true)}
        size="small"
        weight="normal"
      >
        Lichess Permissions
      </Anchor>
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
          onClick={() => setShow(false)}
        >
          <Text margin="medium">
            Although the site currently only saves user rankings, we also collect challenge and tournament permissions in advance for future functionalities.
          </Text>
        </Layer>
      )}
    </>
  );
}

export default function Navigation({ isSignedIn }) {
  return <>
    <Link href="/" size="large"><Text style={{ cursor: 'pointer' }}>twichess</Text></Link>
    <Nav direction="row">
      <LichessPermissionsAnchor />
      <Anchor label={isSignedIn ? "Logout" : "Login"} onClick={() => { isSignedIn ? signOut() : signIn('twitch') }} />
    </Nav>
  </>
}