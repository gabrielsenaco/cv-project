import React from 'react'
//import uniqid from 'uniqid'
import Section from './Section'

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

    sections = sections.map(section => {
      return this.getSectionComponent(section)
    })

    return <article key={this.props.id}>
    <h3>{this.props.title}</h3>
    {sections}
    </article>
  }
}
