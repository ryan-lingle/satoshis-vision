import React from 'react';
import Modal from 'react-modal';
import QRCode from 'qrcode.react'
import BtcGif from './images/btc.gif'

const nodeUri = '02a024ef71b7cace623160f2bf45c8e7080b222ac8019eac3dbfa1ff2ecd629c78@170.75.163.230:9735';

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
      invoice: null,
      node: false,
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
        <h1>Pay to Publish</h1>
        <p className="price">Price: <strong>{this.props.satoshis} sats</strong></p>
        <QRCode value={this.state.invoice} size={200}/>
        <br></br>
        <input className="payment-request" id="payment-request" value={this.state.invoice} readOnly={true} />
        <button className="copy-btn" onClick={() => { this.copy('payment-request') }}>Copy Invoice</button>
        <div className="modal-bottom">
          <span>Need a Channel?</span><button className="bottom-btn" onClick={this.toggleNode}>Connect to Toshi.Vision</button>
        </div>
      </div>
    )
  }

  copy = (id) => {
    const invoice = document.querySelector(`#${id}`);
    invoice.select();
    document.execCommand("copy");
  }


  buildNodeInfo = () => {
    return(
      <div>
        <h1>Open a Channel with Toshi.Vision</h1>
        <QRCode value={nodeUri} size={200}/>
        <input className="payment-request" id="node-uri" value={nodeUri} readOnly={true} />
        <button className="copy-btn" onClick={() => { this.copy('node-uri') }}>Copy Node Info</button>
        <div className="modal-bottom">
          <button onClick={this.toggleNode} className="bottom-btn">Go Back to My Invoice</button>
        </div>
      </div>
    )
  }

  close = () => {
    this.setState({ invoice: null })
    this.props.close()
  }

  toggleNode = () => {
    this.setState((prevState) => {
      return { node: !prevState.node }
    })
  }

  render() {
    const invoice = this.state.invoice ? this.buildInvoice() : <img className="btc-gif" src={BtcGif}/>;
    const nodeStuff = this.buildNodeInfo();
    const modalBody = this.state.node ? nodeStuff : invoice;
    return(
      <Modal
        isOpen={this.props.fetchInvoice}
        onRequestClose={this.close}
        style={customStyles}
      >
        <div className="publish-modal">
          {modalBody}
        </div>
      </Modal>
    )
  }
}
