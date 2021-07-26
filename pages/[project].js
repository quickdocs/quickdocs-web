import NextLink from 'next/link'
import ErrorPage from 'next/error'
import { Heading, Flex, Box, Grid, GridItem, SimpleGrid, Wrap, WrapItem, Text, Link } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialOceanic as prismStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import org from 'org'
import DefaultLayout from '../layouts/DefaultLayout'

const ProjectHeader = ({ name, distVersion }) => (
  <Flex align="center">
    <Heading size="lg">{name}</Heading>
    <Text size="lg" color="gray.500" ml={[3, 3, 3, 5]} whiteSpace="nowrap">{distVersion}</Text>
  </Flex>
)

const components = {
  code({node, inline, className, children, ...props}) {
    const match = /language-([\w-]+)/.exec(className || '')
    const language = match && (match[1] === 'common-lisp' ? 'lisp' : match[1])
    return !inline && language ? (
      <SyntaxHighlighter style={prismStyle}
                         language={language}
                         customStyle={{padding: 0, margin: 0, borderRadius: '4px'}} {...props}>
        {String(children).replace(/\n+$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }
}

const Readme = ({ filename, content }) => {
  if (!filename) {
    return null;
  }
  else if (filename.match(/\.(markdown|md)/)) {
    return (
      <Box className="readme-inner">
        <Text fontWeight="semibold">{filename}</Text>
        <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} disallowedElements={['script', 'iframe', 'link', 'style', 'embed', 'applet']} components={components}>{content}</ReactMarkdown>
      </Box>
    )
  }
  else if (filename.match(/\.org$/)) {
    const parser = new org.Parser()
    const orgDocument = parser.parse(content)
    const orgDocumentConverted = orgDocument.convert(org.ConverterHTML, { headerOffset: 0, suppressAutoLink: true })
    const readmeOrgHTML = orgDocumentConverted.title !== 'Untitled'
      ? orgDocumentConverted.title + orgDocumentConverted.contentHTML
      : orgDocumentConverted.contentHTML
    return (
      <Box className="readme-inner">
        <Text fontWeight="semibold">{filename}</Text>
        <Box className="readme-org" dangerouslySetInnerHTML={{__html: readmeOrgHTML}} />
      </Box>
    )
  }
  return (
    <Box className="readme-inner" whiteSpace="pre-wrap">
      <Text fontWeight="semibold">{filename}</Text>
      {content}
    </Box>
  )
}

const ProjectDescriptionSection = ({ description }) => (
  <Box>
    <Text whiteSpace="pre-line">{description}</Text>
  </Box>
)

const ProjectReadmeSection = ({ readme, ...props }) => (
  readme && (
    <Box className="readme" px="25px" py="15px" mx={["-25px", "-25px", 0]} {...props}>
      <Readme filename={readme.filename} content={readme.content} />
    </Box>
  )
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

export default function Project({ error, ...project }) {
  if (error) {
    return <ErrorPage statusCode={error.status} />
  }

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
  try {
    const data = await res.json()
    return data
  } catch (err) {
    if (ctx.res) {
      ctx.res.statusCode = res.status
    }
    return { error: { status: res.status, statusText: res.statusText } }
  }
}
