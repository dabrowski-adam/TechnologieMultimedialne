import React, { Component, Fragment } from 'react'
import './SquareSelectBox.scss'
import PropTypes from "prop-types"
import {Simulate} from "react-dom/test-utils"

interface ISquareSelectBox {
    isSelected: boolean,
    onSelect: any
}

class SquareSelectBox extends Component<ISquareSelectBox> {

    render() {

        const { isSelected, onSelect } = this.props
        const className = `square-box${isSelected ? " square-box-selected" : ""}`
        return (
            <div className={className} onClick={() => onSelect()}>

            </div>
        )
    }
}

export default SquareSelectBox