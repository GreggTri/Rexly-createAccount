import '../styles/globals.css'
import { Roboto } from '@next/font/google'

const roboto = Roboto({
  weight: ['400', '700']
})
function MyApp({ Component, pageProps }) {
  return (
    <main class="h-full" className={roboto.className}>
      <Component {...pageProps} />
    </main>
  )

}

export default MyApp
