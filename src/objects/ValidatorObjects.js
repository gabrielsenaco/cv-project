import {
  createValidatorObject,
  createValidatorItemObject
} from './ObjectBuilder'

function getEmptyValueValidatorText(value, title = '') {
  if (!value || value.length === 0) {
    let text = title.length > 0 ? title+': ' : ''
    text += 'Value cannot be empty'
    return text
  }
}

const nameValidator = (() => {
  return createValidatorObject('name', 'text', value => {
    const empty = getEmptyValueValidatorText(value, 'Name')
    if(empty) {
      return createValidatorItemObject(false, empty)
    }

    return createValidatorItemObject(true)
  })
})()


// Thank you Tikhonov from regex101 for this email regex
const emailRegEx = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/

const emailValidator = (() => {
  return createValidatorObject('email', 'email', value => {
    const empty = getEmptyValueValidatorText(value, 'Email')
    if(empty) {
      return createValidatorItemObject(false, empty)
    }

    if(!value.match(emailRegEx)) {
      return createValidatorItemObject(false, 'Email: Enter valid email address')
    }

    return createValidatorItemObject(true)
  })
})()

const phoneNumberValidator = (() => {
  return createValidatorObject('phone number', 'number', value => {
    const empty = getEmptyValueValidatorText(value, 'Phone number')
    if(empty) {
      return createValidatorItemObject(false, empty)
    }

    if(!Number.isInteger(parseInt(value))) {
      return createValidatorItemObject(false, 'Phone number: Enter valid phone number(insert only numbers)')
    }

    return createValidatorItemObject(true)
  })
})()


const schoolNameValidator = (() => {
  return createValidatorObject('school name', 'text', value => {
    const empty = getEmptyValueValidatorText(value, 'School name')
    if(empty) {
      return createValidatorItemObject(false, empty)
    }

    return createValidatorItemObject(true)
  })
})()

const titleOfStudyValidator = (() => {
  return createValidatorObject('title of study', 'text', value => {
    const empty = getEmptyValueValidatorText(value, 'Title of study')
    if(empty) {
      return createValidatorItemObject(false, empty)
    }

    return createValidatorItemObject(true)
  })
})()

const dateOfStudyValidator = (() => {
  return createValidatorObject('date of study', 'date', value => {
    const empty = getEmptyValueValidatorText(value, 'Date of study')
    if(empty) {
      return createValidatorItemObject(false, empty)
    }

    if(!value.match(/\d{4}-\d{2}-\w{2}/)) {
      return createValidatorItemObject(false, 'Date of study: Insert valid date. Pattern: yyyy-mm-dd')
    }

    return createValidatorItemObject(true)
  })
})()

const companyNameValidator = (() => {
  return createValidatorObject('company name', 'text', value => {
    const empty = getEmptyValueValidatorText(value, 'Company name')
    if(empty) {
      return createValidatorItemObject(false, empty)
    }

    return createValidatorItemObject(true)
  })
})()

const positionTitleValidator = (() => {
  return createValidatorObject('position title', 'text', value => {
    const empty = getEmptyValueValidatorText(value, 'Position title')
    if(empty) {
      return createValidatorItemObject(false, empty)
    }

    return createValidatorItemObject(true)
  })
})()

const mainTasksValidator = (() => {
  return createValidatorObject('Main tasks', 'textarea', value => {
    const empty = getEmptyValueValidatorText(value, 'Main tasks')
    if(empty) {
      return createValidatorItemObject(false, empty)
    }

    return createValidatorItemObject(true)
  })
})()

const dateStartedJobValidator = (() => {
  return createValidatorObject('date you started', 'date', value => {
    const empty = getEmptyValueValidatorText(value, 'Date you started')
    if(empty) {
      return createValidatorItemObject(false, empty)
    }

    if(!value.match(/\d{4}-\d{2}-\w{2}/)) {
      return createValidatorItemObject(false, 'Date you started: Insert valid date. Pattern: yyyy-mm-dd')
    }

    return createValidatorItemObject(true)
  })
})()

const dateStoppedJobValidator = (() => {
  return createValidatorObject('date you stopped', 'date', value => {
    const empty = getEmptyValueValidatorText(value, 'Date you stopped')
    if(empty) {
      return createValidatorItemObject(false, empty)
    }

    if(!value.match(/\d{4}-\d{2}-\w{2}/)) {
      return createValidatorItemObject(false, 'Date you stopped: Insert valid date. Pattern: yyyy-mm-dd')
    }

    return createValidatorItemObject(true)
  })
})()

export { nameValidator, emailValidator, phoneNumberValidator, titleOfStudyValidator, schoolNameValidator, dateOfStudyValidator, companyNameValidator, dateStoppedJobValidator, dateStartedJobValidator, mainTasksValidator, positionTitleValidator}
