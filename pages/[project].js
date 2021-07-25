import NextLink from 'next/link'
import { Heading, Flex, Box, Grid, GridItem, SimpleGrid, Wrap, WrapItem, Text, Link } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import DefaultLayout from '../layouts/DefaultLayout'

const ProjectHeader = ({ name, distVersion }) => (
  <Flex align="center">
    <Heading>{name}</Heading>
    <Text fontSize="lg" color="gray.500" ml={5}>{distVersion}</Text>
  </Flex>
)

const Readme = ({ filename, content }) => {
  if (!filename) {
    return null;
  }
  else if (filename.match(/\.(markdown|md)/)) {
    return (
      <Text className="readme">
        <Text fontWeight="semibold">{filename}</Text>
        <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} disallowedElements={['script', 'iframe', 'link', 'style', 'embed', 'applet']} children={content} />
      </Text>
    )
  }
  return (
    <Text className="readme" whiteSpace="pre-wrap">
      <Text fontWeight="semibold">{filename}</Text>
      {children}
    </Text>
  )
}

const ProjectDescriptionSection = ({ description }) => (
  <Box>
    <Text whiteSpace="pre-line">{description}</Text>
  </Box>
)

const ProjectReadmeSection = ({ readme, ...props }) => (
  readme && <Box overflow="hidden" {...props}><Readme filename={readme.filename} content={readme.content} /></Box>
)

const ProjectMetadataSection = ({ upstreamUrl, authors, maintainers, licenses, ...props }) => (
  <SimpleGrid columns={[1, 2, 2, 1]} gap={[5, 5, 5, 10]} alignContent="start" {...props}>
    <GridItem>
      <Heading as="h3" size="md" mb={2}>Upstream URL</Heading>
      <Box>
        <NextLink href={upstreamUrl} passHref>
          <Link fontWeight="semibold" color="primary.500">{upstreamUrl.replace(/^https?:\/\//, '').replace(/\.git$/, '')}</Link>
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
  const { name, dist_version, description, upstream_url, authors, maintainers, licenses, depends_on, required_by, readme } = project
  return (
    <DefaultLayout title={`${name} | Quickdocs`} description={description}>
      <SimpleGrid columns={[1, 1, 1, 10]} rowGap={5} columnGap={10}>
        <GridItem colSpan={[1, 1, 1, 10]}>
          <ProjectHeader name={name} distVersion={dist_version} />
        </GridItem>
        <GridItem colSpan={[1, 1, 1, 7]}>
          <ProjectDescriptionSection description={description || 'No Description'} />
        </GridItem>
        <GridItem colSpan={[1, 1, 1, 3]} rowSpan={[1, 1, 1, 2]}>
          <ProjectMetadataSection upstreamUrl={upstream_url} authors={authors} maintainers={maintainers} licenses={licenses} />
        </GridItem>
        <GridItem colSpan={[1, 1, 1, 7]}>
          <ProjectReadmeSection readme={readme} />
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
