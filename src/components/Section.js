import { getInputLabelComponent } from './InputLabel'
import { getSectionItemComponent } from './SectionItem'
import { getButtonComponent } from './Button'
import FailSection from './FailSection'
import './../styles/Section.css'

const Section = props => {
  const filterButtonsByEditorState = (buttons, editorState) => {
    return buttons.filter(button => {
      if (button.onlyView && editorState) {
        return false
      }

      if (button.onlyEditor && !editorState) {
        return false
      }
      return true
    })
  }

  const { id, editor, submitHandler, title } = props
  let { items, buttons, fails } = props

  items = items.map(item => {
    if (editor) return getInputLabelComponent(item, item.failed)
    return getSectionItemComponent(item)
  })

  buttons = filterButtonsByEditorState(buttons, editor)
  buttons = buttons.map(button => getButtonComponent(button))

  fails = <FailSection fails={fails.map(fail => fail.text)} />

  if (editor) {
    return (
      <section key={id} className='section'>
        {title && <h4>{title}</h4>}
        <form onSubmit={submitHandler} className='section-editor' noValidate>
          <div className='section-items'>{items}</div>
          {fails}
          {buttons}
        </form>
      </section>
    )
  }
  return (
    <section key={id} className='section'>
      {title && <h4>{title}</h4>}
      <div className='section-items'>{items}</div>
      {buttons}
    </section>
  )
}

export default Section
