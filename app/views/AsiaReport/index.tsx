import React, { useCallback, useState, useMemo } from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    MdPictureAsPdf,
    MdArrowRightAlt,
    MdArrowLeft,
    MdMenu,
} from 'react-icons/md';
import {
    IoLogoFacebook,
    IoLogoTwitter,
    IoLogoLinkedin,
    IoLogoYoutube,
} from 'react-icons/io5';
import { SelectInput } from '@togglecorp/toggle-ui';

import Button from '#components/Button';
import Header from '#components/Header';
import TextOutput from '#components/TextOutput';
import ButtonLikeLink from '#components/ButtonLikeLink';
import Carousel from '#components/Carousel';
import CarouselItem from '#components/Carousel/CarouselItem';
import CarouselButton from '#components/Carousel/CarouselButton';
import useBooleanState from '#hooks/useBooleanState';

import idmcLogo from '#resources/img/idmc-white.svg';
import heroImage from '#resources/img/hero.jpg';
import bookCover from '#resources/img/book-cover.png';

import {
    heroParagraph1,
    heroParagraph2,
    internallyDisplacedParagraph1,
    internallyDisplacedParagraph2,
    internallyDisplacedParagraph3,
    estimatingEducationParagraph1,
    estimatingEducationParagraph2,
    estimatingEducationParagraph3,
    qualityEducationQuote1,
    qualityEducationQuote2,
    qualityEducationParagraph1,
    qualityEducationParagraph2,
    qualityEducationParagraph3,
    wayForwardParagraph1,
    contactParagraph,
    copyrightParagraph,
    dataInternallyDisplacedDescription1,
    dataInternallyDisplacedDescription2,
    reportLink,
    pressReleaseLink,
    idmcAddress,
    wayForwardListItem1,
    wayForwardListItem2,
    wayForwardListItem3,
    wayForwardListItem4,
    conclusionDescription,
    heroParagraph4,
    heroParagraph3,
} from './data';
import WayForwardContent from './WayForwardContent';

import styles from './styles.css';

const sectionOptions = [
    {
        key: 'foreward',
        label: 'Foreword',
        startPage: '7',
    },
    {
        label: 'Key Messages and Findings',
        key: 'Key Messages and Findings',
        startPage: '8',
    },
    {
        label: 'Introduction',
        key: 'Introduction',
        startPage: '9',
    },
    {
        label: 'Definitions, Methodological Considerations, and Caveats',
        key: 'Definitions, Methodological Considerations, and Caveats',
        startPage: '9',
    },
    {
        label: 'Part 1: Internal Displacement Trends in Asia and the Pacific (2010−2021)',
        key: 'Part 1: Internal Displacement Trends in Asia and the Pacific (2010−2021)',
        startPage: '10',
    },
    {
        label: 'Part 2: Measuring the Social and Economic Impacts of Disaster Displacement in Asia and the Pacific',
        key: 'Part 2: Measuring the Social and Economic Impacts of Disaster Displacement in Asia and the Pacific',
        startPage: '28',
    },
    {
        label: 'Part 3: Understanding Displacement in Disaster Prevention, Response, and Recovery',
        key: 'Part 3: Understanding Displacement in Disaster Prevention, Response, and Recovery',
        startPage: '37',
    },
    {
        label: 'Part 4: Addressing Disaster Displacement: Progress in Policy and the Way Forward',
        key: 'Part 4: Addressing Disaster Displacement: Progress in Policy and the Way Forward',
        startPage: '45',
    },
    {
        label: 'Conclusion',
        key: 'Conclusion',
        startPage: '52',
    },
    {
        label: 'Appendix',
        key: 'Appendix',
        startPage: '53',
    },
];

const keyFindings = [
    {
        key: '1',
        description: 'There were 14 millons IDPs aged five to 17 in the 13 countries studied at the end of 2021.* Thirteen million had been displaced by conflict and violence and million by disasters.',
    },
    {
        key: '2',
        description: 'Afghanistan, the Democractic Republic of the Congo and Syria had the highest number of school-aged IDPs, with two million, 1.9 and 1.7 million respectively.',
    },
    {
        key: '3',
        description: 'More than nice million internally displaced children could be at risk of missing out on education because they did not receive support through humanitarian response plans in 2021.',
    },
    {
        key: '4',
        description: 'We estimate the average cost of providing one IDP with education support via humanitarian response plans for a year to be between $82 and $93.',
    },
    {
        key: '5',
        description: 'The cost of providing a year’s education support for all school-aged IDPs in the 13 countries studied would be between $1.1 billion and $1.3 billion.',
    },
];

const keyMessages = [
    {
        key: '1',
        description: 'Internal displacement affects children’s access to education, it’s quality and their learning outcomes. These impacts vary depending on a child’s gender, disability status and other characteristics.',
    },
    {
        key: '2',
        description: 'There are no internationally comparable figures on IDPs’ school attendance and completion, learning outcomes or out-of-school rates, but such information is vital to planning and costing effective responses.',
    },
    {
        key: '3',
        description: 'Governments are primarily responsible for the provision of IDPs’ education and related data collection. They should adapt their education data systems to identify IDPs safely and monitor their education needs more systematically.',
    },
    {
        key: '4',
        description: 'Goverments and humanitarian and development organisations need to coordinate better and standardise the definitions and indicators they use if data gaps are to be filled.',
    },
    {
        key: '5',
        description: 'The region already has successful initiatives to prevent, monitor, respond to and end disaster displacement that can inform future action.',
    },
];

const sectionKeySelector = (section: { key: string }) => section.key;
const sectionLabelSelector = (section: { label: string }) => section.label;

interface Props {
    className?: string;
}

function AsiaReport(props: Props) {
    const {
        className,
    } = props;

    const [selectedSection, setSelectedSection] = useState<string | undefined>(undefined);
    const [isNavShown, , , , toggleNavVisibility] = useBooleanState(false);

    const pageSuffix = useMemo(() => {
        const selectedSectionObj = sectionOptions.find(
            (section) => section.key === selectedSection,
        );
        if (!selectedSectionObj) {
            return '';
        }
        return `#page=${selectedSectionObj.startPage}`;
    }, [selectedSection]);

    const handleNavClick = useCallback((itemHash) => {
        const elementToScrollTo = document.getElementById(itemHash);

        if (elementToScrollTo) {
            elementToScrollTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);
    const [visibleItems, setVisibleItems] = useState(2);
    const debounceTimeoutRef = React.useRef<number>();
    React.useEffect(() => {
        const onNumberOfVisibleItemsChange = () => {
            window.clearTimeout(debounceTimeoutRef.current);
            debounceTimeoutRef.current = window.setTimeout(() => {
                const width = document.documentElement.clientWidth;
                if (width < 720) {
                    setVisibleItems(1);
                    // } else if (width < 1200) {
                    //     setVisibleItems(2);
                } else {
                    setVisibleItems(2);
                }
            }, 200);
        };

        window.addEventListener('resize', onNumberOfVisibleItemsChange);
        onNumberOfVisibleItemsChange();

        return () => {
            window.removeEventListener('resize', onNumberOfVisibleItemsChange);
        };
    }, []);

    return (
        <div
            id="asia-report"
            className={_cs(styles.asiaReport, className)}
        >
            <nav className={styles.nav}>
                <div className={styles.leftContainer}>
                    <ButtonLikeLink
                        className={styles.button}
                        href="https://www.internal-displacement.org"
                        target="_blank"
                        icons={(
                            <MdArrowLeft />
                        )}
                        rel="noreferrer noopener"
                    >
                        Back to IDMC Website
                    </ButtonLikeLink>
                    <Button
                        className={styles.menu}
                        name="toggle"
                        onClick={toggleNavVisibility}
                        variant="transparent"
                    >
                        <MdMenu />
                    </Button>
                </div>
                <div
                    className={_cs(
                        styles.navItemsContainer,
                        isNavShown && styles.navShown,
                    )}
                >
                    <Button
                        name="at-a-glance"
                        onClick={handleNavClick}
                        className={styles.navItem}
                        variant="transparent"
                    >
                        At a glance
                    </Button>
                    <Button
                        name="key-findings"
                        onClick={handleNavClick}
                        className={styles.navItem}
                        variant="transparent"
                    >
                        Key messages and findings
                    </Button>
                    <Button
                        name="explore-the-data"
                        onClick={handleNavClick}
                        className={styles.navItem}
                        variant="transparent"
                    >
                        Explore the data
                    </Button>
                    <Button
                        name="download-report"
                        onClick={handleNavClick}
                        className={styles.navItem}
                        variant="transparent"
                    >
                        Download report
                    </Button>
                </div>
            </nav>
            <section className={_cs(styles.hero, styles.section)}>
                <div className={_cs(styles.heroContent, styles.sectionContent)}>
                    <img
                        className={styles.logo}
                        src={idmcLogo}
                        alt=""
                    />
                    <Header
                        headingClassName={styles.heading}
                        heading="Estimating and costing IDPs’ access to education"
                        headingDescription={undefined}
                        headingDescriptionClassName={styles.headingDescription}
                        headingSize="large"
                        hideHeadingBorder
                    />
                    <div className={styles.description}>
                        <p className={styles.descriptionParagraph}>
                            {heroParagraph1}
                        </p>
                        <p className={styles.descriptionParagraph}>
                            {heroParagraph2}
                        </p>
                        <p className={styles.descriptionParagraph}>
                            {heroParagraph3}
                        </p>
                        <p className={styles.descriptionParagraph}>
                            {heroParagraph4}
                        </p>
                    </div>
                    <footer className={styles.heroFooter}>
                        <img
                            className={styles.logo}
                            src={idmcLogo}
                            alt=""
                        />
                    </footer>
                </div>
            </section>
            <section
                id="key-findings"
                className={_cs(styles.keyMessages, styles.section)}
            >
                <div className={_cs(styles.keyMessagesContent, styles.sectionContent)}>
                    <Header
                        heading="At a glance"
                        headingSize="large"
                    />
                    <Header
                        heading="Key Messages"
                        headingSize="large"
                    />
                    <WayForwardContent
                        data={keyMessages}
                    />
                </div>
            </section>
            <section className={_cs(styles.keyFindings, styles.section)}>
                <div className={_cs(styles.keyFindingsContent, styles.sectionContent)}>
                    <Header
                        heading="Key Findings*"
                        headingSize="large"
                    />
                    <WayForwardContent
                        data={keyFindings}
                    />
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={heroImage}
                    className={styles.background}
                    alt=""
                />
                {/* This code is needed for other Image caption */}
                {/* <div className={styles.imageCaption}>
                    {pakistanCaption}
                    <div>
                        {pakistanSubCaption}
                    </div>
                </div> */}
            </div>
            <section
                className={_cs(styles.costOfDisaster, styles.section)}
                id="internally-displaced"
            >
                <div className={_cs(styles.sectionContent)}>
                    <Header
                        heading="Why are internally displaced children invisible?"
                        headingSize="large"
                    />
                    <div className={styles.topContainer}>
                        <div className={styles.description}>
                            <p className={styles.descriptionParagraph}>
                                {internallyDisplacedParagraph1}
                            </p>
                            <p className={styles.descriptionParagraph}>
                                {internallyDisplacedParagraph2}
                            </p>
                            <p className={styles.descriptionParagraph}>
                                {internallyDisplacedParagraph3}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className={_cs(styles.idTrends, styles.section)}
                id="data-internally-displaced"
            >
                <div className={_cs(styles.idTrendsContent, styles.sectionContent)}>
                    <Header
                        heading="Data on internally displaced children"
                        headingSize="large"
                    />
                    <div className={styles.idTrendTopContainer}>
                        <div className={styles.descriptionContainer}>
                            <p className={styles.descriptionParagraph}>
                                {dataInternallyDisplacedDescription1}
                            </p>
                            <p className={styles.descriptionParagraph}>
                                {dataInternallyDisplacedDescription2}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className={_cs(styles.education, styles.section)}
                id="education-cost"
            >
                <div className={_cs(styles.sectionContent)}>
                    <Header
                        heading="Estimating the education costs for IDPs"
                        headingSize="large"
                    />
                    <div className={styles.topEducationContainer}>
                        <div className={styles.description}>
                            <p className={styles.descriptionParagraph}>
                                {estimatingEducationParagraph1}
                            </p>
                            <p className={styles.descriptionParagraph}>
                                {estimatingEducationParagraph2}
                            </p>
                            <p className={styles.descriptionParagraph}>
                                {estimatingEducationParagraph3}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={heroImage}
                    className={styles.background}
                    alt=""
                />
            </div>
            <section
                className={_cs(styles.idAccess, styles.section)}
                id="quality-education"
            >
                <div className={_cs(styles.idAccessContent, styles.sectionContent)}>
                    <Header
                        heading="Access to quality education"
                        headingSize="large"
                    />
                    <div className={styles.idAccessContainer}>
                        <div className={styles.descriptionContainer}>
                            <p className={styles.descriptionParagraph}>
                                {qualityEducationParagraph1}
                            </p>
                            <p className={styles.descriptionParagraph}>
                                {qualityEducationParagraph2}
                            </p>
                            <p className={styles.descriptionParagraph}>
                                {qualityEducationParagraph3}
                            </p>
                        </div>
                        <div className={styles.belowImgContainer}>
                            <p className={styles.descriptionImageParagraph}>
                                {qualityEducationQuote1}
                            </p>
                            <p className={styles.descriptionImageParagraph}>
                                {qualityEducationQuote2}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className={_cs(styles.costOfDisaster, styles.section)}
                id="social-impacts"
            >
                <div className={_cs(styles.sectionContent)}>
                    <Carousel
                        className={styles.bottomContainer}
                        numberOfVisibleItems={visibleItems}
                    >
                        <CarouselButton
                            className={styles.carouselButton}
                            action="prev"
                        />
                        <div className={styles.itemList}>
                            <CarouselItem
                                className={styles.spotlightItem}
                                order={1}
                            >
                                <a
                                    href={`${reportLink}#page=30`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <img
                                        className={styles.spotlightImage}
                                        src={heroImage}
                                        alt=""
                                    />
                                </a>
                            </CarouselItem>
                            <CarouselItem
                                className={styles.spotlightItem}
                                order={2}
                            >
                                <a
                                    href={`${reportLink}#page=32`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <img
                                        className={styles.spotlightImage}
                                        src={heroImage}
                                        alt=""
                                    />
                                </a>
                            </CarouselItem>
                            <CarouselItem
                                className={styles.spotlightItem}
                                order={3}
                            >
                                <a
                                    href={`${reportLink}#page=33`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <img
                                        className={styles.spotlightImage}
                                        src={heroImage}
                                        alt=""
                                    />
                                </a>
                            </CarouselItem>
                            <CarouselItem
                                className={styles.spotlightItem}
                                order={4}
                            >
                                <a
                                    href={`${reportLink}#page=35`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <img
                                        className={styles.spotlightImage}
                                        src={heroImage}
                                        alt=""
                                    />
                                </a>
                            </CarouselItem>
                        </div>
                        <CarouselButton
                            className={styles.carouselButton}
                            action="next"
                        />
                    </Carousel>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={heroImage}
                    className={styles.background}
                    alt=""
                />
            </div>
            <section
                className={_cs(styles.wayForward, styles.section)}
                id="way-forward"
            >
                <div className={_cs(styles.wayForwardContent, styles.sectionContent)}>
                    <Header
                        heading="The Way Forward"
                        headingSize="large"
                    />
                    <div className={styles.description}>
                        <p className={styles.descriptionParagraph}>
                            {wayForwardParagraph1}
                        </p>
                        <p className={styles.descriptionParagraph}>
                            <ul>
                                <li>
                                    {wayForwardListItem1}
                                </li>
                                <li>
                                    {wayForwardListItem2}
                                </li>
                                <li>
                                    {wayForwardListItem3}
                                </li>
                                <li>
                                    {wayForwardListItem4}
                                </li>
                            </ul>
                        </p>
                    </div>
                </div>
            </section>
            <section
                className={_cs(styles.conclusion, styles.section)}
                id="conclusion"
            >
                <div className={_cs(styles.idConclusionContent, styles.sectionContent)}>
                    <Header
                        heading="Conclusion"
                        headingSize="large"
                    />
                    <div className={styles.idConclusionTopContainer}>
                        <div className={styles.descriptionContainer}>
                            <p className={styles.descriptionParagraph}>
                                {conclusionDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={heroImage}
                    className={styles.background}
                    alt=""
                />
            </div>
            <section
                className={_cs(styles.download, styles.section)}
                id="download-report"
            >
                <div className={_cs(styles.downloadContent, styles.sectionContent)}>
                    <Header
                        heading="Download"
                        headingSize="large"
                    />
                    <div className={styles.topContent}>
                        <div className={styles.leftContent}>
                            <img
                                src={bookCover}
                                className={styles.bookCover}
                                alt=""
                            />
                        </div>
                        <div className={styles.rightContent}>
                            <div className={styles.linksContainer}>
                                <a
                                    className={styles.downloadLink}
                                    href={reportLink}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <MdPictureAsPdf />
                                    Download full report
                                    <MdArrowRightAlt />
                                </a>
                            </div>
                            <div className={styles.selectSectionContainer}>
                                <div className={styles.separator}>
                                    Or, select a section
                                </div>
                                <SelectInput
                                    className={styles.selectInput}
                                    inputSectionClassName={styles.inputSection}
                                    placeholder=""
                                    name="section"
                                    value={selectedSection}
                                    options={sectionOptions}
                                    keySelector={sectionKeySelector}
                                    labelSelector={sectionLabelSelector}
                                    onChange={setSelectedSection}
                                />
                                <ButtonLikeLink
                                    className={styles.button}
                                    disabled={!selectedSection}
                                    href={`${reportLink}${pageSuffix}`}
                                    target="_blank"
                                    icons={(
                                        <MdPictureAsPdf />
                                    )}
                                    actions={(
                                        <MdArrowRightAlt />
                                    )}
                                    rel="noreferrer noopener"
                                >
                                    View Section
                                </ButtonLikeLink>
                            </div>
                            <div className={styles.linksContainer}>
                                <a
                                    className={styles.downloadLink}
                                    href={pressReleaseLink}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <MdPictureAsPdf />
                                    Download press release
                                    <MdArrowRightAlt />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={_cs(styles.footer, styles.section)}>
                <div className={_cs(styles.footerContent, styles.sectionContent)}>
                    <div className={styles.logoContainer}>
                        <img
                            className={styles.logo}
                            src={idmcLogo}
                            alt=""
                        />
                    </div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.leftContainer}>
                            <Header
                                heading="Contact"
                                headingClassName={styles.text}
                                headingDescription="Internal Displacement Monitoring Center (IDMC)"
                            />
                            <div>
                                <p className={styles.paragraph}>
                                    {idmcAddress}
                                </p>
                                <TextOutput
                                    labelContainerClassName={styles.text}
                                    label="General Inquiries"
                                    value={(
                                        <a
                                            className={styles.link}
                                            href="mailto:info@idmc.ch"
                                        >
                                            info@idmc.ch
                                        </a>
                                    )}
                                />
                                <TextOutput
                                    labelContainerClassName={styles.text}
                                    label="Media Inquiries"
                                    value={(
                                        <a
                                            className={styles.link}
                                            href="mailto:media@idmc.ch"
                                        >
                                            media@idmc.ch
                                        </a>
                                    )}
                                />
                            </div>
                            <p className={styles.paragraph}>
                                {copyrightParagraph}
                            </p>
                        </div>
                        <div className={styles.rightContainer}>
                            <Header
                                headingClassName={styles.text}
                                heading="About us"
                            />
                            <p className={styles.paragraph}>
                                {contactParagraph}
                            </p>
                            <div className={styles.socialLinks}>
                                <a
                                    href="https://www.facebook.com/IDMC.Geneva"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <IoLogoFacebook />
                                </a>
                                <a
                                    href="https://twitter.com/IDMC_Geneva"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <IoLogoTwitter />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/internal-displacement-monitoring-centre-idmc-"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <IoLogoLinkedin />
                                </a>
                                <a
                                    href="https://www.youtube.com/channel/UCKEgRCcKKPNezkF3FLlfBRQ"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <IoLogoYoutube />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AsiaReport;
