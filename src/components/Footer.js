import { IconBrandGithub } from '@tabler/icons'
import './../styles/Footer.css'

const Footer = () => {
  return (
    <footer>
      <a
        href='https://github.com/gabesenacom/cv-project'
        rel='noreferrer'
        target='_blank'
      >
        <IconBrandGithub />
        See our repository
      </a>
    </footer>
  )
}

export default Footer
