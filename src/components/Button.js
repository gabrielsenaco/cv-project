import React from 'react'

export default class Button extends React.Component {
  render () {
    const { text, icon, color, bgColor, type, id, clickHandler } = this.props
    const className = 'bg-'.concat(bgColor || 'default', ' ', color || '')
    return (
      <button className={className} key={id} type={type || 'button'} onClick={clickHandler}>
        {icon && icon({})}
        {text}
      </button>
    )
  }
}
