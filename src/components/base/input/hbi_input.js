import React, { useEffect, useRef, useState } from 'react'
import Select, { components } from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { MdArrowDropDown } from 'react-icons/md'
import HBIRequireFieldIcon from '../text/hbi_require_field_icon'
import HBIErrorText from '../text/hbi_error_text'

const PrimaryInput = ({
    icon,
    name,
    isRequired = false,
    register,
    label = '',
    error = false,
    errorMessage = '',
    placeholder = '',
    width = '542px',
    height = '60px',
    bgColor = '#FAFAFA',
    color = '#ffffff',
    radius = '8px',
    borderColor = 'none',
    isIconleft = false,
    isIconRight = false,
    fontSize = 16,
    fontWeight = 400,
    letterSpacing = '0.03em',
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = '16px',
    inputTextColor = '#222',
    placeholderColor = '#849098',
    options = [],
    isSelect = false,
    isDate = false,
    isTime = false,
    value = '',
    handleChange,
    marginBottom = '',
    boxShadow = '',
    selectedValue = '',
    defaultValue = '',
    ...rest
}) => {
    const defaultStyles = {
        inputContainer: {
            position: 'relative',
            width: width,
            height: height,
        },
        iconLeft: {
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
        },
        iconRight: {
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
        },
        input: {
            borderRadius: radius,
            width: width,
            height: height,
            backgroundColor: bgColor,
            border: borderColor,
            paddingTop: paddingTop,
            paddingRight: paddingRight,
            paddingBottom: paddingBottom,
            paddingLeft: paddingLeft,
            color: inputTextColor,
            fontSize: fontSize,
            fontWeight: fontWeight,
            marginBottom: '4px',
            outline: 'none',
            '&::placeholder': {
                color: placeholderColor,
            },
            boxShadow: boxShadow,
        },
        pickerContainer: {
            display: 'flex',
            position: 'absolute',
            top: `${height + 10}px`,
            right: '16px',
            zIndex: 1,
            width: width,
            backgroundColor: '#fff',
            border: 'none',
            alignItems: 'center',
            justifyContent: 'end',
        },
    }
    const [selectedDateTime, setSelectedDateTime] = useState(null)
    const [showPicker, setShowPicker] = useState(false)
    const pickerRef = useRef(null)

    const handleIconClick = () => {
        if (icon && isIconRight) {
            setShowPicker((prev) => !prev)
        }
    }

    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setShowPicker(false)
        }
    }

    const getFormattedValue = () => {
        if (isDate && selectedDateTime) {
            return format(selectedDateTime, 'MM/dd/yyyy')
        }
        if (isTime && selectedDateTime) {
            return format(selectedDateTime, 'h:mm aa')
        }
        return ''
    }

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <MdArrowDropDown size={20} color="#8898AA" />
            </components.DropdownIndicator>
        )
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <>
            <div className="d-flex" style={{ marginBottom: marginBottom }}>
                {label && <label htmlFor={name}>{label}</label>}
                {isRequired && <HBIRequireFieldIcon />}
            </div>
            <div style={defaultStyles.inputContainer}>
                {isIconleft && <div style={defaultStyles.iconLeft}>{icon}</div>}
                {isSelect ? (
                    <Select
                        components={{ DropdownIndicator }}
                        isSearchable={false}
                        options={options}
                        placeholder={placeholder}
                        styles={{
                            valueContainer: (provided, state) => ({
                                ...provided,
                                color: '#849098',
                                fontSize: '14px',
                                fontWeight: 400,
                                borderRadius: '8px',
                                border: 'none',
                                paddingLeft: '10px',
                                paddingRight: '0px',
                                '&:hover': {
                                    backgroundColor: '#fff',
                                },
                            }),
                            control: (base) => ({
                                ...base,
                                boxShadow: boxShadow,
                                borderRadius: radius,
                                color: inputTextColor,
                                marginBottom: '4px',
                                border: 'none',
                                outline: 'none',
                                '&:hover': {
                                    border: 'none',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    borderColor: '#dee2e6',
                                },
                            }),
                            indicatorSeparator: () => ({
                                display: 'none',
                            }),
                            option: (
                                styles,
                                { data, isDisabled, isFocused, isSelected }
                            ) => {
                                return {
                                    ...styles,
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    borderBottom: '0px',
                                    borderTop: '0px',
                                    cursor: 'pointer',
                                    color: isSelected
                                        ? 'rgba(0, 0, 0, 1)'
                                        : 'rgba(0, 0, 0, 1)',
                                    backgroundColor: isSelected
                                        ? 'rgba(242, 255, 254, 1)'
                                        : '#FFF',
                                    ':hover': {
                                        backgroundColor:
                                            'rgba(242, 255, 254, 1)',
                                    },
                                }
                            },
                        }}
                        {...register}
                        {...rest}
                        onChange={handleChange}
                        value={selectedValue}
                    />
                ) : isDate || isTime ? (
                    <>
                        <input
                            placeholder={placeholder}
                            style={defaultStyles.input}
                            value={getFormattedValue()}
                            readOnly
                            onClick={handleIconClick}
                            {...rest}
                            defaultValue={defaultValue}
                        />
                        {showPicker && (
                            <div
                                ref={pickerRef}
                                style={defaultStyles.pickerContainer}
                            >
                                <DatePicker
                                    selected={selectedDateTime}
                                    onChange={(date) => {
                                        setSelectedDateTime(date)
                                        setShowPicker(false)
                                    }}
                                    inline
                                    showTimeSelect={isTime}
                                    showTimeSelectOnly={isTime}
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat={
                                        isTime ? 'h:mm aa' : 'MMMM d, yyyy'
                                    }
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <input
                        placeholder={placeholder}
                        style={defaultStyles.input}
                        value={value}
                        onChange={handleChange}
                        defaultValue={defaultValue}
                        {...register}
                        {...rest}
                    />
                )}

                {isIconRight && (
                    <div
                        style={defaultStyles.iconRight}
                        onClick={handleIconClick}
                    >
                        {icon}
                    </div>
                )}
                {error && <HBIErrorText text={errorMessage} />}
            </div>
        </>
    )
}

export default PrimaryInput
