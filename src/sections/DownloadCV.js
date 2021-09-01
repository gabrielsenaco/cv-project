import uniqid from 'uniqid'
import { createParentSectionObject } from './../objects/ObjectBuilder'
import { createSaveAsPDFParentSectionButton } from './../objects/SectionButtonObjects'

export default class PracticalExperience {
  constructor (saveAsPDFParentSectionHandler) {
    this.parentSectionID = uniqid()

    this.buttons = [
      createSaveAsPDFParentSectionButton(
        null,
        this.parentSectionID,
        saveAsPDFParentSectionHandler
      )
    ]

    this.parentSection = createParentSectionObject(
      'Download CV',
      [],
      null,
      null,
      this.buttons,
      'download-cv',
      this.parentSectionID
    )
  }

  getData () {
    return this.parentSection
  }
}
