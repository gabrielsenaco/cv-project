import React from 'react'

export default class InputLabel extends React.Component {
  render () {
    const { value, type, placeholder, id, icon, changeHandler } = this.props
    let title = this.props.title || ''
    const inputID = (title || '').toLowerCase().concat('-', id)
    const failed =
      this.props.failed !== undefined ? this.props.failed.toString() : null

    let input

    if (type === 'textarea') {
      input = (
        <textarea
          failed={failed}
          id={inputID}
          name={title.toLowerCase()}
          placeholder={placeholder}
          type={type}
          defaultValue={value}
          onChange={changeHandler}
        ></textarea>
      )
    } else {
      input = (
        <input
          failed={failed}
          id={inputID}
          name={title.toLowerCase()}
          placeholder={placeholder}
          type={type}
          defaultValue={value}
          onChange={changeHandler}
        />
      )
    }

    return (
      <div key={id} className='section-item'>
        <label htmlFor={inputID}>{title}</label>
        <div className='section-item-input-container' failed={failed}>
          {icon && icon({})}
          {input}
        </div>
      </div>
    )
  }
}
