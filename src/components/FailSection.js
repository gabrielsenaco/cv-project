import React from 'react'
import uniqid from 'uniqid'

export default class FailSection extends React.Component {
  render () {
    let fails = this.props.fails || []
    fails = fails.map(fail => {
      return (
        <li key={uniqid()} className='fail-item'>
          {fail}
        </li>
      )
    })

    if (this.props.ordered) {
      return <ol className='fail-section'>{fails}</ol>
    } else {
      return <ul className='fail-section'>{fails}</ul>
    }
  }
}
