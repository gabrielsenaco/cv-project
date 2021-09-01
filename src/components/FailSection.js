import React from 'react'
import uniqid from 'uniqid'
import './../styles/FailSection.css'

export default class FailSection extends React.Component {
  render () {
    let fails = this.props.fails || []
    fails = fails.map((fail, index) => {
      return (
        <li key={uniqid()} className='fail-item'>
          {<span className='fail-item-index'>{index + 1 + '. '}</span>}
          {fail}
        </li>
      )
    })

    if (fails.length === 0) {
      return null
    }

    return (
      <ul className='fail-section'>
        <h5>Fails list</h5>
        {fails}
      </ul>
    )
  }
}
