import React, { forwardRef } from 'react'
import PhoneInput from 'react-phone-input-2'
import Select from 'react-select'

// Wrapper for PhoneInput
const FocusablePhoneInput = forwardRef((props, ref) => {
    return <PhoneInput {...props} innerRef={ref} />
})

// Wrapper for Select
const FocusableSelect = forwardRef((props, ref) => {
    return <Select {...props} ref={ref} />
})

export { FocusablePhoneInput, FocusableSelect }
