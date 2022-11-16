import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { MdArrowRightAlt } from 'react-icons/md';

import styles from './styles.css';

export interface Props {
    className?: string;
    link: string;
    title?: string;
}

function DownloadInfographicLink(props: Props) {
    const {
        className,
        link,
        title = 'Download infographic',
    } = props;

    return (
        <a
            className={_cs(styles.downloadInfographicLink, className)}
            href={link}
            target="_blank"
            rel="noreferrer noopener"
        >
            {title}
            <MdArrowRightAlt />
        </a>
    );
}

export default DownloadInfographicLink;
