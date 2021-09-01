import React from 'react'
import InputLabel from './InputLabel'
import SectionItem from './SectionItem'
import Button from './Button'
import FailSection from './FailSection'
import './../styles/Section.css'

export default class Section extends React.Component {
  getItemInputComponent (item, failed) {
    return (
      <InputLabel
        key={item.id}
        title={item.title}
        failed={failed}
        value={item.previewValue}
        type={item.type}
        placeholder={item.placeholder}
        id={item.id}
        changeHandler={item.changeHandler}
        icon={item.icon}
      />
    )
  }

  getItemViewComponent (item) {
    let value = item.value
    if (item.type === 'date') {
      value = item.value.replaceAll('-', '/')
    }
    return (
      <SectionItem
        title={item.title}
        value={value}
        id={item.id}
        key={item.id}
      />
    )
  }

  getButtonComponent (button) {
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
  }

  filterButtonsByEditorState (buttons, editorState) {
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

  render () {
    const { id, editor, submitHandler, title } = this.props
    let { items, buttons, fails } = this.props

    items = items.map(item => {
      let failed
      if (item.failed !== null) {
        failed = fails.some(fail => fail.id === item.id)
      }
      if (editor) return this.getItemInputComponent(item, failed)
      return this.getItemViewComponent(item)
    })
    buttons = this.filterButtonsByEditorState(buttons, editor)
    buttons = buttons.map(button => {
      return this.getButtonComponent(button)
    })

    fails = <FailSection ordered={true} fails={fails.map(fail => fail.text)} />

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
}
