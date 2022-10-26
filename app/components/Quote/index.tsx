import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

interface Props {
    className?: string;
    quote: string;
    author: string;
}

function Quote(props: Props) {
    const {
        className,
        quote,
        author,
    } = props;

    return (
        <div className={_cs(styles.quote, className)}>
            <div className={styles.quoteIconWrapper}>
                <div className={styles.quoteIcon}>“</div>
            </div>
            <p className={_cs(styles.text, styles.mainQuote)}>
                {quote}
            </p>
            <p className={_cs(styles.text, styles.author)}>{author}</p>
        </div>
    );
}

export default Quote;
