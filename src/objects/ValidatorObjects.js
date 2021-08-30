import {
  createValidatorObject,
  createValidatorItemObject
} from './ObjectBuilder'

const nameValidator = (() => {
  return createValidatorObject('name', 'text', value => {
    if (value.length === 0) {
      return createValidatorItemObject(false, 'Name cannot be empty')
    }

    return createValidatorItemObject(true)
  })
})()

export { nameValidator }
