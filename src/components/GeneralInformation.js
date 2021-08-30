import uniqid from 'uniqid'
import { IconPlus } from '@tabler/icons'
import {
  createItemObject,
  createButtonObject,
  createParentSectionObject,
  createSectionObject,
  createFailObject,
  createValidatorObject,
  createValidatorItemObject
} from './ObjectBuilder'

export default class GeneralInformation {

  constructor(changeInputHandler, toggleEditorHandler, submitHandler) {
    this.changeInputHandler = changeInputHandler
    this.toggleEditorHandler = toggleEditorHandler
    this.sectionID = uniqid()
    this.parentSectionID = uniqid()
    this.items = this.getItemsArray(this.sectionID, this.parentSectionID)
    this.buttons = this.getButtonsArray(this.sectionID, this.parentSectionID)
    this.section = createSectionObject(null, this.items, this.buttons, true, submitHandler, true, this.parentSectionID, this.sectionID)

    this.sectionID2 = uniqid()
    this.items2 = this.getItemsArray(this.sectionID2, this.parentSectionID)
    this.buttons2 = this.getButtonsArray(this.sectionID2, this.parentSectionID)
    this.section2 = createSectionObject(null, this.items2, this.buttons2, true, submitHandler, true, this.parentSectionID, this.sectionID2)
    
    this.parentSection = createParentSectionObject('General Information', [this.section, this.section2], this.getValidators(), this.section2, this.parentSectionID)
  }

  getData() {
    return this.parentSection
  }

  getItemsArray(sectionID, parentSectionID) {
    return [
      createItemObject(
        'Name',
        'text',
        'Enter your name here',
        IconPlus,
        this.changeInputHandler,
        sectionID,
        parentSectionID
      ),
      createItemObject(
        'Email',
        'email',
        'Enter your email here',
        IconPlus,
        this.changeInputHandler,
        sectionID,
        parentSectionID
      ),
      createItemObject(
        'Phone number',
        'number',
        'Enter your phone number here',
        IconPlus,
        this.changeInputHandler,
        sectionID,
        parentSectionID
      )
    ]
  }

  getButtonsArray(sectionID, parentSectionID) {
    return [
      createButtonObject('Save', 'submit', IconPlus, 'black', 'success', false, true, null, sectionID, parentSectionID),
      createButtonObject('Edit', null, IconPlus, 'black', 'success', true, false, this.toggleEditorHandler, sectionID, parentSectionID)
    ]
  }

  getValidators() {
    return [createValidatorObject('name', 'text', (value) => {
      if(value.length === 0) {
       return createValidatorItemObject(false, 'Name cannot be empty')
      }
      
      return createValidatorItemObject(true)
    })]
  }

}