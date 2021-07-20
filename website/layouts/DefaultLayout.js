import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import GlobalHeader from '../molecules/GlobalHeader'
import GlobalFooter from '../molecules/GlobalFooter'

const MainContent = (props) => (
  <Box px={[10, 10, 10, 100]} py={[5, 5, 5, '25px']} {...props} />
)

export default function DefaultLayout({ title, description, globalHeader, children }) {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <GlobalHeader searchBar={{}} {...globalHeader} />
        <MainContent>
          {children}
        </MainContent>
      </main>

      <GlobalFooter />
    </div>
  )
}
