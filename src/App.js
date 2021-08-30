import React from 'react'
import ParentSection from './components/ParentSection'
import GeneralInformation from './sections/GeneralInformation'
import {
  createValidatorItemObject,
  createSectionObjectBySectionModel
} from './objects/ObjectBuilder'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      generalInformation: new GeneralInformation(
        this.changeInputHandler,
        this.toggleEditorHandler,
        this.submitHandler
      ).getData()
    }
  }

  isValidItem = (id, value, title, type, parentSection) => {
    const validator = parentSection.validators.filter(
      validator =>
        validator.title.toLowerCase() === title.toLowerCase() &&
        validator.type.toLowerCase() === type.toLowerCase()
    )[0]
    let validatorObject = validator
      ? validator.validate(value)
      : createValidatorItemObject(true)
    validatorObject.id = id
    return validatorObject
  }

  getParentSectionObject (topLevelObject, targetID) {
    let parentsKeys = Object.keys(topLevelObject)
    let parentSection = {}
    let parentSectionKey

    for (const key of parentsKeys) {
      let parent = topLevelObject[key]
      if (parent.id === targetID) {
        parentSection = parent
        parentSectionKey = key
      }
    }
    return { parentSection, parentSectionKey }
  }

  toggleEditorHandler = (_, sectionID, parentSectionID, event) => {
    this.updateData(parentSectionID, parentSection => {
      return parentSection.sections.map(section => {
        let editor = section.editor
        if (section.id === sectionID) {
          editor = !editor
        }

        return {
          ...section,
          editor
        }
      })
    })
  }

  changeInputHandler = (id, sectionID, parentSectionID, event) => {
    const value = event.target.value

    this.updateData(parentSectionID, parentSection => {
      return parentSection.sections.map(section => {
        let items = section.items
        if (section.id === sectionID) {
          items = items.map(item => {
            let previewValue = item.previewValue
            if (item.id === id) {
              previewValue = value
            }

            return {
              ...item,
              previewValue
            }
          })
        }

        return {
          ...section,
          items
        }
      })
    })
  }

  submitHandler = async (_, sectionID, parentSectionID, event) => {
    event.preventDefault()
    let someFails = false
    await this.updateData(parentSectionID, parentSection => {
      return parentSection.sections.map(section => {
        let items = section.items
        if (section.id === sectionID) {
          section.fails = []

          items = items.map(item => {
            let validator = this.isValidItem(
              item.id,
              item.previewValue,
              item.title,
              item.type,
              parentSection
            )

            item.failed = !validator.valid

            if (!validator.valid) {
              section.fails.push(validator)
              someFails = true
            } else if (!someFails) {
              item.value = item.previewValue
            }

            return item
          })
        }

        return {
          ...section,
          items
        }
      })
    })

    if (!someFails) {
      this.toggleEditorHandler(null, sectionID, parentSectionID, null)
    }
  }

  expandParentSectionHandler = (_, __, parentSectionID, event) => {
    this.updateData(parentSectionID, parentSection => {
      const { sectionModel } = parentSection
      const newSection = createSectionObjectBySectionModel(sectionModel)
      return parentSection.sections.concat(newSection)
    })
  }

  deleteSectionHandler = (_, sectionID, parentSectionID, event) => {
    this.updateData(parentSectionID, parentSection => {
      return parentSection.sections.filter(section => section.id !== sectionID)
    })
  }

  async updateData (parentSectionID, callback) {
    await this.setState(prevState => {
      let { parentSection, parentSectionKey } = this.getParentSectionObject(
        prevState,
        parentSectionID
      )

      if (!parentSection) return {}

      const sections = callback(parentSection)

      parentSection = {
        ...parentSection,
        sections
      }

      return {
        ['' + parentSectionKey + '']: parentSection
      }
    })
  }

  render () {
    const parentSections = Object.values(this.state).map(parentSection => {
      let { id, sections, title } = parentSection
      return (
        <ParentSection key={id} sections={sections} id={id} title={title} />
      )
    })

    return <main>{parentSections}</main>
  }
}
