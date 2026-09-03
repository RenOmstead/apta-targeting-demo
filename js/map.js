/* =========================================================
   APTA 2026 TEAM HUB
   NORTHSTAR TRANSIT SOLUTIONS

   SCALED EXPO FLOOR ENGINE
   ========================================================= */


/* =========================================================
   CONFIGURATION

   1 foot = 4 pixels

   Therefore:
   10 x 10 = 40 x 40 pixels
   20 x 10 = 80 x 40 pixels
   30 x 10 = 120 x 40 pixels
   ========================================================= */

const FEET_TO_PX = 4;



/* =========================================================
   STATE
   ========================================================= */

let exhibitors = [];

let selectedExhibitor = null;



/* =========================================================
   DEMO FLOOR DATA

   booth_width and booth_depth represent actual feet.

   map_x / map_y are our floor canvas coordinates.

   IMPORTANT:
   These coordinates are currently a DEMO reconstruction.

   As we recreate the actual APTA layout,
   these coordinates will be replaced.
   ========================================================= */

const demoExhibitors = [

    {
        id: 1,

        company_name:
            "Apex Rail Technologies",

        booth_number:
            "3182",

        booth_width:
            10,

        booth_depth:
            10,

        booth_sqft:
            100,

        map_x:
            90,

        map_y:
            120,

        category:
            "Rail Technology",

        description:
            "Develops digital monitoring, diagnostics and onboard technology for modern passenger rail systems.",

        website:
            "https://example.com"
    },


    {
        id: 2,

        company_name:
            "Lumina Transit Systems",

        booth_number:
            "3184",

        booth_width:
            10,

        booth_depth:
            10,

        booth_sqft:
            100,

        map_x:
            140,

        map_y:
            120,

        category:
            "Transit Technology",

        description:
            "Provides connected transit technology, passenger information systems and intelligent fleet solutions.",

        website:
            "https://example.com"
    },


    {
        id: 3,

        company_name:
            "Meridian Mobility",

        booth_number:
            "3186",

        booth_width:
            10,

        booth_depth:
            10,

        booth_sqft:
            100,

        map_x:
            190,

        map_y:
            120,

        category:
            "Mobility",

        description:
            "Designs transportation technology supporting connected mobility, fleet operations and passenger experience.",

        website:
            "https://example.com"
    },


    {
        id: 4,

        company_name:
            "Forge Infrastructure Group",

        booth_number:
            "3190",

        booth_width:
            20,

        booth_depth:
            10,

        booth_sqft:
            200,

        map_x:
            260,

        map_y:
            120,

        category:
            "Engineering",

        description:
            "Engineering and infrastructure organization supporting complex transportation systems and modernization programs.",

        website:
            "https://example.com"
    },


    {
        id: 5,

        company_name:
            "Arc Signal Technologies",

        booth_number:
            "3194",

        booth_width:
            20,

        booth_depth:
            20,

        booth_sqft:
            400,

        map_x:
            370,

        map_y:
            120,

        category:
            "Signals & Communications",

        description:
            "Develops signaling, communications and control technology for rail and public transportation networks.",

        website:
            "https://example.com"
    },


    {
        id: 6,

        company_name:
            "Vela Passenger Systems",

        booth_number:
            "4279",

        booth_width:
            10,

        booth_depth:
            10,

        booth_sqft:
            100,

        map_x:
            90,

        map_y:
            300,

        category:
            "Passenger Systems",

        description:
            "Creates digital passenger-information, onboard communication and transit experience platforms.",

        website:
            "https://example.com"
    },


    {
        id: 7,

        company_name:
            "Monarch Rolling Stock",

        booth_number:
            "4281",

        booth_width:
            10,

        booth_depth:
            20,

        booth_sqft:
            200,

        map_x:
            140,

        map_y:
            300,

        category:
            "Rolling Stock",

        description:
            "Supplies components, engineering services and lifecycle support for passenger rail vehicle programs.",

        website:
            "https://example.com"
    },


    {
        id: 8,

        company_name:
            "Ember Fleet Analytics",

        booth_number:
            "4285",

        booth_width:
            20,

        booth_depth:
            10,

        booth_sqft:
            200,

        map_x:
            230,

        map_y:
            300,

        category:
            "Data & Analytics",

        description:
            "Provides fleet intelligence, predictive analytics and operational dashboards for transportation organizations.",

        website:
            "https://example.com"
    },


    {
        id: 9,

        company_name:
            "Solace Engineering",

        booth_number:
            "4608",

        booth_width:
            10,

        booth_depth:
            10,

        booth_sqft:
            100,

        map_x:
            90,

        map_y:
            500,

        category:
            "Engineering",

        description:
            "Transportation engineering firm specializing in system integration, documentation and infrastructure programs.",

        website:
            "https://example.com"
    },


    {
        id: 10,

        company_name:
            "NovaFare Technologies",

        booth_number:
            "4610",

        booth_width:
            10,

        booth_depth:
            10,

        booth_sqft:
            100,

        map_x:
            140,

        map_y:
            500,

        category:
            "Fare Collection",

        description:
            "Develops modern fare collection, payment and account-based ticketing systems for transit agencies.",

        website:
            "https://example.com"
    },


    {
        id: 11,

        company_name:
            "Cinder Transit Manufacturing",

        booth_number:
            "4614",

        booth_width:
            30,

        booth_depth:
            10,

        booth_sqft:
            300,

        map_x:
            210,

        map_y:
            500,

        category:
            "Manufacturing",

        description:
            "Manufactures equipment and specialized components for rail and public transportation applications.",

        website:
            "https://example.com"
    },


    {
        id: 12,

        company_name:
            "Aurelia Communications",

        booth_number:
            "4620",

        booth_width:
            10,

        booth_depth:
            10,

        booth_sqft:
            100,

        map_x:
            350,

        map_y:
            500,

        category:
            "Signals & Communications",

        description:
            "Provides wireless communications, network infrastructure and connected-system technology for transit environments.",

        website:
            "https://example.com"
    }

];



/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeMap
);



function initializeMap() {

    exhibitors =
        [...demoExhibitors];


    bindControls();


    populateCategoryFilter();


    renderFloor();


    renderTargetRoute();


    updateMetrics();


    openExhibitorFromURL();


    setStatus(
        `${exhibitors.length} exhibitors loaded · Interactive floor ready`
    );

}



/* =========================================================
   CONTROLS
   ========================================================= */

function bindControls() {

    document
        .getElementById(
            "mapSearch"
        )
        ?.addEventListener(
            "input",
            applyFilters
        );


    document
        .getElementById(
            "mapTargetFilter"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document
        .getElementById(
            "mapCategoryFilter"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document
        .getElementById(
            "resetMapButton"
        )
        ?.addEventListener(
            "click",
            resetMap
        );


    document
        .getElementById(
            "selectedTargetButton"
        )
        ?.addEventListener(
            "click",
            toggleSelectedTarget
        );

}



/* =========================================================
   CATEGORY FILTER
   ========================================================= */

function populateCategoryFilter() {

    const select =
        document.getElementById(
            "mapCategoryFilter"
        );


    if (!select) {
        return;
    }


    const categories = [

        ...new Set(

            exhibitors
                .map(
                    exhibitor =>
                        exhibitor.category
                )
                .filter(Boolean)

        )

    ];


    categories.sort(
        (a, b) =>
            a.localeCompare(b)
    );


    categories.forEach(
        category => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                category;


            option.textContent =
                category;


            select.appendChild(
                option
            );

        }
    );

}



/* =========================================================
   RENDER FLOOR
   ========================================================= */

function renderFloor() {

    const floor =
        document.getElementById(
            "expoFloor"
        );


    if (!floor) {
        return;
    }


    floor.innerHTML = "";


    createAisleLabels(
        floor
    );


    exhibitors.forEach(
        exhibitor => {

            floor.appendChild(
                createBooth(
                    exhibitor
                )
            );

        }
    );


    applyFilters();

}



/* =========================================================
   CREATE AISLE LABELS
   ========================================================= */

function createAisleLabels(
    floor
) {

    const labels = [

        {
            text:
                "AISLE 3100",

            x:
                90,

            y:
                85
        },


        {
            text:
                "AISLE 4200",

            x:
                90,

            y:
                265
        },


        {
            text:
                "AISLE 4600",

            x:
                90,

            y:
                465
        },


        {
            text:
                "MAIN CROSS AISLE",

            x:
                620,

            y:
                390
        }

    ];


    labels.forEach(
        item => {

            const label =
                document.createElement(
                    "span"
                );


            label.className =
                "aisle-label";


            label.textContent =
                item.text;


            label.style.left =
                `${item.x}px`;


            label.style.top =
                `${item.y}px`;


            floor.appendChild(
                label
            );

        }
    );

}



/* =========================================================
   CREATE BOOTH
   ========================================================= */

function createBooth(
    exhibitor
) {

    const booth =
        document.createElement(
            "button"
        );


    booth.type =
        "button";


    booth.className =
        "expo-booth";


    booth.dataset.id =
        exhibitor.id;


    booth.dataset.company =
        exhibitor.company_name
            .toLowerCase();


    booth.dataset.booth =
        String(
            exhibitor.booth_number
        )
            .toLowerCase();


    booth.dataset.category =
        (
            exhibitor.category ||
            ""
        )
            .toLowerCase();


    booth.style.left =
        `${exhibitor.map_x}px`;


    booth.style.top =
        `${exhibitor.map_y}px`;


    booth.style.width =
        `${
            exhibitor.booth_width *
            FEET_TO_PX
        }px`;


    booth.style.height =
        `${
            exhibitor.booth_depth *
            FEET_TO_PX
        }px`;


    if (
        isTargeted(
            exhibitor.id
        )
    ) {

        booth.classList.add(
            "target"
        );

    }


    if (
        selectedExhibitor &&
        String(
            selectedExhibitor.id
        ) ===
        String(
            exhibitor.id
        )
    ) {

        booth.classList.add(
            "selected"
        );

    }


    booth.innerHTML = `

        <span class="expo-booth-number">

            ${
                escapeHTML(
                    exhibitor.booth_number
                )
            }

        </span>


        ${
            exhibitor.booth_width >= 20
            ?
            `
                <span class="expo-booth-company">

                    ${
                        escapeHTML(
                            shortCompanyName(
                                exhibitor.company_name
                            )
                        )
                    }

                </span>
            `
            :
            ""
        }

    `;


    booth.addEventListener(
        "click",
        () => {

            selectExhibitor(
                exhibitor.id
            );

        }
    );


    booth.addEventListener(
        "mouseenter",
        event => {

            showTooltip(
                exhibitor,
                event
            );

        }
    );


    booth.addEventListener(
        "mousemove",
        moveTooltip
    );


    booth.addEventListener(
        "mouseleave",
        hideTooltip
    );


    return booth;

}



/* =========================================================
   FILTERING
   ========================================================= */

function applyFilters() {

    const search =
        (
            document
                .getElementById(
                    "mapSearch"
                )
                ?.value ||
            ""
        )
            .trim()
            .toLowerCase();


    const targetFilter =
        document
            .getElementById(
                "mapTargetFilter"
            )
            ?.value ||
        "";


    const category =
        document
            .getElementById(
                "mapCategoryFilter"
            )
            ?.value ||
        "";


    let visible =
        0;


    document
        .querySelectorAll(
            ".expo-booth"
        )
        .forEach(
            booth => {

                const exhibitor =
                    exhibitors.find(
                        item =>
                            String(
                                item.id
                            )
                            ===
                            String(
                                booth.dataset.id
                            )
                    );


                if (!exhibitor) {
                    return;
                }


                const searchable = [

                    exhibitor.company_name,

                    exhibitor.booth_number,

                    exhibitor.category,

                    exhibitor.description

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                const matchesSearch =
                    !search ||
                    searchable.includes(
                        search
                    );


                const matchesCategory =
                    !category ||
                    exhibitor.category ===
                    category;


                const targeted =
                    isTargeted(
                        exhibitor.id
                    );


                let matchesTarget =
                    true;


                if (
                    targetFilter ===
                    "targets"
                ) {

                    matchesTarget =
                        targeted;

                }


                if (
                    targetFilter ===
                    "not-targets"
                ) {

                    matchesTarget =
                        !targeted;

                }


                const matches =

                    matchesSearch &&
                    matchesCategory &&
                    matchesTarget;


                booth.classList.toggle(
                    "dimmed",
                    !matches
                );


                if (matches) {
                    visible++;
                }

            }
        );


    setText(
        "mapVisibleCount",
        visible
    );

}



/* =========================================================
   SELECT EXHIBITOR
   ========================================================= */

function selectExhibitor(
    exhibitorId
) {

    selectedExhibitor =
        exhibitors.find(
            exhibitor =>
                String(
                    exhibitor.id
                )
                ===
                String(
                    exhibitorId
                )
        )
        ||
        null;


    if (
        !selectedExhibitor
    ) {
        return;
    }


    updateSelectedCard();


    renderFloor();


    scrollSelectedBoothIntoView();

}



/* =========================================================
   SELECTED CARD
   ========================================================= */

function updateSelectedCard() {

    const empty =
        document.getElementById(
            "selectedEmpty"
        );


    const card =
        document.getElementById(
            "selectedCard"
        );


    if (
        !selectedExhibitor
    ) {

        if (empty) {
            empty.hidden = false;
        }


        if (card) {
            card.hidden = true;
        }


        return;

    }


    if (empty) {
        empty.hidden = true;
    }


    if (card) {
        card.hidden = false;
    }


    setText(
        "selectedCompanyMark",
        getInitial(
            selectedExhibitor.company_name
        )
    );


    setText(
        "selectedCategory",
        selectedExhibitor.category ||
        "APTA Exhibitor"
    );


    setText(
        "selectedCompany",
        selectedExhibitor.company_name
    );


    setText(
        "selectedBooth",
        selectedExhibitor.booth_number
    );


    setText(
        "selectedSize",
        `${
            selectedExhibitor.booth_width
        }' × ${
            selectedExhibitor.booth_depth
        }'`
    );


    setText(
        "selectedSqFt",
        `${
            selectedExhibitor.booth_sqft
        } sq ft`
    );


    setText(
        "selectedDescription",
        selectedExhibitor.description ||
        "Company information is currently being researched."
    );


    const targeted =
        isTargeted(
            selectedExhibitor.id
        );


    const badge =
        document.getElementById(
            "selectedTargetBadge"
        );


    if (badge) {

        badge.hidden =
            !targeted;

    }


    const targetButton =
        document.getElementById(
            "selectedTargetButton"
        );


    if (targetButton) {

        targetButton.innerHTML =
            targeted
            ?
            `
                <span>
                    Remove Northstar Target
                </span>

                <b>
                    ×
                </b>
            `
            :
            `
                <span>
                    Add to Northstar Targets
                </span>

                <b>
                    +
                </b>
            `;

    }


    const profile =
        document.getElementById(
            "selectedProfileLink"
        );


    if (profile) {

        profile.href =
            `exhibitors.html?id=${
                encodeURIComponent(
                    selectedExhibitor.id
                )
            }`;

    }


    const interaction =
        document.getElementById(
            "selectedInteractionLink"
        );


    if (interaction) {

        interaction.href =
            `interactions.html?exhibitor=${
                encodeURIComponent(
                    selectedExhibitor.id
                )
            }`;

    }

}



/* =========================================================
   TARGET STORAGE
   ========================================================= */

function getTargets() {

    try {

        const stored =
            localStorage.getItem(
                "northstar_apta_targets"
            );


        return stored
            ?
            JSON.parse(
                stored
            )
            :
            [];

    }

    catch (
        error
    ) {

        console.error(
            "Could not load targets:",
            error
        );


        return [];

    }

}



function saveTargets(
    targets
) {

    localStorage.setItem(
        "northstar_apta_targets",
        JSON.stringify(
            targets
        )
    );

}



/* =========================================================
   TARGET CHECK
   ========================================================= */

function isTargeted(
    exhibitorId
) {

    return getTargets().some(
        target =>
            String(
                target.exhibitor_id
            )
            ===
            String(
                exhibitorId
            )
    );

}



/* =========================================================
   TOGGLE TARGET
   ========================================================= */

function toggleSelectedTarget() {

    if (
        !selectedExhibitor
    ) {
        return;
    }


    const targets =
        getTargets();


    const index =
        targets.findIndex(
            target =>
                String(
                    target.exhibitor_id
                )
                ===
                String(
                    selectedExhibitor.id
                )
        );


    if (
        index >= 0
    ) {

        targets.splice(
            index,
            1
        );


        setStatus(
            `${selectedExhibitor.company_name} removed from Northstar targets`
        );

    }

    else {

        targets.push({

            id:
                generateId(),

            exhibitor_id:
                selectedExhibitor.id,

            priority:
                "medium",

            visited:
                false,

            assigned_to:
                "",

            notes:
                "",

            status:
                "research",

            created_at:
                new Date()
                    .toISOString()

        });


        setStatus(
            `${selectedExhibitor.company_name} added to Northstar targets`
        );

    }


    saveTargets(
        targets
    );


    updateSelectedCard();


    renderFloor();


    renderTargetRoute();


    updateMetrics();

}



/* =========================================================
   TARGET ROUTE
   ========================================================= */

function renderTargetRoute() {

    const container =
        document.getElementById(
            "targetRouteList"
        );


    if (!container) {
        return;
    }


    const targets =
        getTargets();


    const targetExhibitors =
        targets
            .map(
                target => {

                    const exhibitor =
                        exhibitors.find(
                            item =>
                                String(
                                    item.id
                                )
                                ===
                                String(
                                    target.exhibitor_id
                                )
                        );


                    if (!exhibitor) {
                        return null;
                    }


                    return {

                        ...exhibitor,

                        target

                    };

                }
            )
            .filter(Boolean);


    setText(
        "targetRouteCount",
        targetExhibitors.length
    );


    container.innerHTML =
        "";


    if (
        targetExhibitors.length ===
        0
    ) {

        container.innerHTML = `

            <div class="route-empty">

                No Northstar targets selected yet.

            </div>

        `;


        return;

    }


    targetExhibitors.forEach(
        (
            exhibitor,
            index
        ) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "route-item";


            item.innerHTML = `

                <span class="route-number">

                    ${
                        String(
                            index + 1
                        ).padStart(
                            2,
                            "0"
                        )
                    }

                </span>


                <div class="route-copy">

                    <strong>

                        ${
                            escapeHTML(
                                exhibitor.company_name
                            )
                        }

                    </strong>

                    <span>

                        Booth ${
                            escapeHTML(
                                exhibitor.booth_number
                            )
                        }

                        ·

                        ${
                            exhibitor.booth_width
                        }' × ${
                            exhibitor.booth_depth
                        }'

                    </span>

                </div>


                <span class="route-arrow">
                    →
                </span>

            `;


            item.addEventListener(
                "click",
                () => {

                    selectExhibitor(
                        exhibitor.id
                    );

                }
            );


            container.appendChild(
                item
            );

        }
    );

}



/* =========================================================
   TOOLTIP
   ========================================================= */

function showTooltip(
    exhibitor,
    event
) {

    const tooltip =
        document.getElementById(
            "boothTooltip"
        );


    if (!tooltip) {
        return;
    }


    setText(
        "tooltipStatus",
        isTargeted(
            exhibitor.id
        )
            ?
            "NORTHSTAR TARGET"
            :
            "APTA EXHIBITOR"
    );


    setText(
        "tooltipCompany",
        exhibitor.company_name
    );


    setText(
        "tooltipBooth",
        `Booth ${
            exhibitor.booth_number
        }`
    );


    setText(
        "tooltipSize",
        `${
            exhibitor.booth_width
        } × ${
            exhibitor.booth_depth
        } · ${
            exhibitor.booth_sqft
        } sq ft`
    );


    tooltip.hidden =
        false;


    moveTooltip(
        event
    );

}



/* =========================================================
   MOVE TOOLTIP
   ========================================================= */

function moveTooltip(
    event
) {

    const tooltip =
        document.getElementById(
            "boothTooltip"
        );


    if (
        !tooltip ||
        tooltip.hidden
    ) {
        return;
    }


    const offset =
        16;


    let left =
        event.clientX +
        offset;


    let top =
        event.clientY +
        offset;


    const width =
        tooltip.offsetWidth;


    const height =
        tooltip.offsetHeight;


    if (
        left + width >
        window.innerWidth - 10
    ) {

        left =
            event.clientX -
            width -
            offset;

    }


    if (
        top + height >
        window.innerHeight - 10
    ) {

        top =
            event.clientY -
            height -
            offset;

    }


    tooltip.style.left =
        `${left}px`;


    tooltip.style.top =
        `${top}px`;

}



/* =========================================================
   HIDE TOOLTIP
   ========================================================= */

function hideTooltip() {

    const tooltip =
        document.getElementById(
            "boothTooltip"
        );


    if (tooltip) {

        tooltip.hidden =
            true;

    }

}



/* =========================================================
   SCROLL SELECTED BOOTH INTO VIEW
   ========================================================= */

function scrollSelectedBoothIntoView() {

    if (
        !selectedExhibitor
    ) {
        return;
    }


    const booth =
        document.querySelector(
            `.expo-booth[data-id="${
                selectedExhibitor.id
            }"]`
        );


    booth?.scrollIntoView({

        behavior:
            "smooth",

        block:
            "center",

        inline:
            "center"

    });

}



/* =========================================================
   METRICS
   ========================================================= */

function updateMetrics() {

    const targets =
        exhibitors.filter(
            exhibitor =>
                isTargeted(
                    exhibitor.id
                )
        );


    setText(
        "mapExhibitorCount",
        exhibitors.length
    );


    setText(
        "mapTargetCount",
        targets.length
    );


    setText(
        "mapVisibleCount",
        exhibitors.length
    );

}



/* =========================================================
   RESET MAP
   ========================================================= */

function resetMap() {

    const search =
        document.getElementById(
            "mapSearch"
        );


    const targetFilter =
        document.getElementById(
            "mapTargetFilter"
        );


    const categoryFilter =
        document.getElementById(
            "mapCategoryFilter"
        );


    if (search) {

        search.value =
            "";

    }


    if (targetFilter) {

        targetFilter.value =
            "";

    }


    if (categoryFilter) {

        categoryFilter.value =
            "";

    }


    selectedExhibitor =
        null;


    updateSelectedCard();


    renderFloor();


    updateMetrics();


    setStatus(
        "Expo floor reset"
    );

}



/* =========================================================
   URL SELECTION
   ========================================================= */

function openExhibitorFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        params.get(
            "id"
        );


    if (!id) {
        return;
    }


    selectExhibitor(
        id
    );

}



/* =========================================================
   STATUS
   ========================================================= */

let statusTimer =
    null;


function setStatus(
    message
) {

    const status =
        document.getElementById(
            "databaseStatus"
        );


    if (!status) {
        return;
    }


    status.textContent =
        message;


    clearTimeout(
        statusTimer
    );


    statusTimer =
        setTimeout(
            () => {

                status.textContent =
                    `${exhibitors.length} exhibitors loaded · Interactive floor ready`;

            },
            3000
        );

}



/* =========================================================
   UTILITIES
   ========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;

    }

}



function getInitial(
    company
) {

    return (
        company
            ?.trim()
            ?.charAt(0)
            ?.toUpperCase()
        ||
        "—"
    );

}



function shortCompanyName(
    company
) {

    if (!company) {

        return "";

    }


    const cleaned =
        company
            .replace(
                /technologies/gi,
                ""
            )
            .replace(
                /technology/gi,
                ""
            )
            .replace(
                /systems/gi,
                ""
            )
            .replace(
                /group/gi,
                ""
            )
            .trim();


    return (
        cleaned.length > 20
            ?
            `${cleaned.slice(0, 18)}…`
            :
            cleaned
    );

}



function generateId() {

    if (
        window.crypto &&
        crypto.randomUUID
    ) {

        return crypto.randomUUID();

    }


    return (
        Date.now()
        +
        "-"
        +
        Math.random()
            .toString(16)
            .slice(2)
    );

}



function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
