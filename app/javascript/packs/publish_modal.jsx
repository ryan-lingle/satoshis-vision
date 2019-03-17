import React from 'react';
import Modal from 'react-modal';
import QRCode from 'qrcode.react'
import BtcGif from './images/btc.gif'

Modal.setAppElement('#root-target')

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class PublishModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fetchInvoice: this.props.fetchInvoice,
      invoice: null
    }
  }

  componentWillReceiveProps(props) {
    if (props.fetchInvoice) {
      this.fetchInvoice()
    }
  }

  fetchInvoice = () => {
    const comp = this;
    const data = {
      edits: JSON.stringify(this.props.edits),
    }
    fetch('/api/v1/invoice', {
      method: "POST",
      mode: "cors", // no-cors, cors, *same-origin
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(data),
    }).then(function(response) {
      return response.json()
    }).then(function(res) {
      comp.setState({ invoice: res.invoice })
      App.invoices = App.cable.subscriptions.create({ channel:'InvoicesChannel' },{
        received: function(data) {
          console.log(data.payment_request)
          if (data.payment_request == res.invoice) {
            comp.props.paymentRecieved(data.words)
            App.invoices.unsubscribe()
          }
        }
      })
    })
  }

  buildInvoice = () => {
    return(
      <div className="invoice-wrapper">
        <p>It's gonna cost ya... <strong>{this.props.satoshis} sats</strong></p>
        <QRCode value={this.state.invoice} size={200}/>
        <div style={{display: 'inline-block'}}>{this.state.invoice}</div>
      </div>
    )
  }

  close = () => {
    this.setState({ invoice: null })
    this.props.close()
  }

  render() {
    const invoice = this.state.invoice ? this.buildInvoice() : <img className="btc-gif" src={BtcGif}/>;
    return(
      <Modal
        isOpen={this.props.fetchInvoice}
        onRequestClose={this.close}
        style={customStyles}
      >
        <div className="publish-modal">
          <h1>Pay to Publish</h1>
          {invoice}
          <br></br>
          <br></br>
          Open a Channel With My Node!
          <QRCode value={'02a024ef71b7cace623160f2bf45c8e7080b222ac8019eac3dbfa1ff2ecd629c78@170.75.163.230:9735'} size={200}/>
        </div>
      </Modal>
    )
  }
}
