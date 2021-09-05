const SectionItem = props => {
  const { title, id } = props
  let value = props.value

  if (!value || value.length === 0) {
    value = 'Not set yet'
  }

  return (
    <div key={id} className='section-item view'>
      <h5>{title}</h5>
      <p>{value}</p>
    </div>
  )
}

export const getSectionItemComponent = item => {
  let value = item.value
  if (item.type === 'date') {
    value = item.value.replaceAll('-', '/')
  }
  return (
    <SectionItem title={item.title} value={value} id={item.id} key={item.id} />
  )
}

export default SectionItem
