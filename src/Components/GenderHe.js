import React from 'react'

function GenderHe(props) {
    return (
        <div className="item">
        <i className="mars icon"></i>
        <div className="content">{props.userInfo.gender}</div>
        </div>
    )
}

export default GenderHe
