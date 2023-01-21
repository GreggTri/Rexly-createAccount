import '../styles/globals.css'
import classnames from 'classnames'
import { Roboto } from '@next/font/google'

const roboto = Roboto({
  weight: ['400', '700']
})
function MyApp({ Component, pageProps }) {
  return (
    <main className={classnames('h-full', roboto.className)}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
