import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from "next/router"
import { Heading, Box, Flex, Text, Link } from '@chakra-ui/react'
import DefaultLayout from '../../layouts/DefaultLayout'

const ProjectName = ({ children }) => (
  <NextLink href={`/${encodeURIComponent(children)}`} passHref>
    <Link fontWeight="bold" fontSize={["xl", "xl", "2xl", "2xl"]} color="gray.700">{children}</Link>
  </NextLink>
)

const Version = ({ children }) => (
  <Text color="gray.500" ml={3}>{children}</Text>
)

const UpstreamURL = ({ children, ...props }) => (
  <Link href={children} ml={5} overflow="hidden" textOverflow="ellipsis" fontWeight="semibold" color="primary.500" {...props}>
    {children.replace(/^https?:\/\//, '').replace(/\.git$/, '')}
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
      <Heading as="h2" size="lg">{title}</Heading>
      <Flex direction="column" mt={30}>
        {projects.length === 0
          ? (<Box>No projects found</Box>)
          : projects.map(project => (
              <Flex key={`project_${project.name}`} direction="column" mb={5}>
                <Flex whiteSpace="nowrap" align="center">
                  <ProjectName>{project.name}</ProjectName>
                  <Version>{project.dist_version}</Version>
                  <UpstreamURL display={['none', 'none', 'inline']}>{project.upstream_url}</UpstreamURL>
                </Flex>
                <Description>{project.description}</Description>
              </Flex>
            ))}
      </Flex>
      {keyword && keyword.length !== 0 && (
        <Box mt={5}>
          <Link href={`https://github.com/search?l=Common+Lisp&q=${encodeURIComponent(keyword)}&type=Repositories`}
                fontWeight="semibold" color="primary.500">
            Search other &quot;{keyword}&quot; projects on GitHub
          </Link>
        </Box>)}
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
