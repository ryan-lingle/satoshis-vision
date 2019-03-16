import React from 'react';
import Modal from 'react-modal';
import QRCode from 'qrcode.react'

Modal.setAppElement('#root-target')

const customStyles = {
  content : {
    with                  : '150px',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const PublishModal = (props) => {
  return(
    <Modal
      isOpen={props.paymentRequest != null}
      onRequestClose={props.close}
      style={customStyles}
    >
      <div className="publish-modal">
        <h1>Pay to Publish</h1>
        <p>Your edits will cost: {props.satoshis} sats</p>
        { props.paymentRequest ? <QRCode value={props.paymentRequest} /> : null}
      </div>
    </Modal>
  )
}

export default PublishModal;
