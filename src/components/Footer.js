import React from 'react'
import { IconBrandGithub } from '@tabler/icons'
import './../styles/Footer.css'

export default class Footer extends React.Component {
  render () {
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
}
