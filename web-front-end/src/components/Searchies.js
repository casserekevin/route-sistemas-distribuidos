import React from 'react'

import Search from './Search'

import { useSelector } from 'react-redux'

const Searchies = (props) => {

    const points = useSelector((state) => state.point.points)

    return(
        <div>
            {points.map((search, index) => {
                return (
                    <Search key={index} index={index} panTo={props.panTo}/>
                )
            })}
        </div>
    )
}

export default Searchies