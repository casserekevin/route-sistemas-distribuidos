import React from 'react';

import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxOption } from '@reach/combobox'
import "@reach/combobox/styles.css";

import { useDispatch } from 'react-redux'
import { setPoint } from '../redux'

import './search.css'

const Search = ({panTo, index}) => {
    //redux
    const dispatch = useDispatch()

    const handleSetPoint = (index, value) => dispatch(setPoint(index, value))

    const { 
        ready, 
        value, 
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => -29.7926, lng: () => -51.156879 },
            radius: 200 * 1000
        }
    })

    return (
        <div className="search">
            <Combobox 
                onSelect={async (address) => {
                    setValue(address, false)
                    clearSuggestions()

                    try {
                        const results = await getGeocode({address})
                        const { lat, lng } = await getLatLng(results[0])
                        panTo({ lat, lng })
                        handleSetPoint(index, {lat: lat, lng: lng})
                    } catch (error) {
                        console.log(error)
                    }
                }}
            >
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disable={!ready.toString()}
                    placeholder="Pesquise um endereço"
                />

                <ComboboxPopover >
                    {status === "OK" && (
                        data.map(({ id, description }) => (
                            <ComboboxOption key={id} value={description}/>
                        ))
                    )}
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}

export default Search