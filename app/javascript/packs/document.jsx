import React from 'react'

import PublishBox from './publish_box'
import PublishModal from './publish_modal'
import Paragraph from './paragraph'
import IntroModal from './intro_modal'
import imageHelper from './image_helper'

export default class Document extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      words: this.props.words,
      satoshis: 0,
      edits: [],
      fetchInvoice: false,
      flash: false,
    }
  }

  handleChange = (position, value, id) => {
    this.setState((prevState) => {
      const newEdits = prevState.edits
      let newSatoshis = prevState.satoshis

      const presentInEdits = prevState.edits.find((e) => {
        return e.id == id
      })
      if (presentInEdits) {
        presentInEdits.text = value;
      } else {
        newEdits.push({ id: id, text: value });
        newSatoshis += 100;
      }

      return { edits: newEdits, satoshis: newSatoshis }
    })
  }

  closeFlash = () => {
    this.setState({ flash: false })
  }

  buildFlash = () => {
    return(
      <div className="flash">
        <div className="close-flash fa fa-times" onClick={this.closeFlash} ></div>
        <div>Your Edit Has Been Successfully Published.</div>
      </div>
    )
  }

  render() {
    return(
      <div className="container">
        {this.state.flash ? this.buildFlash() : null}
        <IntroModal show={!document.cookie.includes("true")} />
        <PublishBox satoshis={this.state.satoshis} handlePublish={this.handlePublish} />
        {this.buildWords(this.state.words)}
        <PublishModal fetchInvoice={this.state.fetchInvoice}  satoshis={this.state.satoshis} edits={this.state.edits} close={this.closeModal} paymentRecieved={this.paymentRecieved} />
      </div>
    )
  }

  closeModal = () => {
    App.invoices.unsubscribe()
    this.setState({ fetchInvoice: false })
  }



  handlePublish = (event) => {
    if (this.state.satoshis > 0) {
      this.setState({ fetchInvoice: true })
    }
  }

  paymentRecieved = (newWords) => {
    this.setState({ fetchInvoice: false, satoshis: 0, words: newWords, flash: true })
  }















// #########################################################################




  buildWords = (words) => {
    return(
      <div className="word-container">
        <div className="page">
          <h1> Bitcoin: A Peer-to-Peer Electronic Cash System</h1>
          <div className="information">
            Satoshi Nakamoto
            <br></br>
            satoshin@gmx.com
            <br></br>
            www.bitcoin.org
            <br></br>
          </div>
          <div className="abstract">
            <Paragraph words={this.state.words.slice(0, 180)} handleChangeCallback={this.handleChange} boldFirst={true} />
          </div>
          <div className="normal-paragraph">
            <h2> 1.     Introduction </h2>
            <Paragraph words={this.state.words.slice(180, 342)} handleChangeCallback={this.handleChange} />
            <Paragraph words={this.state.words.slice(342, 447)} handleChangeCallback={this.handleChange} indent={true} />
          </div>
          <div className="page-number">1</div>
        </div>
        <div className="page">
          <div className="normal-paragraph">
            <h2>2.     Transactions</h2>
            <Paragraph words={this.state.words.slice(447, 504)} handleChangeCallback={this.handleChange} />
            <img src={imageHelper('first')} alt="chart" width={'360px'}/>
            <Paragraph words={this.state.words.slice(504, 605)} handleChangeCallback={this.handleChange}  indent={true} />
            <Paragraph words={this.state.words.slice(605, 733)} handleChangeCallback={this.handleChange}  indent={true} />
            <h2>3.     Timestamp Server</h2>
            <Paragraph words={this.state.words.slice(733, 813)} handleChangeCallback={this.handleChange}  indent={true} />
            <img src={imageHelper('second')} alt="chart" width={'360px'}/>
          </div>
          <div className="page-number">2</div>
        </div>
        <div className="page">
          <div className="normal-paragraph">
            <h2>4.     Proof-of-Work</h2>
            <Paragraph words={this.state.words.slice(813, 888)} handleChangeCallback={this.handleChange}  />
            <Paragraph words={this.state.words.slice(888, 960)} handleChangeCallback={this.handleChange}  indent={true} />
            <img src={imageHelper('third')} alt="chart" width={'360px'}/>
            <Paragraph words={this.state.words.slice(960, 1090)} handleChangeCallback={this.handleChange} indent={true} />
            <Paragraph words={this.state.words.slice(1090, 1129)} handleChangeCallback={this.handleChange} indent={true} />
            <h2>5.     Network</h2>
            <Paragraph words={this.state.words.slice(1129, 1138)} handleChangeCallback={this.handleChange} />
            <br></br>
            <div className="number-list">
              {[[1138, 1144], [1145, 1152], [1153, 1163], [1164, 1176], [1177, 1192], [1193, 1220]].map((a, i) => {
                return(
                  <div key={i} className="number-item">
                    <span className="number">{i + 1})</span>
                    <Paragraph words={this.state.words.slice(a[0], a[1] + 1)} handleChangeCallback={this.handleChange} />
                  </div>
                )
              })}
            </div>
            <Paragraph words={this.state.words.slice(1221, 1312)} handleChangeCallback={this.handleChange} indent={true} />
          </div>
          <div className="page-number">3</div>
        </div>
        <div className="page">
          <div className="normal-paragraph">

            <Paragraph words={this.state.words.slice(1312, 1369)} handleChangeCallback={this.handleChange} indent={true} />
            <h2>6.     Incentive</h2>
            <Paragraph words={this.state.words.slice(1369, 1457)} handleChangeCallback={this.handleChange} />
            <Paragraph words={this.state.words.slice(1457, 1520)} handleChangeCallback={this.handleChange} indent={true} />
            <Paragraph words={this.state.words.slice(1520, 1605)} handleChangeCallback={this.handleChange} indent={true} />
            <h2>7.     Reclaiming Disk Space</h2>
            <Paragraph words={this.state.words.slice(1605, 1676)} handleChangeCallback={this.handleChange} />
            <img src={imageHelper('fourth')} alt="chart" width={'360px'}/>
            <Paragraph words={this.state.words.slice(1676, 1746)} handleChangeCallback={this.handleChange} indent={true} />
            <div className="page-number">4</div>
          </div>
        </div>
        <div className="page">
          <div className="normal-paragraph">
            <h2>8.     Simplified Payment Verification</h2>
            <Paragraph words={this.state.words.slice(1746, 1844)} handleChangeCallback={this.handleChange} />
            <img src={imageHelper('fifth')} alt="chart" width={'540px'}/>
            <Paragraph words={this.state.words.slice(1844, 1958)} handleChangeCallback={this.handleChange} indent={true} />
            <h2>9.     Combined and Splitting Value</h2>
            <Paragraph words={this.state.words.slice(1958, 2035)} handleChangeCallback={this.handleChange} />
            <img src={imageHelper('sixth')} alt="chart" width={'270px'}/>
            <Paragraph words={this.state.words.slice(2035, 2075)} handleChangeCallback={this.handleChange} indent={true} />
            <div className="page-number">5</div>
          </div>
        </div>
        <div className="page">
          <div className="normal-paragraph">
            <h2>10.     Privacy</h2>
            <Paragraph words={this.state.words.slice(2075, 2181)} handleChangeCallback={this.handleChange} />
            <img src={imageHelper('seventh')} alt="chart" width={'450px'}/>
            <Paragraph words={this.state.words.slice(2181, 2248)} handleChangeCallback={this.handleChange} indent={true} />
            <h2>11.     Calculations</h2>
            <Paragraph words={this.state.words.slice(2248, 2338)} handleChangeCallback={this.handleChange} />
            <Paragraph words={this.state.words.slice(2338, 2391)} handleChangeCallback={this.handleChange} indent={true} />
            <Paragraph words={this.state.words.slice(2391, 2455)} handleChangeCallback={this.handleChange} indent={true} />
            <img src={imageHelper('eighth')} alt="chart" width={'500px'}/>
            <div className="page-number">6</div>
          </div>
        </div>
        <div className="page">
          <div className="normal-paragraph">
            <Paragraph words={this.state.words.slice(2455, 2504)} handleChangeCallback={this.handleChange} />
            <Paragraph words={this.state.words.slice(2504, 2578)} handleChangeCallback={this.handleChange} indent={true} />
            <Paragraph words={this.state.words.slice(2578, 2654)} handleChangeCallback={this.handleChange} indent={true} />
            <Paragraph words={this.state.words.slice(2654, 2710)} handleChangeCallback={this.handleChange} indent={true} />
            <img src={imageHelper('ninth')} alt="chart" width={'500px'}/>
            <Paragraph words={this.state.words.slice(2710, 2745)} handleChangeCallback={this.handleChange} />
            <img src={imageHelper('tenth')} alt="chart" width={'500px'}/>
            <Paragraph words={this.state.words.slice(2745, 2755)} handleChangeCallback={this.handleChange} />
            <img src={imageHelper('eleventh')} alt="chart" width={'550px'}/>
            <Paragraph words={this.state.words.slice(2755, 2759)} handleChangeCallback={this.handleChange} />
            <img src={imageHelper('twelfth')} alt="chart" width={'500px'}/>
            <div className="page-number">7</div>
          </div>
        </div>
        <div className="page">
          <div className="normal-paragraph">
            <Paragraph words={this.state.words.slice(2759, 2772)} handleChangeCallback={this.handleChange} />
            <img src={imageHelper('thirteenth')} alt="chart" width={'500px'}/>
            <Paragraph words={this.state.words.slice(2772, 2778)} handleChangeCallback={this.handleChange} />
            <img src={imageHelper('fourteenth')} alt="chart" width={'500px'}/>
            <h2>12.     Conclusion</h2>
            <Paragraph words={this.state.words.slice(2778, 2957)} handleChangeCallback={this.handleChange} />
          </div>
          <div className="page-number">8</div>
        </div>
      </div>
    )
  }
}
