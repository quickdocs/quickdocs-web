import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from "next/router"
import { Heading, Box, Flex, Text, Link } from '@chakra-ui/react'
import DefaultLayout from '../layouts/DefaultLayout'

const Container = (props) => <Box my={5} {...props} />

const ProjectName = ({ children }) => (
  <NextLink href={`/${encodeURIComponent(children)}`} passHref>
    <Link fontWeight="bold" fontSize={["xl", "xl", "2xl", "2xl"]} color="gray.700">{children}</Link>
  </NextLink>
)

const Version = ({ children }) => (
  <Text ml={3}>{children}</Text>
)

const UpstreamURL = ({ children }) => (
  <Link href={children} ml={3} overflow="hidden" textOverflow="ellipsis" fontWeight="bold" color="primary.500">
    {children.replace(/^https?:\/\//, '')}
  </Link>
)

const Description = ({ children }) => (
  children
    ? <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" maxWidth="100%">{children}</Text>
    : <Text color="gray.500">No Description</Text>
)

export default function Search({ keyword, projects = [] }) {
  const title = keyword ? `Search Results for "${keyword}"` : 'Browse Projects'

  return (
    <DefaultLayout title={`${title} | Quickdocs`}
                   description="Documentation Hosting for Common Lisp"
                   globalHeader={{searchBar: { keyword }}}>
      <Heading as="h2" size="lg" mt={3}>{title}</Heading>
      <Container>
        <Flex direction="column" mt={35}>
          {projects.length === 0
            ? (<Box>No projects found</Box>)
            : projects.map(project => (
                <Flex key={`project_${project.name}`} direction="column" mb={5}>
                  <Flex whiteSpace="nowrap" align="center">
                    <ProjectName>{project.name}</ProjectName>
                    <Version>{project.dist_version}</Version>
                    <UpstreamURL>{project.upstream_url}</UpstreamURL>
                  </Flex>
                  <Description>{project.description}</Description>
                </Flex>
              ))}
        </Flex>
      </Container>
    </DefaultLayout>
  )
}

Search.getInitialProps = async (ctx) => {
  const keyword = ctx.query.q || ''
  const res = await fetch(`https://api.quickdocs.org/projects?q=${encodeURIComponent(keyword)}`)
  const json = await res.json()

  return {
    keyword,
    projects: json.items
  }
}