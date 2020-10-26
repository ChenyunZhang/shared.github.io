import React from 'react'

function GenderThey(props) {
    return (
        <div className="item">
        <i className="mercury icon"></i>
        <div className="content">{props.userInfo.gender}</div>
        </div>
    )
}

export default GenderThey
