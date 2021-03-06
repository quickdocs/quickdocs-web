import NextLink from 'next/link'
import { Flex, Box, Grid, SimpleGrid, Heading, VStack, Wrap, WrapItem, Text, Link } from '@chakra-ui/react'
import SearchBar from '../molecules/SearchBar'
import CategoryButton from '../molecules/CategoryButton'
import DefaultLayout from '../layouts/DefaultLayout'

const SearchSection = () => (
  <Flex direction="column">
    <Heading size="lg" as="h2" align="center" mb={[3, 3, 4, 6]}>Find Common Lisp libraries <Text display={[null, null, null, 'inline']}>shipped by Quicklisp</Text></Heading>
    <SearchBar my={[5, 5, 5, 15]} />
    <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
          gap={4} my={5, 5, 5, 25}>
      <NextLink href="/-/search?q=web" passHref>
        <CategoryButton>Web development</CategoryButton>
      </NextLink>
      <NextLink href="/-/search?q=graphics" passHref>
        <CategoryButton>Graphics</CategoryButton>
      </NextLink>
      <NextLink href="/-/search?q=GUI" passHref>
        <CategoryButton>GUI</CategoryButton>
      </NextLink>
      <NextLink href="/-/search?q=system+programming" passHref>
        <CategoryButton>System & Low-level</CategoryButton>
      </NextLink>
      <NextLink href="/-/search?q=test" passHref>
        <CategoryButton>Testing framework</CategoryButton>
      </NextLink>
      <NextLink href="/-/search?q=database" passHref>
        <CategoryButton>Database</CategoryButton>
      </NextLink>
      <NextLink href="/-/search?q=utilities" passHref>
        <CategoryButton>Utility Collection</CategoryButton>
      </NextLink>
      <NextLink href="/-/search?q=concurrency" passHref>
        <CategoryButton>Concurrency</CategoryButton>
      </NextLink>
    </Grid>
  </Flex>
)

const NewProjectsSection = ({ projects }) => (
  <Box>
    <Heading size="md" my="20px">Newly added projects</Heading>
    <VStack spacing={4} align="stretch" py={2}>
      {projects.map(project => (
        <Box key={`new_project_${project.name}`}>
          <NextLink href={`/${encodeURIComponent(project.name)}`} passHref>
            <Link fontWeight="bold" color="gray.700">{project.name}</Link>
          </NextLink>
          <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" color="gray.500">{project.description}</Text>
        </Box>
      ))}
    </VStack>
  </Box>
)

const UpdatedProjectsSection = ({ projects }) => (
  <Box>
    <Heading size="md" my="20px">Updated projects</Heading>
    <Wrap py={2}>
      {projects.map(project => (
        <WrapItem key={`updated_project_${project.name}`}>
          <NextLink href={`/${encodeURIComponent(project.name)}`} passHref>
            <Link fontWeight="bold" color="gray.700">{project.name}</Link>
          </NextLink>
        </WrapItem>
      ))}
    </Wrap>
  </Box>
)

export default function Home({ newProjects, updatedProjects }) {
  return (
    <DefaultLayout title="Quickdocs"
                   description="Documentation Hosting for Common Lisp"
                   globalHeader={{searchBar: false}}>
      <SearchSection />
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={10}>
        <NewProjectsSection projects={newProjects} />
        <UpdatedProjectsSection projects={updatedProjects} />
      </SimpleGrid>
    </DefaultLayout>
  )
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.quickdocs.org/')
  const json = await res.json()
  return {
    newProjects: json.new_projects,
    updatedProjects: json.updated_projects,
  }
}
