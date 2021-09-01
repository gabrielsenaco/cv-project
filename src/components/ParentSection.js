import React from 'react'
import Section from './Section'
import Button from './Button'
import './../styles/ParentSection.css'

export default class ParentSection extends React.Component {
  getSectionComponent (section) {
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

  render () {
    let sections = this.props.sections || []
    let buttons = this.props.buttons || []

    sections = sections.map(section => {
      return this.getSectionComponent(section)
    })

    buttons = buttons.map(button => {
      return (
        <Button
          key={button.id}
          type={button.type}
          text={button.text}
          icon={button.icon}
          id={button.id}
          bgColor={button.bgColor}
          color={button.color}
          clickHandler={button.clickHandler}
        />
      )
    })

    return (
      <article
        className={'parent-section '.concat(this.props.className || '')}
        key={this.props.id}
      >
        <h3>{this.props.title}</h3>
        {sections}
        {buttons}
      </article>
    )
  }
}
