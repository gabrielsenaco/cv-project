import React, { useState, useEffect, useRef } from 'react'
import ParentSection from './components/ParentSection'
import GeneralInformation from './sections/GeneralInformation'
import EducationalExperience from './sections/EducationalExperience'
import PracticalExperience from './sections/PracticalExperience'
import DownloadCV from './sections/DownloadCV'
import Header from './components/Header'
import Footer from './components/Footer'

import {
  createSectionObjectBySectionModel,
  savePreviewValuesItems
} from './objects/ObjectBuilder'
import {
  isItemFailed,
  getItemsWithValidations
} from './objects/ValidatorManipulation'
import PDFCurriculum from './objects/PDFGenerator'

function useStateRef (initialValue) {
  const [value, setValue] = useState(initialValue)

  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return [value, setValue, ref]
}

const App = () => {
  let [parentSections, setParentSections, parentSectionsRef] = useStateRef([
    new GeneralInformation(
      changeInputHandler,
      toggleEditorHandler,
      submitHandler
    ).getData(),
    new EducationalExperience(
      changeInputHandler,
      toggleEditorHandler,
      submitHandler,
      expandParentSectionHandler,
      deleteSectionHandler
    ).getData(),
    new PracticalExperience(
      changeInputHandler,
      toggleEditorHandler,
      submitHandler,
      expandParentSectionHandler,
      deleteSectionHandler
    ).getData(),
    new DownloadCV(saveAsPDFClickHandler).getData()
  ])

  function updateSections (parentSectionID, sectionsCallback) {
    setParentSections(parentSections =>
      parentSections.map(parentSection => {
        let sections = parentSection.sections
        if (parentSection.id === parentSectionID) {
          sections = sectionsCallback(sections, parentSection)
        }

        return {
          ...parentSection,
          sections
        }
      })
    )
  }

  function updateItems (parentSectionID, sectionID, itemsCallback) {
    updateSections(parentSectionID, (sections, parentSection) => {
      return sections.map(section => {
        let items = section.items
        if (section.id === sectionID) {
          items = itemsCallback(items, section, parentSection)
        }
        return {
          ...section,
          items
        }
      })
    })
  }

  function updateSectionEditor (parentSectionID, sectionID, editorCallback) {
    updateSections(parentSectionID, sections => {
      return sections.map(section => {
        let editor = section.editor
        if (section.id === sectionID) {
          editor = editorCallback(editor)
        }
        return {
          ...section,
          editor
        }
      })
    })
  }

  function closeAllSectionsEditor () {
    setParentSections(parentSections => {
      parentSections = parentSections.map(parentSection => {
        let sections = parentSection.sections.map(section => {
          return {
            ...section,
            editor: false
          }
        })

        return {
          ...parentSection,
          sections
        }
      })
      return parentSections
    })
  }

  async function saveAsPDFClickHandler () {
    closeAllSectionsEditor()
    PDFCurriculum(parentSectionsRef.current)
  }

  function deleteSectionHandler (_, sectionID, parentSectionID, event) {
    updateSections(parentSectionID, (sections, parentSection) => {
      return sections.filter(section => section.id !== sectionID)
    })
  }

  function expandParentSectionHandler (_, __, parentSectionID, event) {
    updateSections(parentSectionID, (sections, parentSection) => {
      const newSection = createSectionObjectBySectionModel(
        parentSection.sectionModel,
        parentSectionID
      )
      return sections.concat(newSection)
    })
  }

  function changeInputHandler (id, sectionID, parentSectionID, event) {
    const value = event.target.value
    updateItems(parentSectionID, sectionID, (items, section, parentSection) => {
      return items.map(item => {
        let previewValue = item.previewValue
        let failed = item.failed
        if (item.id === id) {
          previewValue = value
          failed = isItemFailed(item, previewValue, parentSection.validators)
        }
        return {
          ...item,
          previewValue,
          failed
        }
      })
    })
  }

  function toggleEditorHandler (_, sectionID, parentSectionID, event) {
    updateSectionEditor(parentSectionID, sectionID, currentEditorState => {
      return !currentEditorState
    })

    updateItems(parentSectionID, sectionID, (items, _, parentSection) => {
      return items.map(item => {
        return {
          ...item,
          previewValue: item.value,
          failed: isItemFailed(item, item.value, parentSection.validators)
        }
      })
    })
  }

  async function submitHandler (_, sectionID, parentSectionID, event) {
    event.preventDefault()
    let someFails = false
    await updateSections(parentSectionID, (sections, parentSection) => {
      let updatedSections = sections.map(section => {
        if (section.id !== sectionID) {
          return section
        }

        let items = section.items

        let [items2, fails] = getItemsWithValidations(
          items,
          parentSection.validators
        )
        items = items2
        someFails = fails.length > 0

        return {
          ...section,
          items,
          fails
        }
      })

      if (someFails) {
        return updatedSections
      }

      updatedSections = updatedSections.map(section => {
        if (section.id !== sectionID) {
          return section
        }

        let items = section.items

        items = savePreviewValuesItems(items)

        return {
          ...section,
          items
        }
      })

      return updatedSections
    })

    if (!someFails) {
      toggleEditorHandler(null, sectionID, parentSectionID, null)
    }
  }

  const parentSectionsComponents = Object.values(parentSections).map(
    parentSection => {
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
    }
  )

  return (
    <main>
      <Header />
      {parentSectionsComponents}
      <Footer />
    </main>
  )
}

export default App
