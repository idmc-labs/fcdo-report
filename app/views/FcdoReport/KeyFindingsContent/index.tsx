import React, { useCallback, useRef, useEffect } from 'react';
import { _cs, isDefined } from '@togglecorp/fujs';

import useBooleanState from '#hooks/useBooleanState';
import { List, Button } from '@togglecorp/toggle-ui';

import {
} from '../data';

import styles from './styles.css';

interface Description {
    key: string;
    description: React.ReactNode;
    image?: React.ReactNode;
}

const itemKeySelector = (item: Description) => item.key;

interface ItemProps {
    className?: string;
    order: string;
    description: React.ReactNode;
    itemKey: string;
    onItemClick?: (itemKey: string) => void;
}

function Item(props: ItemProps) {
    const {
        className,
        order,
        description,
        itemKey,
        onItemClick,
    } = props;

    const itemRef = useRef<HTMLDivElement>(null);
    const [
        isAnimationShown,
        addAnimation,
        removeAnimation,
    ] = useBooleanState(false);

    const handleScroll = useCallback(() => {
        if (!itemRef.current) {
            return;
        }
        const itemPosition = itemRef.current.getBoundingClientRect().top;

        if (itemPosition < window.innerHeight) {
            addAnimation();
        } else {
            removeAnimation();
        }
    }, [
        addAnimation,
        removeAnimation,
    ]);

    useEffect(() => {
        const fcdoReport = document.getElementById('fcdo-report');

        fcdoReport?.addEventListener('scroll', handleScroll, false);

        return () => {
            fcdoReport?.removeEventListener('scroll', handleScroll, false);
        };
    }, [handleScroll]);

    return (
        <div className={styles.keyFindingsContainer}>
            <div
                ref={itemRef}
                className={_cs(
                    styles.keyFindingsListItem,
                    className,
                    isAnimationShown && styles.animate,
                )}
            >
                <div className={styles.order}>
                    {order}
                </div>
                {isDefined(onItemClick) && (
                    <Button
                        name={itemKey}
                        className={styles.description}
                        onClick={onItemClick}
                        type="button"
                    >
                        {description}
                    </Button>
                )}
            </div>
        </div>
    );
}

interface Props {
    className?: string;
    data: Description[];
    onItemClick?: (itemKey: string) => void;
}

function KeyFindingsContent(props: Props) {
    const {
        className,
        data,
        onItemClick,
    } = props;

    const itemRendererParams = useCallback((key: string, item: Description) => ({
        order: item.key,
        itemKey: key,
        description: item.description,
        className: styles.item,
        image: item.image,
        onItemClick,
    }), [onItemClick]);

    return (
        <div className={_cs(className, styles.keyFindingsContent)}>
            <List
                data={data}
                renderer={Item}
                rendererParams={itemRendererParams}
                keySelector={itemKeySelector}
            />
        </div>
    );
}

export default KeyFindingsContent;
