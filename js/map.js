/* =========================================================
   APTA 2026 TEAM HUB
   NORTHSTAR TRANSIT SOLUTIONS

   MAP PAGE
   Uses shared exhibitor data from:
   js/exhibitor-data.js
   ========================================================= */


/* =========================================================
   STATE
   ========================================================= */

let exhibitors = [];
let selectedExhibitor = null;
let visibleBoothCount = 0;


/* =========================================================
   STORAGE
   ========================================================= */

const TARGET_STORAGE_KEY =
    "northstar_apta_targets";


/* =========================================================
   FLOOR CONFIG
   ========================================================= */

const FLOOR_CONFIG = {

    unitFeet: 10,

    unitPixels: 34,

    widthUnits: 48,

    heightUnits: 39

};


/* =========================================================
   FLOOR ZONES
   ========================================================= */

const FLOOR_ZONES = [

    {
        id: "north",
        label: "NORTH EXHIBIT AREA",
        x: 2,
        y: 1,
        width: 40,
        height: 8
    },

    {
        id: "center",
        label: "CENTRAL EXHIBIT AREA",
        x: 1,
        y: 10,
        width: 44,
        height: 17
    },

    {
        id: "south",
        label: "SOUTH EXHIBIT AREA",
        x: 2,
        y: 29,
        width: 41,
        height: 8
    }

];


/* =========================================================
   FLOOR AISLES
   ========================================================= */

const FLOOR_AISLES = [

    {
        label: "MAIN CROSS AISLE",
        x: 1,
        y: 9,
        width: 44,
        height: 1
    },

    {
        label: "CENTRAL CROSS AISLE",
        x: 1,
        y: 27,
        width: 44,
        height: 2
    },

    {
        label: "WEST ENTRY",
        x: 0,
        y: 12,
        width: 2,
        height: 8
    }

];


/* =========================================================
   FLOOR GEOMETRY

   IMPORTANT:
   This array only describes map placement.

   Company names come from:
   window.APTA_EXHIBITORS

   width/depth are 10-foot modules.

   1 x 1 = 10' x 10'
   2 x 1 = 20' x 10'
   3 x 1 = 30' x 10'

   This geometry is still being reconstructed and expanded.
   ========================================================= */

const APTA_FLOOR_LAYOUT = [

    /* ===================== 3100 AREA ===================== */

    {
        booth_number: "3175",
        x: 11,
        y: 4,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3176",
        x: 12,
        y: 4,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3181",
        x: 14,
        y: 4,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3182",
        x: 15,
        y: 4,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3185",
        x: 17,
        y: 4,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3186",
        x: 18,
        y: 4,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3100",
        x: 20,
        y: 2,
        width: 4,
        depth: 3
    },

    {
        booth_number: "3103",
        x: 25,
        y: 3,
        width: 2,
        depth: 2
    },

    {
        booth_number: "3106",
        x: 28,
        y: 4,
        width: 2,
        depth: 1
    },


    /* ===================== 3400 AREA ===================== */

    {
        booth_number: "3402",
        x: 12,
        y: 12,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3405",
        x: 13,
        y: 12,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3406",
        x: 14,
        y: 12,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3408",
        x: 15,
        y: 12,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3420",
        x: 18,
        y: 11,
        width: 3,
        depth: 2
    },

    {
        booth_number: "3425",
        x: 22,
        y: 12,
        width: 2,
        depth: 1
    },


    /* ===================== CENTER AREA =================== */

    {
        booth_number: "3500",
        x: 5,
        y: 15,
        width: 4,
        depth: 3
    },

    {
        booth_number: "3600",
        x: 11,
        y: 15,
        width: 3,
        depth: 4
    },

    {
        booth_number: "3700",
        x: 16,
        y: 15,
        width: 5,
        depth: 3
    },

    {
        booth_number: "3800",
        x: 24,
        y: 15,
        width: 4,
        depth: 4
    },

    {
        booth_number: "3900",
        x: 31,
        y: 15,
        width: 5,
        depth: 3
    },


    /* ===================== 4200 AREA ===================== */

    {
        booth_number: "4210",
        x: 30,
        y: 20,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4212",
        x: 31,
        y: 20,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4217",
        x: 33,
        y: 20,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4220",
        x: 35,
        y: 20,
        width: 2,
        depth: 1
    },

    {
        booth_number: "4231",
        x: 38,
        y: 20,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4234",
        x: 39,
        y: 20,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4237",
        x: 40,
        y: 20,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4239",
        x: 41,
        y: 20,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4252",
        x: 30,
        y: 22,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4255",
        x: 32,
        y: 22,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4257",
        x: 33,
        y: 22,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4261",
        x: 35,
        y: 22,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4264",
        x: 36,
        y: 22,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4267",
        x: 38,
        y: 22,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4269",
        x: 39,
        y: 22,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4274",
        x: 30,
        y: 24,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4275",
        x: 31,
        y: 24,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4277",
        x: 33,
        y: 24,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4279",
        x: 34,
        y: 24,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4281",
        x: 36,
        y: 24,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4285",
        x: 38,
        y: 24,
        width: 1,
        depth: 1
    },


    /* ===================== 4600 AREA ===================== */

    {
        booth_number: "4606",
        x: 30,
        y: 31,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4607",
        x: 31,
        y: 31,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4608",
        x: 32,
        y: 31,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4610",
        x: 34,
        y: 31,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4612",
        x: 35,
        y: 31,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4614",
        x: 37,
        y: 31,
        width: 3,
        depth: 1
    },

    {
        booth_number: "4617",
        x: 41,
        y: 31,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4620",
        x: 30,
        y: 33,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4622",
        x: 31,
        y: 33,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4624",
        x: 32,
        y: 33,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4625",
        x: 34,
        y: 33,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4627",
        x: 35,
        y: 33,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4628",
        x: 36,
        y: 33,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4631",
        x: 38,
        y: 33,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4632",
        x: 39,
        y: 33,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4636",
        x: 30,
        y: 35,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4638",
        x: 32,
        y: 35,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4642",
        x: 34,
        y: 35,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4644",
        x: 35,
        y: 35,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4646",
        x: 36,
        y: 35,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4647",
        x: 38,
        y: 35,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4648",
        x: 39,
        y: 35,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4649",
        x: 40,
        y: 35,
        width: 1,
        depth: 1
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

    loadExhibitors();

    bindControls();

    populateCategoryFilter();

    renderFloor();

    renderTargetRoute();

    updateMetrics();

    openExhibitorFromURL();

    setStatus(
        `${exhibitors.length} APTA exhibitor records loaded`
    );

}


/* =========================================================
   LOAD SHARED EXHIBITOR DATA
   ========================================================= */

function loadExhibitors() {

    if (
        !window.APTA_EXHIBITORS ||
        !Array.isArray(
            window.APTA_EXHIBITORS
        )
    ) {

        console.error(
            "APTA exhibitor data did not load."
        );

        exhibitors = [];

        return;

    }


    exhibitors =
        window.APTA_EXHIBITORS.map(
            exhibitor => ({

                id:
                    exhibitor.id,

                company_name:
                    exhibitor.company_name ||
                    "Unknown Exhibitor",

                booth_number:
                    exhibitor.booth_number ||
                    "",

                category:
                    exhibitor.category ||
                    "",

                description:
                    exhibitor.description ||
                    "",

                website:
                    exhibitor.website ||
                    ""

            })
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


    while (
        select.options.length >
        1
    ) {

        select.remove(1);

    }


    const categories =
        [
            ...new Set(
                exhibitors
                    .map(
                        exhibitor =>
                            exhibitor.category
                    )
                    .filter(Boolean)
            )
        ]
            .sort(
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

        console.error(
            'Missing element with id="expoFloor".'
        );

        return;

    }


    const unit =
        FLOOR_CONFIG.unitPixels;


    floor.style.width =
        `${
            FLOOR_CONFIG.widthUnits *
            unit
        }px`;


    floor.style.height =
        `${
            FLOOR_CONFIG.heightUnits *
            unit
        }px`;


    floor.innerHTML =
        "";


    renderZones(
        floor
    );


    renderAisles(
        floor
    );


    APTA_FLOOR_LAYOUT.forEach(
        layout => {

            const exhibitorsAtBooth =
                getExhibitorsByBooth(
                    layout.booth_number
                );


            floor.appendChild(
                createBooth(
                    layout,
                    exhibitorsAtBooth
                )
            );

        }
    );


    applyFilters();

}


/* =========================================================
   FLOOR ZONES
   ========================================================= */

function renderZones(
    floor
) {

    const unit =
        FLOOR_CONFIG.unitPixels;


    FLOOR_ZONES.forEach(
        zone => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "floor-zone";


            element.style.left =
                `${zone.x * unit}px`;


            element.style.top =
                `${zone.y * unit}px`;


            element.style.width =
                `${zone.width * unit}px`;


            element.style.height =
                `${zone.height * unit}px`;


            const label =
                document.createElement(
                    "span"
                );


            label.textContent =
                zone.label;


            element.appendChild(
                label
            );


            floor.appendChild(
                element
            );

        }
    );

}


/* =========================================================
   FLOOR AISLES
   ========================================================= */

function renderAisles(
    floor
) {

    const unit =
        FLOOR_CONFIG.unitPixels;


    FLOOR_AISLES.forEach(
        aisle => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "floor-aisle";


            element.style.left =
                `${aisle.x * unit}px`;


            element.style.top =
                `${aisle.y * unit}px`;


            element.style.width =
                `${aisle.width * unit}px`;


            element.style.height =
                `${aisle.height * unit}px`;


            const label =
                document.createElement(
                    "span"
                );


            label.textContent =
                aisle.label;


            element.appendChild(
                label
            );


            floor.appendChild(
                element
            );

        }
    );

}


/* =========================================================
   CREATE BOOTH
   ========================================================= */

function createBooth(
    layout,
    exhibitorsAtBooth
) {

    const unit =
        FLOOR_CONFIG.unitPixels;


    const booth =
        document.createElement(
            "button"
        );


    booth.type =
        "button";


    booth.className =
        "expo-booth";


    booth.dataset.booth =
        layout.booth_number;


    booth.style.left =
        `${layout.x * unit}px`;


    booth.style.top =
        `${layout.y * unit}px`;


    booth.style.width =
        `${layout.width * unit}px`;


    booth.style.height =
        `${layout.depth * unit}px`;


    const primaryExhibitor =
        exhibitorsAtBooth[0]
        ||
        null;


    if (
        isBoothTargeted(
            layout.booth_number
        )
    ) {

        booth.classList.add(
            "target"
        );

    }


    if (
        selectedExhibitor &&
        String(
            selectedExhibitor.booth_number
        )
        ===
        String(
            layout.booth_number
        )
    ) {

        booth.classList.add(
            "selected"
        );

    }


    const companyLabel =
        primaryExhibitor
            ?.company_name
        ||
        `Booth ${layout.booth_number}`;


    booth.innerHTML = `

        <span class="expo-booth-number">

            ${
                escapeHTML(
                    layout.booth_number
                )
            }

        </span>


        ${
            layout.width >= 2 ||
            layout.depth >= 2

            ?

            `

                <span class="expo-booth-company">

                    ${
                        escapeHTML(
                            shortenCompany(
                                companyLabel
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

            selectBooth(
                layout.booth_number
            );

        }
    );


    booth.addEventListener(
        "mouseenter",
        event => {

            showTooltip(
                layout,
                exhibitorsAtBooth,
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
   BOOTH LOOKUPS
   ========================================================= */

function getExhibitorsByBooth(
    boothNumber
) {

    return exhibitors.filter(
        exhibitor =>
            String(
                exhibitor.booth_number
            )
            ===
            String(
                boothNumber
            )
    );

}


function getPrimaryExhibitorByBooth(
    boothNumber
) {

    return (
        getExhibitorsByBooth(
            boothNumber
        )[0]
        ||
        null
    );

}


function getLayoutByBooth(
    boothNumber
) {

    return APTA_FLOOR_LAYOUT.find(
        layout =>
            String(
                layout.booth_number
            )
            ===
            String(
                boothNumber
            )
    )
    ||
    null;

}


/* =========================================================
   SELECT BOOTH
   ========================================================= */

function selectBooth(
    boothNumber
) {

    const layout =
        getLayoutByBooth(
            boothNumber
        );


    if (!layout) {
        return;
    }


    const exhibitorsAtBooth =
        getExhibitorsByBooth(
            boothNumber
        );


    const primary =
        exhibitorsAtBooth[0]
        ||
        null;


    selectedExhibitor = {

        id:
            primary?.id ||
            boothNumber,

        company_name:
            primary?.company_name ||
            `Booth ${boothNumber}`,

        booth_number:
            boothNumber,

        category:
            primary?.category ||
            "APTA Exhibitor",

        description:
            primary?.description ||
            "Public exhibitor profile information is being added.",

        website:
            primary?.website ||
            "",

        exhibitors_at_booth:
            exhibitorsAtBooth,

        layout:
            layout

    };


    updateSelectedPanel();

    renderFloor();

}


/* =========================================================
   SELECTED PANEL
   ========================================================= */

function updateSelectedPanel() {

    const empty =
        document.getElementById(
            "selectedEmpty"
        );


    const card =
        document.getElementById(
            "selectedCard"
        );


    if (!selectedExhibitor) {

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


    const layout =
        selectedExhibitor.layout;


    const widthFeet =
        layout.width *
        FLOOR_CONFIG.unitFeet;


    const depthFeet =
        layout.depth *
        FLOOR_CONFIG.unitFeet;


    const squareFeet =
        widthFeet *
        depthFeet;


    setText(
        "selectedCompanyMark",
        getInitials(
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
        `${widthFeet}' × ${depthFeet}'`
    );


    setText(
        "selectedSqFt",
        `${squareFeet} sq ft`
    );


    setText(
        "selectedDescription",
        selectedExhibitor.description
    );


    updateSelectedTargetState();

    updateSelectedLinks();

}


/* =========================================================
   SELECTED TARGET STATE
   ========================================================= */

function updateSelectedTargetState() {

    if (!selectedExhibitor) {
        return;
    }


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


    const button =
        document.getElementById(
            "selectedTargetButton"
        );


    if (button) {

        button.innerHTML =
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

}


/* =========================================================
   SELECTED LINKS
   ========================================================= */

function updateSelectedLinks() {

    if (!selectedExhibitor) {
        return;
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
   FILTERS
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


    const categoryFilter =
        document
            .getElementById(
                "mapCategoryFilter"
            )
            ?.value ||
        "";


    visibleBoothCount =
        0;


    document
        .querySelectorAll(
            ".expo-booth"
        )
        .forEach(
            booth => {

                const boothNumber =
                    booth.dataset.booth;


                const boothExhibitors =
                    getExhibitorsByBooth(
                        boothNumber
                    );


                const searchable =
                    [
                        boothNumber,

                        ...boothExhibitors.map(
                            exhibitor =>
                                exhibitor.company_name
                        ),

                        ...boothExhibitors.map(
                            exhibitor =>
                                exhibitor.category
                        )
                    ]
                        .join(" ")
                        .toLowerCase();


                const matchesSearch =
                    !search ||
                    searchable.includes(
                        search
                    );


                const matchesCategory =
                    !categoryFilter ||
                    boothExhibitors.some(
                        exhibitor =>
                            exhibitor.category ===
                            categoryFilter
                    );


                const targeted =
                    isBoothTargeted(
                        boothNumber
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

                    visibleBoothCount++;

                }

            }
        );


    setText(
        "mapVisibleCount",
        visibleBoothCount
    );

}


/* =========================================================
   TARGET STORAGE
   ========================================================= */

function getTargets() {

    try {

        const stored =
            localStorage.getItem(
                TARGET_STORAGE_KEY
            );


        return stored
            ?
            JSON.parse(
                stored
            )
            :
            [];

    }

    catch (error) {

        console.error(
            "Unable to read target storage:",
            error
        );


        return [];

    }

}


function saveTargets(
    targets
) {

    localStorage.setItem(
        TARGET_STORAGE_KEY,
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


function isBoothTargeted(
    boothNumber
) {

    const boothExhibitors =
        getExhibitorsByBooth(
            boothNumber
        );


    return boothExhibitors.some(
        exhibitor =>
            isTargeted(
                exhibitor.id
            )
    );

}


/* =========================================================
   TOGGLE SELECTED TARGET
   ========================================================= */

function toggleSelectedTarget() {

    if (!selectedExhibitor) {
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
        index >=
        0
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

            booth_number:
                selectedExhibitor.booth_number,

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


    updateSelectedTargetState();

    renderTargetRoute();

    renderFloor();

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


    const route =
        getTargets()
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


                    const layout =
                        getLayoutByBooth(
                            exhibitor.booth_number
                        );


                    if (!layout) {
                        return null;
                    }


                    return {

                        exhibitor,

                        layout,

                        target

                    };

                }
            )
            .filter(Boolean)
            .sort(
                (a, b) => {

                    if (
                        a.layout.y !==
                        b.layout.y
                    ) {

                        return (
                            a.layout.y -
                            b.layout.y
                        );

                    }


                    return (
                        a.layout.x -
                        b.layout.x
                    );

                }
            );


    setText(
        "targetRouteCount",
        route.length
    );


    container.innerHTML =
        "";


    if (
        !route.length
    ) {

        container.innerHTML = `

            <div class="route-empty">

                No mapped Northstar targets yet.

            </div>

        `;


        return;

    }


    route.forEach(
        (
            item,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "route-item";


            button.innerHTML = `

                <span class="route-number">

                    ${
                        String(
                            index + 1
                        )
                            .padStart(
                                2,
                                "0"
                            )
                    }

                </span>


                <span class="route-copy">

                    <strong>

                        ${
                            escapeHTML(
                                item.exhibitor.company_name
                            )
                        }

                    </strong>


                    <span>

                        Booth ${
                            escapeHTML(
                                item.exhibitor.booth_number
                            )
                        }

                    </span>

                </span>


                <span class="route-arrow">

                    →

                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    selectBooth(
                        item.exhibitor.booth_number
                    );


                    scrollToBooth(
                        item.exhibitor.booth_number
                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   TOOLTIP
   ========================================================= */

function showTooltip(
    layout,
    exhibitorsAtBooth,
    event
) {

    const widthFeet =
        layout.width *
        FLOOR_CONFIG.unitFeet;


    const depthFeet =
        layout.depth *
        FLOOR_CONFIG.unitFeet;


    const squareFeet =
        widthFeet *
        depthFeet;


    const companyNames =
        exhibitorsAtBooth.length
            ?
            exhibitorsAtBooth
                .map(
                    exhibitor =>
                        exhibitor.company_name
                )
                .join(" / ")
            :
            `Booth ${layout.booth_number}`;


    setText(
        "tooltipStatus",
        isBoothTargeted(
            layout.booth_number
        )
            ?
            "NORTHSTAR TARGET"
            :
            "APTA EXHIBITOR"
    );


    setText(
        "tooltipCompany",
        companyNames
    );


    setText(
        "tooltipBooth",
        `Booth ${layout.booth_number}`
    );


    setText(
        "tooltipSize",
        `${widthFeet}' × ${depthFeet}' · ${squareFeet} sq ft`
    );


    const tooltip =
        document.getElementById(
            "boothTooltip"
        );


    if (!tooltip) {
        return;
    }


    tooltip.hidden =
        false;


    moveTooltip(
        event
    );

}


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


    const gap =
        16;


    let x =
        event.clientX +
        gap;


    let y =
        event.clientY +
        gap;


    if (
        x +
        tooltip.offsetWidth >
        window.innerWidth - 10
    ) {

        x =
            event.clientX -
            tooltip.offsetWidth -
            gap;

    }


    if (
        y +
        tooltip.offsetHeight >
        window.innerHeight - 10
    ) {

        y =
            event.clientY -
            tooltip.offsetHeight -
            gap;

    }


    tooltip.style.left =
        `${x}px`;


    tooltip.style.top =
        `${y}px`;

}


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
   METRICS
   ========================================================= */

function updateMetrics() {

    setText(
        "mapExhibitorCount",
        exhibitors.length
    );


    const mappedTargetCount =
        getTargets().filter(
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
                    return false;
                }


                return Boolean(
                    getLayoutByBooth(
                        exhibitor.booth_number
                    )
                );

            }
        ).length;


    setText(
        "mapTargetCount",
        mappedTargetCount
    );


    setText(
        "mapVisibleCount",
        APTA_FLOOR_LAYOUT.length
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


    const target =
        document.getElementById(
            "mapTargetFilter"
        );


    const category =
        document.getElementById(
            "mapCategoryFilter"
        );


    if (search) {
        search.value = "";
    }


    if (target) {
        target.value = "";
    }


    if (category) {
        category.value = "";
    }


    selectedExhibitor =
        null;


    updateSelectedPanel();

    renderFloor();

    updateMetrics();


    setStatus(
        "Floor view reset"
    );

}


/* =========================================================
   OPEN FROM URL
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


    const exhibitor =
        exhibitors.find(
            item =>
                String(
                    item.id
                )
                ===
                String(
                    id
                )
        );


    if (!exhibitor) {
        return;
    }


    const layout =
        getLayoutByBooth(
            exhibitor.booth_number
        );


    if (!layout) {

        setStatus(
            `${exhibitor.company_name} is in the directory, but its floor geometry has not been mapped yet`
        );

        return;

    }


    selectBooth(
        exhibitor.booth_number
    );


    setTimeout(
        () => {

            scrollToBooth(
                exhibitor.booth_number
            );

        },
        60
    );

}


/* =========================================================
   SCROLL TO BOOTH
   ========================================================= */

function scrollToBooth(
    boothNumber
) {

    const booth =
        document.querySelector(
            `.expo-booth[data-booth="${boothNumber}"]`
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
   STATUS
   ========================================================= */

let statusTimer = null;


function setStatus(
    message
) {

    const element =
        document.getElementById(
            "databaseStatus"
        );


    if (!element) {
        return;
    }


    element.textContent =
        message;


    clearTimeout(
        statusTimer
    );


    statusTimer =
        setTimeout(
            () => {

                element.textContent =
                    `${exhibitors.length} exhibitors · ${APTA_FLOOR_LAYOUT.length} mapped booths`;

            },
            3500
        );

}


/* =========================================================
   HELPERS
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


/* =========================================================
   INITIALS
   ========================================================= */

function getInitials(
    company
) {

    if (!company) {

        return "?";

    }


    const words =
        company
            .replace(
                /[^A-Za-z0-9\s]/g,
                " "
            )
            .trim()
            .split(
                /\s+/
            )
            .filter(Boolean);


    if (
        words.length ===
        1
    ) {

        return words[0]
            .slice(
                0,
                2
            )
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[1][0]
    )
        .toUpperCase();

}


/* =========================================================
   SHORTEN COMPANY
   ========================================================= */

function shortenCompany(
    company
) {

    if (!company) {
        return "";
    }


    if (
        company.length <=
        18
    ) {

        return company;

    }


    return (
        company.slice(
            0,
            16
        )
        +
        "…"
    );

}


/* =========================================================
   GENERATE ID
   ========================================================= */

function generateId() {

    if (
        window.crypto &&
        typeof crypto.randomUUID ===
        "function"
    ) {

        return (
            crypto.randomUUID()
        );

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


/* =========================================================
   ESCAPE HTML
   ========================================================= */

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
