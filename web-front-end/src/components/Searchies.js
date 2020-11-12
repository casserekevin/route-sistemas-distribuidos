import React from 'react'

import Search from './Search'

const Searchies = ({route, panTo, setRouteValue}) => {
    return(
        <div>
            {route.map((search, index) => {
                return (
                    <Search key={index} index={index} panTo={panTo} setRouteValue={setRouteValue}/>
                )
            })}
        </div>
    )
}

export default Searchies