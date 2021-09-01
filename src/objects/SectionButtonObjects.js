import {
  IconCheck,
  IconEdit,
  IconX,
  IconTrash,
  IconPlus,
  IconDeviceFloppy
} from '@tabler/icons'
import { createButtonObject } from './ObjectBuilder'

const createSaveButton = (sectionID, parentSectionID) => {
  return createButtonObject(
    'Save',
    'submit',
    IconCheck,
    'black',
    'success',
    false,
    true,
    null,
    sectionID,
    parentSectionID
  )
}

const createEditButton = (sectionID, parentSectionID, toggleEditorHandler) => {
  return createButtonObject(
    'Edit',
    null,
    IconEdit,
    'black',
    'info',
    true,
    false,
    toggleEditorHandler,
    sectionID,
    parentSectionID
  )
}

const createCloseEditorButton = (
  sectionID,
  parentSectionID,
  toggleEditorHandler
) => {
  return createButtonObject(
    'Close',
    null,
    IconX,
    'black',
    'info',
    false,
    true,
    toggleEditorHandler,
    sectionID,
    parentSectionID
  )
}

const createDeleteSectionButton = (
  sectionID,
  parentSectionID,
  deleteSectionHandler
) => {
  return createButtonObject(
    'Delete',
    null,
    IconTrash,
    'black',
    'danger',
    false,
    false,
    deleteSectionHandler,
    sectionID,
    parentSectionID
  )
}

const createExpandParentSectionButton = (
  sectionID,
  parentSectionID,
  expandParentSectionHandler
) => {
  return createButtonObject(
    'Add',
    null,
    IconPlus,
    'black',
    'success',
    false,
    false,
    expandParentSectionHandler,
    sectionID,
    parentSectionID
  )
}

const createSaveAsPDFParentSectionButton = (
  sectionID,
  parentSectionID,
  saveAsPDFParentSectionHandler
) => {
  return createButtonObject(
    'Save as PDF',
    null,
    IconDeviceFloppy,
    'black',
    'success',
    false,
    false,
    saveAsPDFParentSectionHandler,
    sectionID,
    parentSectionID
  )
}
export {
  createSaveAsPDFParentSectionButton,
  createSaveButton,
  createEditButton,
  createCloseEditorButton,
  createDeleteSectionButton,
  createExpandParentSectionButton
}
