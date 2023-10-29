import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import trash from '../assets/delete.png'
import edit from '../assets/edit.png'

function DetailCard(props) {


    const {item, id, popFunction , editFunction} = props

    return (
        <div id='DetailCard'>
            <div className="collegeName">
                <p>{item.name}</p>
            </div>
            <div className="country">
                <p>{item.country}</p>
            </div>
            <div className="web">
                <p>{item.web_pages[0]}</p>
            </div>
            <div className="functions">
                <div className="delete">
                    <img onClick={() => popFunction(id)} src={trash} alt="Delete" />
                </div>
                <div className="edit">
                    <img onClick={() => editFunction(id)} src={edit} alt="Edit" />
                </div>
            </div>
        </div>
    )
}

export default DetailCard
