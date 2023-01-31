import '../styles/globals.css'
import classnames from 'classnames'
import Head from 'next/head'
import { Roboto } from '@next/font/google'

const roboto = Roboto({
  weight: ['400', '700']
})
function MyApp({ Component, pageProps }) {
  return (
    <main className={classnames('h-full', roboto.className)}>
      <Head>
        <title>Rexly - create Account</title>
        <link rel="icon" type="image/png" href="/images/RexlyIcon.png"/>
      </Head>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
