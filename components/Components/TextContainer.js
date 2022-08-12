import React from 'react'

const TextContainer = ({ children }) => {
    return (
        <div className="select-none staatliches">
            {[...children].map((word, index) => (
                <span
                    key={index}
                    className="text-[17vw] text-gray-100 lg:text-[6.75vw] font-bold hover:text-faded transition-all"
                >
                    {word}
                </span>
            ))}
        </div>
    )
}

export default TextContainer