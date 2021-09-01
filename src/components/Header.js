import React from 'react'
import { IconUser } from '@tabler/icons'
import './../styles/Header.css'

export default class Header extends React.Component {
  render () {
    return (
      <header>
        <IconUser className='logo' />
        <div>
          <h1>CV PROJECT</h1>
          <p>Build your curriculum and export easy</p>
        </div>
      </header>
    )
  }
}
