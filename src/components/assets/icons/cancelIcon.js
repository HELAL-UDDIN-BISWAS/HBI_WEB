function CancelIcon() {
    return (
        <svg 
        width="20" 
        height="20" 
        className="cancel-icon"
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <path
        className="circle-path"
        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" 
        stroke="#E94C40" 
        strokeWidth="1.25" 
        strokeMiterlimit="10"
        />
        <path 
        className="cross-path"
        d="M6 14.0703L14 6.07031" 
        stroke="#E94C40" 
        strokeWidth="1.25" 
        strokeLinecap="round" 
        strokeLinejoin="round"/>
        </svg>
    )
}

export default CancelIcon;