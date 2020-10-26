import React from 'react'

function GenderNotosay(props) {
    return (
        <div className="item">
        <i className="user secret icon"></i>
        <div className="content">{props.userInfo.gender ? props.userInfo.gender : "I prefer not to say"}</div>
        </div>
    )
}

export default GenderNotosay
