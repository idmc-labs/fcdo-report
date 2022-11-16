import React, { useState, useEffect } from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

interface ImageLoadProps {
    src?: string;
    srcSet?: string;
}

function useImage(props: ImageLoadProps) {
    const {
        src,
        srcSet,
    } = props;

    const hasImage = src || srcSet;

    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setHasError(false);

        const handleLoad = () => {
            setLoading(false);
            setHasError(false);
        };

        const handleError = () => {
            setLoading(false);
            setHasError(true);
        };

        const image = new Image();
        image.addEventListener('error', handleError);
        image.addEventListener('load', handleLoad);

        if (src) {
            image.src = src;
        }

        if (srcSet) {
            image.srcset = srcSet;
        }

        return () => {
            image.removeEventListener('error', handleError);
            image.removeEventListener('load', handleLoad);
        };
    }, [src, srcSet]);

    return { isLoading: loading, hasError, hasImage };
}

export interface Props {
    className?: string;
    src?: string;
    srcSet?: string;
    alt?: string;
}

function MyImage(props: Props) {
    const {
        className,
        src,
        srcSet,
        alt = '',
    } = props;

    const { isLoading, hasImage } = useImage({ src, srcSet });

    if (!hasImage || isLoading) {
        return (
            <div className={_cs(styles.noImage, className)}>
                Loading...
            </div>
        );
    }

    return (
        <img
            className={_cs(styles.image, className)}
            src={src}
            srcSet={srcSet}
            alt={alt}
        />
    );
}

export default MyImage;
