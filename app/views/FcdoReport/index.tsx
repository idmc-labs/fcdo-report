import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
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
import {
    SelectInput,
    PopupButton,
} from '@togglecorp/toggle-ui';

import Button from '#components/Button';
import Header from '#components/Header';
import TextOutput from '#components/TextOutput';
import ButtonLikeLink from '#components/ButtonLikeLink';
import Quote from '#components/Quote';
import useBooleanState from '#hooks/useBooleanState';
import Svg from '#components/Svg';

import spotLight1 from '#resources/img/spot-light1.jpg';
import spotLight2 from '#resources/img/spot-light2.jpg';
import educationImage from '#resources/img/education-image.png';
import tableData from '#resources/img/table-data.jpg';
import coverImage3 from '#resources/img/cover-img3.jpg';
import barChart1 from '#resources/img/all.svg';
import barChart2 from '#resources/img/conflict.svg';
import barChart3 from '#resources/img/disaster.svg';
import ageGender from '#resources/img/age-gender.png';
import coverImage2 from '#resources/img/cover-img2.jpg';
import coverImage4 from '#resources/img/cover-img4.jpg';
import coverImage5 from '#resources/img/cover-img5.jpg';
import keyFinding1 from '#resources/img/key-finding1.png';
import keyFinding2 from '#resources/img/key-finding2.png';
import keyFinding3 from '#resources/img/key-finding3.png';

import dataGaps from '#resources/img/data-gaps.png';
import idmcLogo from '#resources/img/idmc-white.svg';
import bookCover from '#resources/img/book-cover.png';
import bannerImg1 from '#resources/img/banner-img1.jpg';

import {
    heroParagraph1,
    heroParagraph2,
    internallyDisplacedParagraph1,
    internallyDisplacedQuote,
    internallyDisplacedAuthor,
    estimatingEducationParagraph1,
    estimatingEducationParagraph2,
    estimatingEducationParagraph3,
    qualityEducationQuote,
    qualityEducationAuthor,
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
    conclusionDescription,
    heroParagraph4,
    heroParagraph3,
    youngGirlCaption,
    youngGirlSubCaption,
    childrenCaption,
    childrenSubCaption,
    estimatedCaption,
    studingCaption,
    studingSubCaption,
    descriptionCaption,
    primarySchoolSubCaption,
    primarySchoolCaption,
    oldWallCaption,
    oldWallSubCaption,
} from './data';
import WayForwardContent from './WayForwardContent';

import styles from './styles.css';

const svgTitles = [
    {
        key: 'afghanistan',
        title: 'Test',
    },
];

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
        label: 'Part 1: Internal Displacement Trends in fcdo and the Pacific (2010−2021)',
        key: 'Part 1: Internal Displacement Trends in fcdo and the Pacific (2010−2021)',
        startPage: '10',
    },
    {
        label: 'Part 2: Measuring the Social and Economic Impacts of Disaster Displacement in fcdo and the Pacific',
        key: 'Part 2: Measuring the Social and Economic Impacts of Disaster Displacement in fcdo and the Pacific',
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
        image: keyFinding1,
    },
    {
        key: '2',
        description: 'Afghanistan, the Democractic Republic of the Congo and Syria had the highest number of school-aged IDPs, with two million, 1.9 and 1.7 million respectively.',
        image: keyFinding2,
    },
    {
        key: '3',
        description: 'More than nice million internally displaced children could be at risk of missing out on education because they did not receive support through humanitarian response plans in 2021.',
        image: keyFinding3,
    },
    {
        key: '4',
        description: 'We estimate the average cost of providing one IDP with education support via humanitarian response plans for a year to be between $82 and $93.',
        image: keyFinding3,
    },
    {
        key: '5',
        description: 'The cost of providing a year’s education support for all school-aged IDPs in the 13 countries studied would be between $1.1 billion and $1.3 billion.',
        image: keyFinding3,
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

const wayForward = [
    {
        key: '1',
        description: 'Improve the availability and quality of data on IDPs in general by establishing formal registries of IDPs, identifying IDPs when conducting surveys, and collecting better time-series data after disasters.',
    },
    {
        key: '2',
        description: 'Ensure data on IDPs is disaggregated by age, sex, disability status and other characteristics to be able to identify internally displaced children and understand their intersecting vulnerabilities.',
    },
    {
        key: '3',
        description: 'Invest in systematically monitoring IDPs’ access to education, the quality of education they receive and associated costs by safely identifying IDPs in national education data.',
    },
    {
        key: '4',
        description: 'Strengthen data quality, sharing and interoperability by ensuring data on IDPs’ education is standardised, safely and ethically collected and shared, and regularly updated.',
    },
];

const sectionKeySelector = (section: { key: string }) => section.key;
const sectionLabelSelector = (section: { label: string }) => section.label;

interface Props {
    className?: string;
}

function FcdoReport(props: Props) {
    const {
        className,
    } = props;

    const [selectedSection, setSelectedSection] = useState<string | undefined>(undefined);
    const [isNavShown, , , , toggleNavVisibility] = useBooleanState(false);
    const [selectedKeyFinding, setSelectedKeyFinding] = useState('1');

    const popupElementRef = useRef<{
        setPopupVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    }>(null);

    const pageSuffix = useMemo(() => {
        const selectedSectionObj = sectionOptions.find(
            (section) => section.key === selectedSection,
        );
        if (!selectedSectionObj) {
            return '';
        }
        return `#page=${selectedSectionObj.startPage}`;
    }, [selectedSection]);

    useEffect(() => {
        const timeout = setTimeout(
            () => {
                svgTitles.forEach((item) => {
                    const itemGroup = document.getElementById(item.key);
                    const itemTitle = document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        'title',
                    );
                    itemTitle.textContent = item.title;
                    if (itemGroup) {
                        itemGroup.appendChild(itemTitle);
                    }
                });
            },
            200,
        );

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const handleNavClick = useCallback((itemHash) => {
        const elementToScrollTo = document.getElementById(itemHash);

        if (elementToScrollTo) {
            elementToScrollTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setTimeout(() => {
            popupElementRef.current?.setPopupVisibility(false);
        }, 0);
    }, []);

    const navMenuItems = useMemo(() => (
        <>
            <Button
                name="invisible"
                onClick={handleNavClick}
                className={_cs(
                    styles.navItem,
                    !isNavShown && styles.dropdownButton,
                )}
                variant="transparent"
            >
                Why are internally displaced children invisible?
            </Button>
            <Button
                name="data-on"
                onClick={handleNavClick}
                className={_cs(
                    styles.navItem,
                    !isNavShown && styles.dropdownButton,
                )}
                variant="transparent"
            >
                Data on internally displaced children
            </Button>
            <Button
                name="estimating"
                onClick={handleNavClick}
                className={_cs(
                    styles.navItem,
                    !isNavShown && styles.dropdownButton,
                )}
                variant="transparent"
            >
                Estimating the education costs for IDPs
            </Button>
            <Button
                name="access"
                onClick={handleNavClick}
                className={_cs(
                    styles.navItem,
                    !isNavShown && styles.dropdownButton,
                )}
                variant="transparent"
            >
                Access to quality education
            </Button>
        </>
    ), [
        isNavShown,
        handleNavClick,
    ]);

    return (
        <div
            id="fcdo-report"
            className={_cs(styles.fcdoReport, className)}
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
                        name="key-findings"
                        onClick={handleNavClick}
                        className={styles.navItem}
                        variant="transparent"
                    >
                        Key messages and findings
                    </Button>
                    {isNavShown ? (
                        navMenuItems
                    ) : (
                        <PopupButton
                            label="In Summary"
                            name="explore-the-data"
                            onClick={handleNavClick}
                            componentRef={popupElementRef}
                            className={_cs(styles.navItem, styles.dropdown)}
                        >
                            {navMenuItems}
                        </PopupButton>
                    )}
                    <Button
                        name="way-forward"
                        onClick={handleNavClick}
                        className={styles.navItem}
                        variant="transparent"
                    >
                        The Way Forward & Conclusion
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
                        heading="Informing better access to education for IDPs"
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
                    <div className={styles.keyFindingsContainer}>
                        <WayForwardContent
                            selectedItem={selectedKeyFinding}
                            onItemClick={setSelectedKeyFinding}
                            data={keyFindings}
                        />
                        <img
                            className={styles.keyFindingsImg}
                            src={keyFindings?.find((item) => item.key === selectedKeyFinding)
                                ?.image}
                            alt=""
                            width={600}
                            height={790}
                        />
                    </div>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={coverImage2}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    {youngGirlCaption}
                    <div>
                        {youngGirlSubCaption}
                    </div>
                </div>
            </div>
            <section
                className={_cs(styles.costOfDisaster, styles.section)}
                id="invisible"
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
                            <Quote
                                quote={internallyDisplacedQuote}
                                author={internallyDisplacedAuthor}
                            />
                        </div>
                        <div className={styles.rightContainer}>
                            <img
                                src={dataGaps}
                                className={styles.background}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section
                className={_cs(styles.idTrends, styles.section)}
                id="data-on"
            >
                <div className={_cs(styles.idTrendsContent, styles.sectionContent)}>
                    <Header
                        heading="Data on internally displaced children"
                        headingSize="large"
                    />
                    <div className={styles.descriptionContainer}>
                        <p className={styles.descriptionParagraph}>
                            {dataInternallyDisplacedDescription1}
                        </p>
                        <p className={styles.descriptionParagraph}>
                            {dataInternallyDisplacedDescription2}
                        </p>
                    </div>
                    <div className={styles.barChartContent}>
                        <div className={styles.topContainer}>
                            <div className={styles.barChart}>
                                <Header
                                    className={styles.header}
                                    heading="14 million"
                                    headingDescription="Estimated number of school-aged IDPs across all 13 countries as of the end of 2021"
                                    headingSize="large"
                                    hideHeadingBorder
                                />
                                <Svg
                                    src={barChart1}
                                    className={styles.bar}
                                />
                            </div>
                            <div className={styles.barChart}>
                                <Header
                                    className={styles.header}
                                    headingClassName={styles.conflict}
                                    heading="13m"
                                    headingDescription="by conflict and violence"
                                    headingSize="large"
                                    hideHeadingBorder
                                />
                                <Svg
                                    src={barChart2}
                                    className={styles.smallBar}
                                />
                            </div>
                            <div className={styles.barChart}>
                                <Header
                                    className={styles.header}
                                    heading="1m"
                                    headingClassName={styles.disaster}
                                    headingDescription="by disaster"
                                    headingSize="large"
                                    hideHeadingBorder
                                />
                                <Svg
                                    src={barChart3}
                                    className={styles.smallBar}
                                />
                            </div>
                        </div>
                        <Button
                            name={undefined}
                        >
                            Download Dataset
                        </Button>
                    </div>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={coverImage3}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    {childrenCaption}
                    <div>
                        {childrenSubCaption}
                    </div>
                </div>
            </div>
            <section
                className={_cs(styles.education, styles.section)}
                id="estimating"
            >
                <div className={_cs(styles.sectionContent)}>
                    <Header
                        heading="Estimating the education costs for IDPs"
                        headingSize="large"
                    />
                    <div className={styles.topEducationContainer}>
                        <img
                            src={educationImage}
                            className={styles.background}
                            alt=""
                        />
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
                        <img
                            src={tableData}
                            className={styles.background}
                            alt=""
                        />
                        <div className={styles.estimatedCaption}>
                            {estimatedCaption}
                        </div>
                    </div>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={coverImage4}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    {studingCaption}
                    <div>
                        {studingSubCaption}
                    </div>
                </div>
            </div>
            <section
                className={_cs(styles.idAccess, styles.section)}
                id="access"
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
                            <img
                                src={ageGender}
                                className={styles.background}
                                alt=""
                            />
                            <p className={styles.descriptionCaption}>
                                {descriptionCaption}
                            </p>
                        </div>
                    </div>
                    <div className={styles.quotes}>
                        <Quote
                            quote={qualityEducationQuote}
                            author={qualityEducationAuthor}
                        />
                    </div>
                </div>
            </section>
            <section
                className={_cs(styles.costOfDisaster, styles.section)}
                id="social-impacts"
            >
                <div className={_cs(styles.sectionContent)}>
                    <div className={styles.bottomContainer}>
                        <div className={styles.itemList}>
                            <div className={styles.spotlightItem}>
                                <img
                                    className={styles.spotlightImage}
                                    src={spotLight1}
                                    alt=""
                                />
                                <div className={styles.caption}>
                                    <div className={styles.subHeading}>
                                        Gender disparities in access to
                                        education in Somalia and Ethiopia
                                    </div>
                                </div>
                            </div>
                            <div className={styles.spotlightItem}>
                                <img
                                    className={styles.spotlightImage}
                                    src={spotLight2}
                                    alt=""
                                />
                                <div className={styles.caption}>
                                    <div className={styles.subHeading}>
                                        Estimating the number of IDPs at
                                        risk of missing out on education
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={bannerImg1}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    {primarySchoolCaption}
                    <div>
                        {primarySchoolSubCaption}
                    </div>
                </div>
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
                        <WayForwardContent
                            data={wayForward}
                        />
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
                    <div className={styles.description}>
                        <p className={styles.descriptionParagraph}>
                            {conclusionDescription}
                        </p>
                    </div>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={coverImage5}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    {oldWallCaption}
                    <div>
                        {oldWallSubCaption}
                    </div>
                </div>
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

export default FcdoReport;
