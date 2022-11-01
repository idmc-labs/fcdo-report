import React, { useCallback, useRef, useEffect } from 'react';
import { _cs, isDefined } from '@togglecorp/fujs';

import useBooleanState from '#hooks/useBooleanState';
import { List, RawButton } from '@togglecorp/toggle-ui';

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
    active?: boolean;
    itemKey: string;
    onItemClick?: (itemKey: string) => void;
}

function Item(props: ItemProps) {
    const {
        className,
        order,
        description,
        active = false,
        itemKey,
        onItemClick,
    } = props;

    const itemRef = useRef<HTMLButtonElement>(null);
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

    const handleItemClick = useCallback(() => {
        if (onItemClick) {
            onItemClick(itemKey);
        }
    }, [
        onItemClick,
        itemKey,
    ]);

    return (
        <RawButton
            elementRef={itemRef}
            name={itemKey}
            onClick={handleItemClick}
            className={_cs(
                styles.wayForwardListItem,
                className,
                isAnimationShown && styles.animate,
                isDefined(onItemClick) && styles.clickable,
            )}
            disabled={!isDefined(onItemClick)}
        >
            <div className={styles.order}>
                {order}
            </div>
            <div
                className={styles.description}
            >
                {description}
            </div>
            {onItemClick && (
                <div>
                    {active ? '>' : ' '}
                </div>
            )}
        </RawButton>
    );
}

interface Props {
    className?: string;
    data: Description[];
    onItemClick?: (itemKey: string) => void;
    selectedItem?: string;
}

function WayForwardContent(props: Props) {
    const {
        className,
        data,
        selectedItem,
        onItemClick,
    } = props;

    const itemRendererParams = useCallback((key: string, item: Description) => ({
        order: item.key,
        itemKey: key,
        description: item.description,
        className: _cs(
            styles.item,
            selectedItem === key && styles.active,
        ),
        active: selectedItem === key,
        image: item.image,
        onItemClick,
    }), [
        onItemClick,
        selectedItem,
    ]);

    return (
        <div className={_cs(className, styles.wayForwardContent)}>
            <List
                data={data}
                renderer={Item}
                rendererParams={itemRendererParams}
                keySelector={itemKeySelector}
            />
        </div>
    );
}

export default WayForwardContent;
