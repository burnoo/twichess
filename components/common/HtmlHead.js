import Head from 'next/head';

export default function HtmlHead() {
  return <Head>
    <title>twichess</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
    <link rel="preload" href="https://lichess1.org/assets/_0dhxZ8/font/lichess.woff2" as="font" type="font/woff2" crossOrigin="anonymous"></link>
  </Head>
}