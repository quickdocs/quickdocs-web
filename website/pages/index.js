import Head from 'next/head'
import { Flex, Box, Grid, SimpleGrid, Heading, VStack, Wrap, WrapItem, Text, Link } from '@chakra-ui/react'
import GlobalHeader from '../molecules/GlobalHeader'
import GlobalFooter from '../molecules/GlobalFooter'
import SearchBar from '../molecules/SearchBar'
import CategoryButton from '../molecules/CategoryButton'
import styles from '../styles/Home.module.css'

const SearchSection = () => (
  <Flex direction="column" px={[10, 10, 10, 20]} py={[5, 5, 5, 15]}>
    <SearchBar my={[5, 5, 5, 15]} />
    <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
          gap={4} my={5, 5, 5, 25}>
      <CategoryButton>Web development</CategoryButton>
      <CategoryButton>Graphics</CategoryButton>
      <CategoryButton>GUI</CategoryButton>
      <CategoryButton>System & Low-level</CategoryButton>
      <CategoryButton>Testing framework</CategoryButton>
      <CategoryButton>Database</CategoryButton>
      <CategoryButton>Utility Collection</CategoryButton>
      <CategoryButton>Concurrency</CategoryButton>
    </Grid>
  </Flex>
)

const NewProjectsSection = ({ projects }) => (
  <Box>
    <Heading size="md" mb="20px">Newly added projects</Heading>
    <VStack spacing={4} align="stretch" py={2}>
      {projects.map(project => (
        <Box minH="40px" key={`new_project_${project.name}`}>
          <Link fontWeight="bold" color="gray.700">{project.name}</Link>
          <Text color="gray.500">{project.description}</Text>
        </Box>
      ))}
    </VStack>
  </Box>
)

const UpdatedProjectsSection = ({ projects }) => (
  <Box>
    <Heading size="md" mb="20px">Updated projects</Heading>
    <Wrap py={2}>
      {projects.map(project => (
        <WrapItem key={`updated_project_${project.name}`}>
          <Link fontWeight="bold" color="gray.700">{project.name}</Link>
        </WrapItem>
      ))}
    </Wrap>
  </Box>
)

export default function Home({ newProjects, updatedProjects }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Quickdocs</title>
        <meta name="description" content="Documentation Hosting for Common Lisp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GlobalHeader />
        <SearchSection />
        <SimpleGrid columns={[1, 1, 1, 2]} spacing={10} px={[10, 10, 10, 20]}>
          <NewProjectsSection projects={newProjects} />
          <UpdatedProjectsSection projects={updatedProjects} />
        </SimpleGrid>
      </main>

      <GlobalFooter />
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  return {
    newProjects: [
      {
        name: 'cl-megolm',
        description: 'A copy of the python functionality provided as bindings for Olm.',
      },
      {
        name: 'cl-openapi-parser',
        description: 'OpenAPI 3.0.1 and 3.1.0 parser/validator',
      },
      {
        name: 'cl-opencl-utils',
        description: 'OpenCL utility library built on cl-opencl',
      },
      {
        name: 'cl-sse',
        description: 'Use sse-server + a web service to serve SSE events to a browser.',
      },
      {
        name: 'trivial-ed-functions',
        description: 'A simple compatibility layer for *ed-functions*',
      },
      {
        name: 'trivial-inspector-hook',
        description: 'A simple compatibility layer CDR6',
      },
      {
        name: 'webapi',
        description: 'CLOS-based wrapper builder for Web APIs',
      },
      {
        name: 'whirlog',
        description: 'a minimal versioned log structured relational DB',
      },
    ],
    updatedProjects: [
      {
        name: "also-alsa",
      },
      {
        name: "april",
      },
      {
        name: "atomics",
      },
      {
        name: "bdef",
      },
      {
        name: "binding-arrows",
      },
      {
        name: "bp",
      },
      {
        name: "chirp",
      },
      {
        name: "cl+ssl",
      },
      {
        name: "cl-ana",
      },
      {
        name: "cl-collider",
      },
      {
        name: "cl-conllu",
      },
      {
        name: "cl-cxx-jit",
      },
      {
        name: "cl-data-structures",
      },
      {
        name: "cl-environments",
      },
      {
        name: "cl-form-types",
      },
      {
        name: "cl-gamepad",
      },
      {
        name: "cl-gserver",
      },
      {
        name: "cl-heredoc",
      },
      {
        name: "cl-incognia",
      },
      {
        name: "cl-ipfs-api2",
      },
      {
        name: "cl-kraken",
      },
      {
        name: "cl-maxminddb",
      },
      {
        name: "cl-mixed",
      },
      {
        name: "cl-mock",
      },
      {
        name: "cl-murmurhash",
      },
      {
        name: "cl-naive-store",
      },
      {
        name: "cl-ntp-client",
      },
      {
        name: "cl-opencl",
      },
      {
        name: "cl-patterns",
      },
      {
        name: "cl-schedule",
      },
      {
        name: "cl-smt-lib",
      },
      {
        name: "cl-string-generator",
      },
      {
        name: "cl-torrents",
      },
      {
        name: "cl-utils",
      },
      {
        name: "cl-webkit",
      },
      {
        name: "clack-pretend",
      },
      {
        name: "closer-mop",
      },
      {
        name: "cluffer",
      },
      {
        name: "clunit2",
      },
      {
        name: "clx",
      },
      {
        name: "cmd",
      },
      {
        name: "common-lisp-jupyter",
      },
      {
        name: "conium",
      },
      {
        name: "consfigurator",
      },
      {
        name: "core-reader",
      },
      {
        name: "croatoan",
      },
      {
        name: "defmain",
      },
      {
        name: "deploy",
      },
      {
        name: "dexador",
      },
      {
        name: "djula",
      },
      {
        name: "doc",
      },
      {
        name: "easy-routes",
      },
      {
        name: "eclector",
      },
      {
        name: "fiveam-asdf",
      },
      {
        name: "fresnel",
      },
      {
        name: "functional-trees",
      },
      {
        name: "gendl",
      },
      {
        name: "generic-cl",
      },
      {
        name: "gute",
      },
      {
        name: "harmony",
      },
      {
        name: "herodotus",
      },
      {
        name: "hunchentoot-multi-acceptor",
      },
      {
        name: "hyperluminal-mem",
      },
      {
        name: "iolib",
      },
      {
        name: "lack",
      },
      {
        name: "lichat-protocol",
      },
      {
        name: "lichat-tcp-client",
      },
      {
        name: "lispqr",
      },
      {
        name: "markup",
      },
      {
        name: "mcclim",
      },
      {
        name: "md5",
      },
      {
        name: "mito",
      },
      {
        name: "mnas-package",
      },
      {
        name: "mnas-string",
      },
      {
        name: "modularize-interfaces",
      },
      {
        name: "multiposter",
      },
      {
        name: "neural-classifier",
      },
      {
        name: "numerical-utilities",
      },
      {
        name: "nyxt",
      },
      {
        name: "origin",
      },
      {
        name: "osmpbf",
      },
      {
        name: "overlord",
      },
      {
        name: "plot",
      },
      {
        name: "plump",
      },
      {
        name: "portal",
      },
      {
        name: "postmodern",
      },
      {
        name: "py4cl2",
      },
      {
        name: "qlot",
      },
      {
        name: "quilc",
      },
      {
        name: "quri",
      },
      {
        name: "qvm",
      },
      {
        name: "re",
      },
      {
        name: "replic",
      },
      {
        name: "sc-extensions",
      },
      {
        name: "sel",
      },
      {
        name: "serapeum",
      },
      {
        name: "shasht",
      },
      {
        name: "shop3",
      },
      {
        name: "sly",
      },
      {
        name: "smart-buffer",
      },
      {
        name: "special-functions",
      },
      {
        name: "spinneret",
      },
      {
        name: "st-json",
      },
      {
        name: "static-dispatch",
      },
      {
        name: "static-vectors",
      },
      {
        name: "stumpwm",
      },
      {
        name: "sxql",
      },
      {
        name: "tailrec",
      },
      {
        name: "tfeb-lisp-hax",
      },
      {
        name: "tooter",
      },
      {
        name: "trivia",
      },
      {
        name: "trivial-with-current-source-form",
      },
      {
        name: "trucler",
      },
      {
        name: "vellum",
      },
      {
        name: "vk",
      },
      {
        name: "wasm-encoder",
      },
      {
        name: "woo",
      },
      {
        name: "zippy",
      },
    ],
  }
}
