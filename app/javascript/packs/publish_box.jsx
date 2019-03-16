import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'

const PublishBox = (props) => {
  return(
    <div className="side-box-wrapper">
      <div className="side-box">
        <div>
          <span className="sat-amount">{commafy(props.satoshis)}</span>
          <span className="sats">sats</span>
          <div><button className="publish-btn" onClick={props.handlePublish} >⚡ Publish ⚡</button></div>
        </div>
      </div>
    </div>
  )


  function commafy(n) {
    return n.toString().split('').reverse().map((x, i) => {
      return i != 0 && i % 3 == 0 ? x + ',' : x;
    }).reverse().join('')
  }
}

export default PublishBox;
