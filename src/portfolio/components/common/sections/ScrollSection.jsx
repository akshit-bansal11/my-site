import React from "react";

function ScrollSection({ id = '', children = null, className = '' }) {
    return (
        <section
            id={id}
            className={`
                flex w-full flex-col lg:gap-6 md:gap-4 gap-2 lg:p-5 p-3
                ${className}
            `}
        >
            {children}
        </section>
    );
}

export default ScrollSection;
