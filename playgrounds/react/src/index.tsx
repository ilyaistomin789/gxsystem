import React from 'react'
import ReactDOM from 'react-dom'

import { Select } from '@gxsys/react'

import '@gxsys/scss/lib/Utilities.css'
import '@gxsys/scss/lib/Text.css'
import '@gxsys/scss/lib/Margin.css'
import '@gxsys/scss/lib/Select.css'
import '@gxsys/scss/lib/global.css'

const options = [{
    label: 'Strict Black',
    value: 'strict-black'
}, {
    label: 'Heavenly Green',
    value: 'heavenly-green'
}, {
    label: 'Sweet Pink',
    value: 'pink'
}]

ReactDOM.render(
    <div style={{ padding: '40px' }}>
        <Select options={options} />
    </div>,
    document.querySelector('#root')
)

// <Select label='Please select a size' onOptionSelected={console.log} options={[{ label: '', value: '' }]} />
