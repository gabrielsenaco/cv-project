import uniqid from 'uniqid'

const createItemObject = (
  title,
  type,
  placeholder,
  icon,
  changeHandler,
  sectionID,
  parentSectionID,
  id = uniqid()
) => {

  if(changeHandler) {
    changeHandler = changeHandler.bind(null, id, sectionID, parentSectionID)
  }

  return {
    title,
    type,
    placeholder,
    changeHandler,
    icon,
    previewValue: '',
    value: '',
    failed: false,
    id
  }
}

const createButtonObject = (
  text,
  type,
  icon,
  color,
  bgColor,
  onlyView,
  onlyEditor,
  clickHandler,
  sectionID,
  parentSectionID,
  id = uniqid()
) => {

  if(clickHandler) {
    clickHandler = clickHandler.bind(null, id, sectionID, parentSectionID)
  }

  return {
    text,
    type,
    icon,
    color,
    bgColor,
    onlyView,
    onlyEditor,
    clickHandler,
    id
  }
}

const createFailObject = (id, fail) => {
  return {
    id,
    fail
  }
}

//createSectionObject(items, section.buttons, !section.editor, section.submitHandler, parentSection.id, section.id)
const createSectionObject = (title, items, buttons, editor, submitHandler, firstBind, parentSectionID, id = uniqid()) => {
  if(submitHandler && firstBind) {
    submitHandler = submitHandler.bind(null, null, id, parentSectionID)
  }
  return {
    title,
    items,
    buttons,
    editor,
    fails: [],
    id,
    submitHandler
  }
}

const createParentSectionObject = (title, sections, validators, sectionModel, id = uniqid()) => {
  return {
    title,
    sections,
    sectionModel,
    validators,
    id
  }
}

const createSectionObjectBySectionModel = (sectionModel, id = uniqid()) => {
  let section = Object.assign({}, sectionModel)

  const items = section.items.map((item) => {
    const id = uniqid()
    return {
      ...item,
      id
    }
  })

  const buttons = section.buttons.map((button) => {
    const id = uniqid()
    return {
      ...button,
      id
    }
  })

  return {
    ...section,
    id,
    items,
    buttons
  }
}

const createValidatorObject = (title, type, validatorCallback) => {
  return {
    title,
    type,
    validate: validatorCallback
  }
}

const createValidatorItemObject = (valid, text = '') => {
  return {
    valid,
    text
  }
}

export {
  createItemObject,
  createButtonObject,
  createParentSectionObject,
  createSectionObject,
  createFailObject,
  createValidatorObject,
  createValidatorItemObject,
  createSectionObjectBySectionModel
}
