import './../styles/Button.css'

const Button = props => {
  const { text, icon, color, bgColor, type, id, clickHandler } = props
  const className = 'button bg-'.concat(bgColor || 'default', ' ', color || '')
  return (
    <button
      className={className}
      key={id}
      type={type || 'button'}
      onClick={clickHandler}
    >
      {icon && icon({})}
      {text}
    </button>
  )
}

export const getButtonComponent = buttonObj => {
  return (
    <Button
      key={buttonObj.id}
      type={buttonObj.type}
      text={buttonObj.text}
      icon={buttonObj.icon}
      id={buttonObj.id}
      bgColor={buttonObj.bgColor}
      color={buttonObj.color}
      clickHandler={buttonObj.clickHandler}
    />
  )
}

export default Button
