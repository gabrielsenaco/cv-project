const InputLabel = props => {
  const { value, type, placeholder, id, icon, changeHandler } = props
  let title = props.title || ''
  const inputID = (title || '').toLowerCase().concat('-', id)
  const failed = props.failed !== null ? props.failed.toString() : null
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

export const getInputLabelComponent = (inputObj, failed) => {
  return (
    <InputLabel
      key={inputObj.id}
      title={inputObj.title}
      failed={failed}
      value={inputObj.previewValue}
      type={inputObj.type}
      placeholder={inputObj.placeholder}
      id={inputObj.id}
      changeHandler={inputObj.changeHandler}
      icon={inputObj.icon}
    />
  )
}
export default InputLabel
