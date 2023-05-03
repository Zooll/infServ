import React, { useState } from 'react';

interface ImageFieldProps {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
}

const ImageField: React.FC<ImageFieldProps> = ({
    src,
    alt = '',
    width = 200,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const imageSize = isExpanded ? '100%' : `${width}px`;
    if (src != "") {
        return (
            <img
                src={src}
                alt={alt}
                width={imageSize}
                onClick={toggleExpand}
            />
        );
    } else {
        return;
    }
};

export default ImageField;