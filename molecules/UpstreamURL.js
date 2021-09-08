import { Link } from '@chakra-ui/react'
import Image from 'next/image'
import { HStack, Center } from '@chakra-ui/react'
import githubIcon from '../public/github-32px.png'
import gitlabIcon from '../public/gitlab.png'

const GitHubUpstreamURL = ({ username, repository, ...props }) => (
  <Link href={`https://github.com/${username}/${repository}`} fontWeight="semibold" opacity={0.6} {...props}>
    <HStack spacing={1}>
      <Center><Image src={githubIcon} alt="GitHub" width="20px" height="20px" /></Center>
      <Center>{username}/{repository}</Center>
    </HStack>
  </Link>
)

const GitLabUpstreamURL =({ url, username, repository, ...props }) => (
  <Link href={url} fontWeight="semibold" opacity={0.6} {...props}>
    <HStack spacing={0}>
      <Center><Image src={gitlabIcon} alt="GitLab" width="26px" height="26px" /></Center>
      <Center>{username}/{repository}</Center>
    </HStack>
  </Link>
)

const UpstreamURL = ({ children, ...props }) => {
  const matches = (children || '').match(/(github\.com|gitlab\.com|gitlab\.common-lisp\.net)\/([^\/]+)\/([^\/\.]+)/)
  if (matches) {
    if (matches[1] === 'github.com') {
      return <GitHubUpstreamURL username={matches[2]} repository={matches[3]} {...props} />
    }
    else if (matches[1] === 'gitlab.com' || matches[1] === 'gitlab.common-lisp.net') {
      return <GitLabUpstreamURL url={children} username={matches[2]} repository={matches[3]} {...props} />
    }
  }
  return <div></div>
}

export default UpstreamURL
