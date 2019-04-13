import React from 'react'
import Modal from 'react-modal';
import imageHelper from './image_helper';
Modal.setAppElement('#root-target')

const customStyles = {
  content : {
    with                  : '150px',
    top                   : '45%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: '435px',
    padding: '40px 60px',
    lineHeight: '20px',
  }
};

export default class IntroModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.show
    }
  }

  close = () => {
    document.cookie = true;
    this.setState({ open: false })
  }


  open = () => {
    this.setState({ open: true })
  }

  render() {
    return(
      <div>
        <div className="intro-btn fa fa-question-circle" onClick={this.open}></div>
        <Modal
          isOpen={this.state.open}
          onRequestClose={this.close}
          style={customStyles}
        >
          <button className="close-modal intro-close fa fa-times-circle" onClick={this.close}></button>
          <div className="intro-content">
            <div className="intro-top" ><img className="logo" src={imageHelper('logo1')}/><h2>Welcome to Satoshi's Vision&trade;</h2><img className="logo" src={imageHelper('logo1')}/></div>
            <div className="text-center">By <a href="https://twitter.com/i_amm_nobody">Chef Nobody</a></div>
            <p>
              What is is this? Well for starters, it's
              certainly not affiliated with the <strong>Fraudulant</strong> Craig Wright.
            </p>
            <p>
              Inspired by
              <a className="inline-link" href="https://satoshis.place/">Satoshi's Place</a>,
              <strong> Satoshi's Vision&trade;</strong> is a place where Bitcoiners
              can put their Sats where their mouth is and make an edit
              to the sacred text itself, the Bitcoin White-Paper.
            </p>
            <p><strong>
              The rules are simple: 100 Sats per edited word.
            </strong></p>
            <p>
              Having delusions of being the one true profit of Satoshi's Vision?
              Vent it all out here and spare yourself from creating yet another
              useless Bitcoin fork that will certainly go to zero.
            </p>
            <p>
              Please nothing too blasphemous. He might be watching...
            </p>
          </div>
        </Modal>
      </div>
    )
  }
}
