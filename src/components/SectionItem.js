import React from 'react'

export default class SectionItem extends React.Component {
  render () {
    const { title, id } = this.props
    let value = this.props.value

    if(!value || value.length === 0 ) {
        value = 'Not set yet'
    }

    return (
      <div key={id}>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    )
  }
}

