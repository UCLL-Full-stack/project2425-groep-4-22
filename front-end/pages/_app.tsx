import '@styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { appWithTranslation, AppWithTranslation } from 'next-i18next'
 
const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default appWithTranslation(App)