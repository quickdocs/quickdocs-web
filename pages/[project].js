import NextLink from 'next/link'
import { Heading, Flex, Box, Grid, GridItem, SimpleGrid, Wrap, WrapItem, Text, Link } from '@chakra-ui/react'
import DefaultLayout from '../layouts/DefaultLayout'

const ProjectHeader = ({ name, distVersion }) => (
  <Flex align="center">
    <Heading>{name}</Heading>
    <Text fontSize="lg" color="gray.500" ml={5}>{distVersion}</Text>
  </Flex>
)

const ProjectDescriptionSection = ({ description }) => (
  <Box>
    <Text whiteSpace="pre-line">{description}</Text>
  </Box>
)

const ProjectMetadataSection = ({ upstreamUrl, authors, maintainers, licenses }) => (
  <SimpleGrid columns={1} gap={10}>
    <GridItem>
      <Heading as="h3" size="md" mb={2}>Upstream URL</Heading>
      <Box>
        <NextLink href={upstreamUrl} passHref>
          <Link fontWeight="bold" color="primary.500">{upstreamUrl.replace(/^https?:\/\//, '')}</Link>
        </NextLink>
      </Box>
    </GridItem>
    {authors.length !== 0 && <GridItem>
      <Heading as="h3" size="md" mb={2}>Author</Heading>
      <Box>{authors.join(', ')}</Box>
    </GridItem>}
    {maintainers.length !== 0 && <GridItem>
      <Heading as="h3" size="md" mb={2}>Maintainer</Heading>
      <Box>{maintainers.join(', ')}</Box>
    </GridItem>}
    <GridItem>
      <Heading as="h3" size="md" mb={2}>License</Heading>
      <Box>{licenses.length === 0 ? <Text color="gray.500">Not determined</Text> : licenses.join(', ')}</Box>
    </GridItem>
  </SimpleGrid>
)

export default function Project(project) {
  const { name, dist_version, description, upstream_url, authors, maintainers, licenses, depends_on, required_by } = project
  return (
    <DefaultLayout title={`${name} | Quickdocs`}
                   description="Documentation Hosting for Common Lisp">
      <SimpleGrid columns={[1, 1, 1, 10]} w="100%" gap={5}>
        <GridItem colSpan={[1, 1, 1, 10]}>
          <ProjectHeader name={name} distVersion={dist_version} />
        </GridItem>
        <GridItem colSpan={[1, 1, 1, 7]}>
          <ProjectDescriptionSection description={description} />
        </GridItem>
        <GridItem colSpan={[1, 1, 1, 3]} mt={[5, null, null, 0]}>
          <ProjectMetadataSection upstreamUrl={upstream_url} authors={authors} maintainers={maintainers} licenses={licenses} />
        </GridItem>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 1, 2]} spacing={10} mt={10}>
        <Box>
          <Heading size="md" as="h2" my={5}>Dependencies ({depends_on.length})</Heading>
          <Wrap>
            {depends_on.map(name => (
              <WrapItem key={`dependencies_${name}`}>
                <NextLink href={`/${encodeURIComponent(name)}`}>
                  <Link fontWeight="bold" color="gray.700">{name}</Link>
                </NextLink>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <Box>
          <Heading size="md" as="h2" my={5}>Dependents ({required_by.length})</Heading>
          <Wrap>
            {required_by.map(name => (
              <WrapItem key={`dependents_${name}`}>
                <NextLink href={`/${encodeURIComponent(name)}`}>
                  <Link fontWeight="bold" color="gray.700">{name}</Link>
                </NextLink>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </SimpleGrid>
    </DefaultLayout>
  )
}

Project.getInitialProps = async (ctx) => {
  const projectName = ctx.query.project
  const res = await fetch(`https://api.quickdocs.org/projects/${encodeURIComponent(projectName)}`)
  return await res.json()
}
