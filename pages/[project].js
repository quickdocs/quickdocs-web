import NextLink from 'next/link'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { Heading, Flex, Box, Grid, GridItem, SimpleGrid, Wrap, WrapItem, Text, Link } from '@chakra-ui/react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialOceanic as prismStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import org from 'org'
import DefaultLayout from '../layouts/DefaultLayout'
import { TabSwitch, Tab } from '../molecules/TabSwitch'

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
        <Box className="readme-org" dangerouslySetInnerHTML={{__html: readmeOrgHTML}} />
      </Box>
    )
  }
  return (
    <Box className="readme-inner" whiteSpace="pre-wrap">
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
    <Box className="readme" {...props}>
      <Readme {...readme} />
    </Box>
  )
)

const Dependency = ({name, version, feature}) => (
  <WrapItem pr={5}>
    <Text color="gray.700">{name}</Text>
    {version && <Text ml={2} color="gray.500" whiteSpace="nowrap">version: {version}</Text>}
    {feature && <Text ml={2} color="gray.500" whiteSpace="nowrap">#+{feature}</Text>}
  </WrapItem>
)

const ProjectSystemsSection = ({ providedSystems, ...props }) => (
  <Box mt={5}>
    {providedSystems.map(system => (
      <Flex mb={35} direction={['column', null, null, 'row']} spacing={10} key={`system_${system.name}`}>
        <Box flex="2" pr={10} pb={6}>
          <Heading as="h4" size="md" mb={2}>{system.name}</Heading>
          <Text>{system.description}</Text>
        </Box>
        <Box flex="3">
          <Grid templateColumns="repeat(2, 1fr)" columnGap={2} rowGap={6}>
            {system.version && <GridItem>
              <Heading as="h5" size="sm" fontWeight="semibold" color="gray.600" mb={2}>Version:</Heading>
              {system.version}
            </GridItem>}
            {system.license && <GridItem>
              <Heading as="h5" size="sm" fontWeight="semibold" color="gray.600" mb={2}>License:</Heading>
              {system.license}
            </GridItem>}
            {system.authors && <GridItem colSpan={2}>
              <Heading as="h5" size="sm" fontWeight="semibold" color="gray.600" mb={2}>Authors:</Heading>
              {system.authors.join(', ')}
            </GridItem>}
            {system.maintainers && <GridItem colSpan={2}>
              <Heading as="h5" size="sm" fontWeight="semibold" color="gray.600" mb={2}>Maintainers:</Heading>
              {system.maintainers.join(', ')}
            </GridItem>}
            {system.defsystem_depends_on && system.defsystem_depends_on.length !== 0 && (
              <GridItem colSpan={2}>
                <Heading as="h5" size="sm" fontWeight="semibold" color="gray.600" mb={3}>Defsystem Dependencies:</Heading>
                <Wrap>
                  {system.defsystem_depends_on.map(
                    s => <Dependency {...s} key={`system_${system.name}_defsystem_depends_on_${s.name}`} />)}
                </Wrap>
              </GridItem>)}
            <GridItem colSpan={2}>
              <Heading as="h5" size="sm" fontWeight="semibold" color="gray.600" mb={3}>Dependencies:</Heading>
              <Wrap>
                {system.depends_on && system.depends_on.length !== 0
                  ? system.depends_on.map(s => <Dependency {...s} key={`system_${system.name}_depends_on_${s.name}`} />)
                  : <Text>None</Text>}
              </Wrap>
            </GridItem>
            {system.weakly_depends_on && system.weakly_depends_on.length !== 0 && (
              <GridItem colSpan={2}>
                <Heading as="h5" size="sm" fontWeight="semibold" color="gray.600" mb={3}>Weakly Dependencies:</Heading>
                <Wrap>
                  {system.weakly_depends_on.map(s => <Dependency {...s} key={`system_${system.name}_weakly_depends_on_${s.name}`} />)}
                </Wrap>
              </GridItem>)}
          </Grid>
        </Box>
      </Flex>
    ))}
  </Box>
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

export default function Project({ error, project, tab }) {
  const router = useRouter()
  const { name, dist_version, description, upstream_url, authors, maintainers, licenses, depends_on, required_by, readme, systems } = project || {}
  const [providedSystems, setProvidedSystems] = useState(systems || [])

  if (error) {
    return <ErrorPage statusCode={error.status} />
  }

  return (
    <DefaultLayout title={`${name} | Quickdocs`} description={description}>
      <SimpleGrid columns={[1, 1, 1, 10]} rowGap={5} columnGap={10} templateRows="min-content minmax(0, auto)">
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
          <TabSwitch tab={tab}>
            <Tab name="readme" href={`/${encodeURIComponent(name)}`}>README</Tab>
            <Tab name="systems" href={`/${encodeURIComponent(name)}?tab=systems`}>Provided Systems</Tab>
          </TabSwitch>
          <Box py="15px">
            {tab === 'readme'
              ? <ProjectReadmeSection readme={readme} />
              : <ProjectSystemsSection providedSystems={providedSystems} />}
          </Box>
        </GridItem>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 1, 2]} spacing={10} mt={10}>
        <Box>
          <Heading size="md" as="h2" my={5}>Dependencies ({depends_on.length})</Heading>
          <Wrap>
            {depends_on.map(name => (
              <WrapItem key={`dependencies_${name}`}>
                <NextLink href={`/${encodeURIComponent(name)}`} passHref>
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
  const tab = ctx.query.tab || 'readme'
  const res = await fetch(`https://api.quickdocs.org/projects/${encodeURIComponent(projectName)}`)
  const resSystems = await fetch(`https://api.quickdocs.org/projects/${encodeURIComponent(projectName)}/systems`)
  try {
    const data = await res.json()
    const systemsData = await resSystems.json()
    return {
      project: Object.assign({}, data, {
        systems: systemsData.systems,
      }),
      tab
    }
  } catch (err) {
    if (ctx.res) {
      ctx.res.statusCode = res.status
    }
    return { error: { status: res.status, statusText: res.statusText } }
  }
}
