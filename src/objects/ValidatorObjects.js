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

// todo adicionar os validadores

export { nameValidator, emailValidator, phoneNumberValidator}
