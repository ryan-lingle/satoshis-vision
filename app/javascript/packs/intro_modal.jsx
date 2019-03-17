import React from 'react'
import Modal from 'react-modal';
import Logo1 from './images/logo1.png';
import Logo2 from './images/logo2.png';
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
      open: true
    }
  }

  close = () => {
    this.setState({ open: false })
  }

  render() {
    return(
      <Modal
        isOpen={this.state.open}
        onRequestClose={this.close}
        style={customStyles}
      >
        <div className="intro-content">
          <div className="intro-top" ><img className="logo" src={Logo1}/><h2>Welcome to Satoshi's Vision&trade;</h2><img className="logo" src={Logo1}/></div>
          <p>
            What is is this? Well for starters its
            definitely not affiliated Bitcoin SV.
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
    )
  }
}