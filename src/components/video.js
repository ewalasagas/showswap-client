import React from 'react';
import ReactDOM from 'react-dom';

const Video = props => {
    return (
        <div className="header__video_container">
          <video style={{objectFit: 'cover', width: `100vw`, height: `100vh`, top: 0, left: 0}} autoPlay loop muted src={props.video} type="video/pm4" className="video"/> 
        </div>
    )
}

export default Video;