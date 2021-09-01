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
  const defaultChangeHandler = changeHandler

  if (changeHandler) {
    changeHandler = bindEventHandler(
      changeHandler,
      id,
      sectionID,
      parentSectionID
    )
  }

  return {
    title,
    type,
    placeholder,
    changeHandler,
    icon,
    previewValue: '',
    value: '',
    failed: null,
    id,
    defaultChangeHandler
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
  const defaultClickHandler = clickHandler
  if (clickHandler) {
    clickHandler = bindEventHandler(
      clickHandler,
      null,
      sectionID,
      parentSectionID
    )
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
    defaultClickHandler,
    id
  }
}

const createFailObject = (id, fail) => {
  return {
    id,
    fail
  }
}

const createSectionObject = (
  title,
  items,
  buttons,
  editor,
  submitHandler,
  firstBind,
  parentSectionID,
  id = uniqid()
) => {
  const defaultSubmitHandler = submitHandler
  if (submitHandler && firstBind) {
    submitHandler = bindEventHandler(submitHandler, null, id, parentSectionID)
  }
  return {
    title,
    items,
    buttons,
    editor,
    fails: [],
    id,
    submitHandler,
    defaultSubmitHandler
  }
}

const createParentSectionObject = (
  title,
  sections,
  validators,
  sectionModel,
  buttons,
  id = uniqid()
) => {
  return {
    title,
    sections,
    sectionModel,
    validators,
    buttons,
    id
  }
}

function bindEventHandler (handler, id, sectionID, parentSectionID) {
  if (handler) {
    return handler.bind(null, id, sectionID, parentSectionID)
  }
}

const createSectionObjectBySectionModel = (
  sectionModel,
  parentSectionID,
  sectionID = uniqid()
) => {
  let section = Object.assign({}, sectionModel)

  const items = section.items.map(item => {
    const id = uniqid()
    let changeHandler = bindEventHandler(
      item.defaultChangeHandler,
      id,
      sectionID,
      parentSectionID
    )
    return {
      ...item,
      id,
      changeHandler
    }
  })

  const buttons = section.buttons.map(button => {
    const id = uniqid()
    let clickHandler = bindEventHandler(
      button.defaultClickHandler,
      null,
      sectionID,
      parentSectionID
    )

    return {
      ...button,
      clickHandler,
      id
    }
  })

  let submitHandler = bindEventHandler(
    section.defaultSubmitHandler,
    null,
    sectionID,
    parentSectionID
  )

  return {
    ...section,
    id: sectionID,
    items,
    buttons,
    submitHandler
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
