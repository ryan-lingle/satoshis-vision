import React from 'react'
import PublishBox from './publish_box'
import PublishModal from './publish_modal'
import Paragraph from './paragraph'
import IntroModal from './intro_modal'

import first from './images/first.png';
import second from './images/second.png';
import third from './images/third.png';
import fourth from './images/fourth.png';
import fifth from './images/fifth.png';
import sixth from './images/sixth.png';
import seventh from './images/seventh.png';
import eighth from './images/eighth.png';
import ninth from './images/ninth.png';
import tenth from './images/tenth.png';
import eleventh from './images/eleventh.png';
import twelfth from './images/twelfth.png';
import thirteenth from './images/thirteenth.png';
import fourteenth from './images/fourteenth.png';


export default class Document extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      words: this.props.words,
      satoshis: 0,
      edits: [],
      paymentRequest: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.paymentRecieved = this.paymentRecieved.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange(position, value, id) {
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


  render() {
    console.log(this.state.edits)
    return(
      <div className="container">
        <IntroModal />
        <PublishBox satoshis={this.state.satoshis} handlePublish={this.handlePublish} />
        {this.buildWords(this.state.words)}
        <PublishModal paymentRequest={this.state.paymentRequest}  satoshis={this.state.satoshis} close={this.closeModal} />
      </div>
    )
  }

  closeModal() {
    App.invoices.unsubscribe()
    this.setState({ paymentRequest: null })
  }



  handlePublish(event) {
    if (this.state.satoshis > 0) {
      const comp = this;
      const data = {
        edits: JSON.stringify(this.state.edits),
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
        comp.setState({ paymentRequest: res })
        App.invoices = App.cable.subscriptions.create({ channel:'InvoicesChannel' },{
          received: function(data) {
            if (data.payment_request == res) {
              comp.paymentRecieved(data.words)
              App.invoices.unsubscribe()
            }
          }
        })
      })
    }
  }

  paymentRecieved(newWords) {
    this.setState({ paymentRequest: null, satoshis: 0, words: newWords })
  }















// #########################################################################




  buildWords(words) {
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
            <img src={first} alt="chart" width={'400px'}/>
            <Paragraph words={this.state.words.slice(504, 605)} handleChangeCallback={this.handleChange}  indent={true} />
            <Paragraph words={this.state.words.slice(605, 733)} handleChangeCallback={this.handleChange}  indent={true} />
            <h2>3.     Timestamp Server</h2>
            <Paragraph words={this.state.words.slice(733, 813)} handleChangeCallback={this.handleChange}  indent={true} />
            <img src={second} alt="chart" width={'400px'}/>
          </div>
          <div className="page-number">2</div>
        </div>
        <div className="page">
          <div className="normal-paragraph">
            <h2>4.     Proof-of-Work</h2>
            <Paragraph words={this.state.words.slice(813, 888)} handleChangeCallback={this.handleChange}  />
            <Paragraph words={this.state.words.slice(888, 960)} handleChangeCallback={this.handleChange}  indent={true} />
            <img src={third} alt="chart" width={'400px'}/>
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
            <img src={fourth} alt="chart" width={'400px'}/>
            <Paragraph words={this.state.words.slice(1676, 1746)} handleChangeCallback={this.handleChange} indent={true} />
            <div className="page-number">4</div>
          </div>
        </div>
        <div className="page">
          <div className="normal-paragraph">
            <h2>8.     Simplified Payment Verification</h2>
            <Paragraph words={this.state.words.slice(1746, 1844)} handleChangeCallback={this.handleChange} />
            <img src={fifth} alt="chart" width={'600px'}/>
            <Paragraph words={this.state.words.slice(1844, 1958)} handleChangeCallback={this.handleChange} indent={true} />
            <h2>9.     Combined and Splitting Value</h2>
            <Paragraph words={this.state.words.slice(1958, 2035)} handleChangeCallback={this.handleChange} />
            <img src={sixth} alt="chart" width={'300px'}/>
            <Paragraph words={this.state.words.slice(2035, 2075)} handleChangeCallback={this.handleChange} indent={true} />
            <div className="page-number">5</div>
          </div>
        </div>
        <div className="page">
          <div className="normal-paragraph">
            <h2>10.     Privacy</h2>
            <Paragraph words={this.state.words.slice(2075, 2181)} handleChangeCallback={this.handleChange} />
            <img src={seventh} alt="chart" width={'500px'}/>
            <Paragraph words={this.state.words.slice(2181, 2248)} handleChangeCallback={this.handleChange} indent={true} />
            <h2>11.     Calculations</h2>
            <Paragraph words={this.state.words.slice(2248, 2338)} handleChangeCallback={this.handleChange} />
            <Paragraph words={this.state.words.slice(2338, 2391)} handleChangeCallback={this.handleChange} indent={true} />
            <Paragraph words={this.state.words.slice(2391, 2455)} handleChangeCallback={this.handleChange} indent={true} />
            <img src={eighth} alt="chart" width={'550px'}/>
            <div className="page-number">6</div>
          </div>
        </div>
        <div className="page">
          <div className="normal-paragraph">
            <Paragraph words={this.state.words.slice(2455, 2504)} handleChangeCallback={this.handleChange} />
            <Paragraph words={this.state.words.slice(2504, 2578)} handleChangeCallback={this.handleChange} indent={true} />
            <Paragraph words={this.state.words.slice(2578, 2654)} handleChangeCallback={this.handleChange} indent={true} />
            <Paragraph words={this.state.words.slice(2654, 2710)} handleChangeCallback={this.handleChange} indent={true} />
            <img src={ninth} alt="chart" width={'550px'}/>
            <Paragraph words={this.state.words.slice(2710, 2745)} handleChangeCallback={this.handleChange} />
            <img src={tenth} alt="chart" width={'550px'}/>
            <Paragraph words={this.state.words.slice(2745, 2755)} handleChangeCallback={this.handleChange} />
            <img src={eleventh} alt="chart" width={'550px'}/>
            <Paragraph words={this.state.words.slice(2755, 2759)} handleChangeCallback={this.handleChange} />
            <img src={twelfth} alt="chart" width={'550px'}/>
            <div className="page-number">7</div>
          </div>
        </div>
        <div className="page">
          <div className="normal-paragraph">
            <Paragraph words={this.state.words.slice(2759, 2772)} handleChangeCallback={this.handleChange} />
            <img src={thirteenth} alt="chart" width={'550px'}/>
            <Paragraph words={this.state.words.slice(2772, 2778)} handleChangeCallback={this.handleChange} />
            <img src={fourteenth} alt="chart" width={'550px'}/>
            <h2>12.     Conclusion</h2>
            <Paragraph words={this.state.words.slice(2778, 2957)} handleChangeCallback={this.handleChange} />
          </div>
          <div className="page-number">8</div>
        </div>
      </div>
    )
  }
}
