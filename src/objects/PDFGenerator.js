import pdfMake from 'pdfmake'

const ignoredParentSections = ['Download CV']

const fonts = {
  Roboto: {
    normal:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
}

const styles = {
  parentSectionTitle: {
    fontSize: 28,
    bold: true,
    margin: [0, 20, 0, 0]
  },
  sectionTitle: {
    fontSize: 24,
    bold: true,
    margin: [20, 5, 0, 0]
  },
  sectionItemTitle: {
    fontSize: 20,
    bold: true,
    margin: [25, 5, 0, 0]
  },
  sectionItemValue: {
    fontSize: 16,
    bold: false,
    margin: [30, 5, 0, 0]
  }
}

const PDFCurriculum = stateObject => {
  const parentSections = Object.values(stateObject).filter(
    parentSection => !ignoredParentSections.includes(parentSection.title)
  )

  let content = []

  for (let parentSection of parentSections) {
    content.push({ text: parentSection.title, style: 'parentSectionTitle' })

    for (let section of parentSection.sections) {
      if (section.title) {
        content.push({ text: section.title, style: 'sectionTitle' })
      }

      for (let item of section.items) {
        content.push({ text: item.title, style: 'sectionItemTitle' })
        content.push({ text: item.value, style: 'sectionItemValue' })
      }
    }
  }

  pdfMake.createPdf({ content, styles }, null, fonts).download('curriculum.pdf')
}

export default PDFCurriculum
