import React from 'react'

export default class InputLabel extends React.Component {
  render () {
    const { value, type, placeholder, failed, id, icon, changeHandler } = this.props
    let title = this.props.title || ''
    const inputID = (title || '').toLowerCase().concat('-', id)

    let input

    if(type === 'textarea') {
      input = (<textarea
          failed={failed !== null && failed.toString()}
          id={inputID}
          name={title.toLowerCase()}
          placeholder={placeholder}
          type={type}
          defaultValue={value}
          onChange={changeHandler}
        ></textarea>)
    } else {
      input = (<input
          failed={failed !== null && failed.toString()}
          id={inputID}
          name={title.toLowerCase()}
          placeholder={placeholder}
          type={type}
          defaultValue={value}
          onChange={changeHandler}
        />)
    }
  
    return (
      <div key={id}>
        <label htmlFor={inputID}>{title}</label>
        {icon && icon({})}
        {input}
      </div>
    )
  }
}
