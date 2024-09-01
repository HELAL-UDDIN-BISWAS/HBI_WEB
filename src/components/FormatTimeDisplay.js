const FormatTimeDisplay = ({ time }) => {
    if (!time) {
        return ''
    }

    const [hours, minutes] = time.split(':')
    const date = new Date()
    date.setHours(hours, minutes)

    if (isNaN(date.getTime())) {
        return ''
    }

    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })
}

export default FormatTimeDisplay
