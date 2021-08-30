import { IconSignature, IconAt, IconPhone } from '@tabler/icons'
import { createItemObject } from './ObjectBuilder'

const createItemName = (sectionID, parentSectionID, changeInputHandler) => {
  return createItemObject(
    'Name',
    'text',
    'Enter your name here',
    IconSignature,
    changeInputHandler,
    sectionID,
    parentSectionID
  )
}

const createItemEmail = (sectionID, parentSectionID, changeInputHandler) => {
  return createItemObject(
    'Email',
    'email',
    'Enter your email here',
    IconAt,
    changeInputHandler,
    sectionID,
    parentSectionID
  )
}

const createItemPhoneNumber = (
  sectionID,
  parentSectionID,
  changeInputHandler
) => {
  return createItemObject(
    'Phone number',
    'number',
    'Enter your phone number here',
    IconPhone,
    changeInputHandler,
    sectionID,
    parentSectionID
  )
}

export { createItemPhoneNumber, createItemEmail, createItemName }
