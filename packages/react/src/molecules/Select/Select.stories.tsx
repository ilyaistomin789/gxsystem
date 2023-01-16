import React from 'react'
import Select from './Select'
import { withA11Y } from '@storybook/addon-a11y'

// css
import '@gxsys/scss/lib/Select.css'

const options = [{
    label: 'Strict Black',
    value: 'black'
}, {
    label: 'Heavenly Green',
    value: 'green'
}, {
    label: 'Sweet Pink',
    value: 'pink'
}]

export default {
    title: 'Molecules|Select',
    decorators: [withA11Y]
}

export const Common = () => <Select options={options} />

export const RenderOption = () =>
    <Select options={options} />

export const CustomLabel = () => <Select label='Select a color' options={options} />
