import uniqid from 'uniqid'
import {
  createParentSectionObject,
  createSectionObject
} from './../objects/ObjectBuilder'

import {
  createItemDateOfStudy,
  createItemTitleOfStudy,
  createItemSchoolName
} from './../objects/SectionItemObjects'

import {
  createSaveButton,
  createEditButton,
  createCloseEditorButton,
  createDeleteSectionButton,
  createExpandParentSectionButton
} from './../objects/SectionButtonObjects'

import {
  titleOfStudyValidator,
  schoolNameValidator,
  dateOfStudyValidator
} from './../objects/ValidatorObjects'

export default class EducationalExperience {
  constructor (
    changeInputHandler,
    toggleEditorHandler,
    submitHandler,
    expandParentSectionHandler,
    deleteSectionHandler
  ) {
    this.changeInputHandler = changeInputHandler
    this.toggleEditorHandler = toggleEditorHandler
    this.deleteSectionHandler = deleteSectionHandler
    this.parentSectionID = uniqid()
    this.buttons = [
      createExpandParentSectionButton(
        null,
        this.parentSectionID,
        expandParentSectionHandler
      )
    ]
    this.parentSection = createParentSectionObject(
      'Educational Experience',
      [],
      this.getValidators(),
      this.getSectionModel(submitHandler),
      this.buttons,
      null,
      this.parentSectionID
    )
  }

  getSectionModel (submitHandler) {
    let sectionID = uniqid()
    let items = this.getItemsArray(sectionID, this.parentSectionID)
    let buttons = this.getButtonsArray(sectionID, this.parentSectionID)

    return createSectionObject(
      'Educational Experience',
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
      createItemSchoolName(sectionID, parentSectionID, this.changeInputHandler),
      createItemTitleOfStudy(
        sectionID,
        parentSectionID,
        this.changeInputHandler
      ),
      createItemDateOfStudy(sectionID, parentSectionID, this.changeInputHandler)
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
      createDeleteSectionButton(
        sectionID,
        parentSectionID,
        this.deleteSectionHandler
      )
    ]
  }

  getValidators () {
    return [titleOfStudyValidator, schoolNameValidator, dateOfStudyValidator]
  }
}
