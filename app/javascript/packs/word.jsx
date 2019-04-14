import React from 'react'

export default class Word extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text,
      edited: this.props.edited
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const data = event.nativeEvent.data
    const val = event.target.value
    if (this.validate(data)) {
      this.setState({ text: val, edited: true })
    }
  }

  validate(data) {
    return data == null || "qwertyuiopasdfghjklzxcvbnm,.?!-1234567890#$%*+=><:'".includes(data.toLowerCase())
  }


  render() {
    if (this.props.selected) {
      return(
        <span
          key={this.props.id}
          className="input-wrap">
          <input
            autoFocus={true}
            style={{width: (this.state.text.length * 0.7) + 'em'}}
            className={`word-input input-${this.props.id}`}
            type="text"
            position={this.props.index}
            id={this.props.id}
            onChange={this.handleChange}
            value={this.state.text}
            onKeyPress={(e) => {e.target.style.width = (e.target.value.length  * 0.7)+ 'em';}}/>
        </span>
      )
    } else {
      return(
        <span
          className={`word-wrap ${this.state.edited ? 'edited' : null}`}
          key={this.props.id}
          id={this.props.id}
          position={this.props.index}
          onClick={this.props.handleClick}
          style={this.props.boldFirst && this.props.index == 0 ? {fontWeight: 'bold'} : {}}
        >
          {this.state.text}
        </span>
      )
    }
  }

}
