import React from 'react'

function GenderShe(props) {
    return (
        <div className="item">
        <i className="venus icon"></i>
        <div className="content">{props.userInfo.gender}</div>
        </div>
    )
}

export default GenderShe
