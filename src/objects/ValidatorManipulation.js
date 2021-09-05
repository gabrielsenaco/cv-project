export function validateItem (item, itemValue, validators) {
  const validator = validators.filter(
    validator =>
      validator.title.toLowerCase() === item.title.toLowerCase() &&
      validator.type.toLowerCase() === item.type.toLowerCase()
  )[0]

  if (!validator) {
    return null
  }

  return validator.validate(itemValue)
}

export function isItemFailed (item, itemValue, validators) {
  let validation = validateItem(item, itemValue.toLowerCase(), validators)
  return validation ? !validation.valid : null
}

//object only
export function getItemsWithValidations (items, validators) {
  let fails = []

  items = items.map(item => {
    let failed = item.failed
    let value = item.value

    const validation = validateItem(item, item.previewValue, validators)

    if (validation) {
      if (!validation.valid) {
        fails.push(validation)
        failed = true
      } else {
        failed = false
      }
    }

    return {
      ...item,
      failed,
      value
    }
  })
  return [items, fails]
}
