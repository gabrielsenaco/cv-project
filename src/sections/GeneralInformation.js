import uniqid from 'uniqid'
import {
  createParentSectionObject,
  createSectionObject
} from './../objects/ObjectBuilder'

import {
  createItemPhoneNumber,
  createItemEmail,
  createItemName
} from './../objects/SectionItemObjects'

import {
  createSaveButton,
  createEditButton
} from './../objects/SectionButtonObjects'

import {
  nameValidator,
  emailValidator,
  phoneNumberValidator
} from './../objects/ValidatorObjects'

export default class GeneralInformation {
  constructor (changeInputHandler, toggleEditorHandler, submitHandler) {
    this.changeInputHandler = changeInputHandler
    this.toggleEditorHandler = toggleEditorHandler
    this.sectionID = uniqid()
    this.parentSectionID = uniqid()
    this.items = this.getItemsArray(this.sectionID, this.parentSectionID)
    this.buttons = this.getButtonsArray(this.sectionID, this.parentSectionID)

    this.section = createSectionObject(
      null,
      this.items,
      this.buttons,
      true,
      submitHandler,
      true,
      this.parentSectionID,
      this.sectionID
    )

    this.parentSection = createParentSectionObject(
      'General Information',
      [this.section],
      this.getValidators(),
      null,
      [],
      null,
      this.parentSectionID
    )
  }

  getData () {
    return this.parentSection
  }

  getItemsArray (sectionID, parentSectionID) {
    return [
      createItemName(sectionID, parentSectionID, this.changeInputHandler),
      createItemEmail(sectionID, parentSectionID, this.changeInputHandler),
      createItemPhoneNumber(sectionID, parentSectionID, this.changeInputHandler)
    ]
  }

  getButtonsArray (sectionID, parentSectionID) {
    return [
      createSaveButton(sectionID, parentSectionID),
      createEditButton(sectionID, parentSectionID, this.toggleEditorHandler)
    ]
  }

  getValidators () {
    return [nameValidator, emailValidator, phoneNumberValidator]
  }
}
