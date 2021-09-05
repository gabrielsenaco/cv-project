import Section from './Section'
import { getButtonComponent } from './Button'
import './../styles/ParentSection.css'

const ParentSection = props => {
  const getSectionComponent = section => {
    return (
      <Section
        key={section.id}
        submitHandler={section.submitHandler}
        items={section.items}
        buttons={section.buttons}
        fails={section.fails}
        editor={section.editor}
        id={section.id}
        title={section.title}
      />
    )
  }

  let sections = props.sections || []
  let buttons = props.buttons || []

  sections = sections.map(section => {
    return getSectionComponent(section)
  })

  buttons = buttons.map(button => {
    return getButtonComponent(button)
  })

  return (
    <article
      className={'parent-section '.concat(props.className || '')}
      key={props.id}
    >
      <h3>{props.title}</h3>
      {sections}
      {buttons}
    </article>
  )
}

export default ParentSection
