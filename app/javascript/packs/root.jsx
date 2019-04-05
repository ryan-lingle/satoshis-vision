import React from 'react'
import ReactDOM from 'react-dom'
import Document from './document'

const Root = (props) => (
  console.log('root component loaded')
  <Document {...props} />
)

const target = document.getElementById("root-target")
const words = JSON.parse(target.getAttribute('data-words'))
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root words={words} />,
    document.getElementById("root-target"),
  )
})
