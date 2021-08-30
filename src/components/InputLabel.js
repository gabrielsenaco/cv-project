import React from 'react'

export default class InputLabel extends React.Component {
  render () {
    const { value, type, placeholder, failed, id, icon, changeHandler } = this.props
    let title = this.props.title || ''
    const inputID = (title || '').toLowerCase().concat('-', id)
    return (
      <div key={id}>
        <label htmlFor={inputID}>{title}</label>
        {icon && icon({})}
        <input
          failed={failed}
          id={inputID}
          name={title.toLowerCase()}
          placeholder={placeholder}
          type={type}
          defaultValue={value}
          onChange={changeHandler}
        />
      </div>
    )
  }
}
