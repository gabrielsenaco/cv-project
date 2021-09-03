import React from 'react'
import ParentSection from './components/ParentSection'
import GeneralInformation from './sections/GeneralInformation'
import EducationalExperience from './sections/EducationalExperience'
import PracticalExperience from './sections/PracticalExperience'
import DownloadCV from './sections/DownloadCV'
import Header from './components/Header'
import Footer from './components/Footer'

import {
  createValidatorItemObject,
  createSectionObjectBySectionModel
} from './objects/ObjectBuilder'
import PDFCurriculum from './objects/PDFGenerator'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      generalInformation: new GeneralInformation(
        this.changeInputHandler,
        this.toggleEditorHandler,
        this.submitHandler
      ).getData(),
      educationalExperience: new EducationalExperience(
        this.changeInputHandler,
        this.toggleEditorHandler,
        this.submitHandler,
        this.expandParentSectionHandler,
        this.deleteSectionHandler
      ).getData(),
      practicalExperience: new PracticalExperience(
        this.changeInputHandler,
        this.toggleEditorHandler,
        this.submitHandler,
        this.expandParentSectionHandler,
        this.deleteSectionHandler
      ).getData(),
      downloadCV: new DownloadCV(this.saveAsPDFClickHandler).getData()
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

  getItemValidationData (item, parentSection) {
    let validator = this.isValidItem(
      item.id,
      item.previewValue,
      item.title,
      item.type,
      parentSection
    )

    return validator
  }

  saveAsPDFClickHandler = () => {
    Object.values(this.state).forEach(parent => {
      this.updateData(parent.id, parentSection => {
        return parentSection.sections.map(section => {
          return {
            ...section,
            editor: false
          }
        })
      })
    })

    PDFCurriculum(this.state)
  }

  toggleEditorHandler = (_, sectionID, parentSectionID, event) => {
    this.updateData(parentSectionID, parentSection => {
      return parentSection.sections.map(section => {
        let editor = section.editor
        if (section.id === sectionID) {
          editor = !editor
        }

        const items = section.items.map(item => {
          item.previewValue = item.value
          return item
        })

        return {
          ...section,
          items,
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

    this.checkInputTypoBySection(sectionID, parentSectionID, id)
  }

  submitHandler = async (_, sectionID, parentSectionID, event) => {
    event.preventDefault()
    const { someFails } = await this.checkInputTypoBySection(
      sectionID,
      parentSectionID
    )

    if (!someFails) {
      this.toggleEditorHandler(null, sectionID, parentSectionID, null)
    }
  }

  expandParentSectionHandler = (_, __, parentSectionID, event) => {
    this.updateData(parentSectionID, parentSection => {
      const { sectionModel } = parentSection
      const newSection = createSectionObjectBySectionModel(
        sectionModel,
        parentSectionID
      )
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

  getInputPassList (items, parentSection) {
    let someFails = false
    let fails = []
    const passList = items.map(item => {
      let pass = true
      let validation = this.getItemValidationData(item, parentSection)

      if (!validation.valid) {
        someFails = true
        fails.push(validation)
        pass = false
      }

      return { id: item.id, pass }
    })
    return { someFails, fails, passList }
  }

  rewriteItemsByPassList (items, passList, someFails, id) {
    return items.map(item => {
      if (id != null && item.id !== id) return item

      let pass = passList.some(
        itemPass => itemPass.pass && itemPass.id === item.id
      )
      let value = item.value
      let failed = item.failed

      if (pass && !someFails) {
        value = item.previewValue
      } else {
        failed = true
      }

      return {
        ...item,
        value,
        failed
      }
    })
  }

  async checkInputTypoBySection (sectionID, parentSectionID, id) {
    let someFails = false
    await this.updateData(parentSectionID, parentSection => {
      return parentSection.sections.map(section => {
        let items = section.items
        let fails = section.fails
        if (section.id === sectionID) {
          fails = []

          let passData = this.getInputPassList(items, parentSection)
          fails = passData.fails
          const passList = passData.passList
          someFails = passData.someFails

          items = this.rewriteItemsByPassList(items, passList, someFails, id)
        }

        return {
          ...section,
          items,
          fails
        }
      })
    })

    return { someFails }
  }

  render () {
    const parentSections = Object.values(this.state).map(parentSection => {
      let { id, sections, title, buttons, className } = parentSection
      return (
        <ParentSection
          className={className}
          key={id}
          sections={sections}
          buttons={buttons}
          id={id}
          title={title}
        />
      )
    })

    return (
      <main>
        <Header />
        {parentSections}
        <Footer />
      </main>
    )
  }
}
