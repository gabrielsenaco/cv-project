import { IconSignature, IconAt, IconPhone, IconSchool, IconCertificate, IconCalendar, IconBuildingSkyscraper, IconBriefcase, IconSubtask} from '@tabler/icons'
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

const createItemSchoolName = (sectionID, parentSectionID, changeInputHandler) => {
  return createItemObject(
    'School name',
    'text',
    'Enter school name here',
    IconSchool,
    changeInputHandler,
    sectionID,
    parentSectionID
  )
}

const createItemTitleOfStudy = (sectionID, parentSectionID, changeInputHandler) => {
  return createItemObject(
    'Title of study',
    'text',
    'Enter title of study here',
    IconCertificate,
    changeInputHandler,
    sectionID,
    parentSectionID
  )
}

const createItemDateOfStudy= (sectionID, parentSectionID, changeInputHandler) => {
  return createItemObject(
    'Date of study',
    'date',
    'Enter date of study here',
    IconCalendar,
    changeInputHandler,
    sectionID,
    parentSectionID
  )
}

const createItemCompanyName = (sectionID, parentSectionID, changeInputHandler) => {
  return createItemObject(
    'Company name',
    'text',
    'Enter company name here',
    IconBuildingSkyscraper,
    changeInputHandler,
    sectionID,
    parentSectionID
  )
}

const createItemPositionTitle = (sectionID, parentSectionID, changeInputHandler) => {
  return createItemObject(
    'Position title',
    'text',
    'Enter position title here',
    IconBriefcase,
    changeInputHandler,
    sectionID,
    parentSectionID
  )
}

const createItemMainTasks = (sectionID, parentSectionID, changeInputHandler) => {
  return createItemObject(
    'Main tasks',
    'textarea',
    'Enter your main tasks here',
    IconSubtask,
    changeInputHandler,
    sectionID,
    parentSectionID
  )
}

const createItemDateStartedJob = (sectionID, parentSectionID, changeInputHandler) => {
  return createItemObject(
    'Date you started',
    'date',
    'Enter the date here',
    IconCalendar,
    changeInputHandler,
    sectionID,
    parentSectionID
  )
}

const createItemDateStoppedJob = (sectionID, parentSectionID, changeInputHandler) => {
  return createItemObject(
    'Date you stopped',
    'date',
    'Enter the date here',
    IconCalendar,
    changeInputHandler,
    sectionID,
    parentSectionID
  )
}

export { createItemPhoneNumber, createItemEmail, createItemName, createItemDateOfStudy, createItemTitleOfStudy, createItemSchoolName, createItemDateStoppedJob, createItemDateStartedJob, createItemMainTasks, createItemPositionTitle, createItemCompanyName }
