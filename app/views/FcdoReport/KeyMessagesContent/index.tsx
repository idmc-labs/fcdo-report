import React, { useCallback } from 'react';
import { List } from '@togglecorp/toggle-ui';

import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

interface Description {
    key: string;
    description: React.ReactNode;
}

const itemKeySelector = (item: Description) => item.key;

interface ItemProps {
    className?: string;
    order: string;
    description: React.ReactNode;
}

function Item(props: ItemProps) {
    const {
        className,
        order,
        description,
    } = props;

    return (
        <div className={_cs(className, styles.keyMessageContent)}>
            {order}
            <div className={styles.keyMessageVl}>
                <div className={styles.keyMessageDescription}>
                    {description}
                </div>
            </div>
        </div>
    );
}

interface Props {
    className?: string;
    data: Description[];
}

function KeyMessagesContent(props: Props) {
    const {
        className,
        data,
    } = props;

    const itemRendererParams = useCallback((key: string, item: Description) => ({
        order: item.key,
        itemKey: key,
        description: item.description,
    }), []);

    return (
        <div className={_cs(className, styles.keyMessageContainer)}>
            <List
                data={data}
                renderer={Item}
                rendererParams={itemRendererParams}
                keySelector={itemKeySelector}
            />
        </div>
    );
}

export default KeyMessagesContent;
