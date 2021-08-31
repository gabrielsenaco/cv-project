import uniqid from 'uniqid'
import { createParentSectionObject, createSectionObject } from './../objects/ObjectBuilder'

import {createItemDateStoppedJob, createItemDateStartedJob, createItemMainTasks, createItemPositionTitle, createItemCompanyName } from './../objects/SectionItemObjects'

import {
  createSaveButton,
  createEditButton,
  createCloseEditorButton,
  createDeleteSectionButton,
  createExpandParentSectionButton
} from './../objects/SectionButtonObjects'

import { companyNameValidator, dateStoppedJobValidator, dateStartedJobValidator, mainTasksValidator, positionTitleValidator} from './../objects/ValidatorObjects'

export default class PracticalExperience {
  constructor (changeInputHandler, toggleEditorHandler, submitHandler, expandParentSectionHandler, deleteSectionHandler) {
    this.changeInputHandler = changeInputHandler
    this.toggleEditorHandler = toggleEditorHandler
    this.deleteSectionHandler = deleteSectionHandler
    this.parentSectionID = uniqid()
    this.buttons = [createExpandParentSectionButton(null, this.parentSectionID, expandParentSectionHandler)]
    this.parentSection = createParentSectionObject(
      'Practical Experience',
      [],
      this.getValidators(),
      this.getSectionModel(submitHandler),
      this.buttons,
      this.parentSectionID
    )
  }

  getSectionModel(submitHandler) {
    let sectionID = uniqid()
    let items = this.getItemsArray(sectionID, this.parentSectionID)
    let buttons = this.getButtonsArray(sectionID, this.parentSectionID)

    return createSectionObject(
      'Practical Experience',
      items,
      buttons,
      true,
      submitHandler,
      true,
      this.parentSectionID,
      sectionID
    )
  }

  getData () {
    return this.parentSection
  }

  getItemsArray (sectionID, parentSectionID) {
    return [
      createItemCompanyName(sectionID, parentSectionID, this.changeInputHandler),
      createItemPositionTitle(sectionID, parentSectionID, this.changeInputHandler),
      createItemMainTasks(sectionID, parentSectionID, this.changeInputHandler),
      createItemDateStartedJob(sectionID, parentSectionID, this.changeInputHandler),
      createItemDateStoppedJob(sectionID, parentSectionID, this.changeInputHandler)
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
      ),
      createDeleteSectionButton(sectionID, parentSectionID, this.deleteSectionHandler)
    ]
  }

  getValidators () {
    return [companyNameValidator, dateStoppedJobValidator, dateStartedJobValidator, mainTasksValidator, positionTitleValidator]
  }
}
