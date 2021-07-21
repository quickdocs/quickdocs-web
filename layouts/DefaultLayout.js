import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import GlobalHeader from '../molecules/GlobalHeader'
import GlobalFooter from '../molecules/GlobalFooter'

const MainContent = (props) => (
  <Box px={[8, 10, 10, 50]} py={[8, 8, 8, '35px']} maxW="1200px" mx="auto" {...props} />
)

export default function DefaultLayout({ title, description, globalHeader, children }) {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
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
