import React from 'react'
import Word from './word'

export default class Paragraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      words: this.props.words
    }

    this.handleClick = this.handleClick.bind(this)
    this.selectWord = this.selectWord.bind(this)
    this.unselectAndChangeWord = this.unselectAndChangeWord.bind(this)
  }


  handleClick(event) {

    const target = event.target;
    const id = target.getAttribute('id');
    const position = target.getAttribute('position');
    const text = target.innerText;


    const clickListen = (event) => {
      if (id != event.target.getAttribute('id')) {
        document.removeEventListener('click', clickListen)
        document.removeEventListener('keypress', enterListen)

        const val = document.getElementById(id).value
        this.unselectAndChangeWord(position, val, id)
      }
    }

    const enterListen = (event) => {
      if (event.key == 'Enter') {
        document.removeEventListener('click', clickListen)
        document.removeEventListener('keypress', enterListen)

        const val = document.getElementById(id).value
        this.unselectAndChangeWord(position, val, id)
      } else if (event.keyCode == 32) {
        document.removeEventListener('click', clickListen)
        document.removeEventListener('keypress', enterListen)

        const nextWord = document.getElementById(parseInt(id) + 1);
        if (nextWord) {
          nextWord.click()
        }

        const val = document.getElementById(id).value
        this.unselectAndChangeWord(position, val, id)
      }
    }

    document.addEventListener('click', clickListen)
    document.addEventListener('keypress', enterListen)

    this.selectWord(position)
  }

  selectWord(position) {
    const newWords = this.state.words;
    newWords[position].selected = true;
    this.setState({words: newWords})
  }

  unselectAndChangeWord(position, value, id) {
    this.setState((prevState) => {
      const newWords = prevState.words

      newWords[position].selected = false;

      if (prevState.words[position].text != value) {
        newWords[position].text = value;
        this.props.handleChangeCallback(position, value, id)
      }

      return { words: newWords }
    })
  }


  render() {
    const words = this.state.words.map((word, i) => {
      return(
        <Word key={word.id} {...word} handleClick={this.handleClick} index={i} boldFirst={this.props.boldFirst} />
      )
    })

    return(
      <p>
        {this.props.indent ? "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0": ""}
        {words}
      </p>
    )
  }
}
