import uniqid from 'uniqid'
import { createParentSectionObject, createSectionObject } from './ObjectBuilder'

import {
  createItemPhoneNumber,
  createItemEmail,
  createItemName
} from './SectionItemObjects'

import {
  createSaveButton,
  createEditButton,
  createCloseEditorButton
} from './SectionButtonObjects'

import { nameValidator } from './ValidatorObjects'

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
      this.section,
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
      createEditButton(sectionID, parentSectionID, this.toggleEditorHandler),
      createCloseEditorButton(
        sectionID,
        parentSectionID,
        this.toggleEditorHandler
      )
    ]
  }

  getValidators () {
    return [nameValidator]
  }
}
