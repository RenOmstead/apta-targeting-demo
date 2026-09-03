/* =========================================================
   APTA 2026 TEAM HUB
   NORTHSTAR TRANSIT SOLUTIONS

   EXPO MAP
   Demo / Portfolio Version
   ========================================================= */


/* =========================================================
   STATE
   ========================================================= */

let exhibitors = [];

let selectedExhibitor = null;



/* =========================================================
   DEMO EXHIBITOR DATA

   This matches the demo data used on exhibitors.html.

   Later we will replace this with Supabase so both pages
   pull from the same real APTA exhibitor table.
   ========================================================= */

const demoExhibitors = [

    {
        id: 1,
        company_name: "Apex Rail Technologies",
        booth_number: "1801",
        category: "Rail Technology",
        description:
            "Develops digital monitoring, diagnostics and onboard technology for modern passenger rail systems.",
        website:
            "https://example.com",
        map_x: 15,
        map_y: 18
    },

    {
        id: 2,
        company_name: "Lumina Transit Systems",
        booth_number: "2145",
        category: "Transit Technology",
        description:
            "Provides connected transit technology, passenger information systems and intelligent fleet solutions.",
        website:
            "https://example.com",
        map_x: 31,
        map_y: 20
    },

    {
        id: 3,
        company_name: "Meridian Mobility",
        booth_number: "1334",
        category: "Mobility",
        description:
            "Designs transportation technology supporting connected mobility, fleet operations and passenger experience.",
        website:
            "https://example.com",
        map_x: 48,
        map_y: 17
    },

    {
        id: 4,
        company_name: "Forge Infrastructure Group",
        booth_number: "2418",
        category: "Engineering",
        description:
            "Engineering and infrastructure organization supporting complex transportation systems and modernization programs.",
        website:
            "https://example.com",
        map_x: 67,
        map_y: 22
    },

    {
        id: 5,
        company_name: "Arc Signal Technologies",
        booth_number: "3106",
        category: "Signals & Communications",
        description:
            "Develops signaling, communications and control technology for rail and public transportation networks.",
        website:
            "https://example.com",
        map_x: 84,
        map_y: 18
    },

    {
        id: 6,
        company_name: "Vela Passenger Systems",
        booth_number: "1722",
        category: "Passenger Systems",
        description:
            "Creates digital passenger-information, onboard communication and transit experience platforms.",
        website:
            "https://example.com",
        map_x: 20,
        map_y: 45
    },

    {
        id: 7,
        company_name: "Monarch Rolling Stock",
        booth_number: "2607",
        category: "Rolling Stock",
        description:
            "Supplies components, engineering services and lifecycle support for passenger rail vehicle programs.",
        website:
            "https://example.com",
        map_x: 37,
        map_y: 49
    },

    {
        id: 8,
        company_name: "Ember Fleet Analytics",
        booth_number: "2214",
        category: "Data & Analytics",
        description:
            "Provides fleet intelligence, predictive analytics and operational dashboards for transportation organizations.",
        website:
            "https://example.com",
        map_x: 55,
        map_y: 43
    },

    {
        id: 9,
        company_name: "Solace Engineering",
        booth_number: "1517",
        category: "Engineering",
        description:
            "Transportation engineering firm specializing in system integration, documentation and infrastructure programs.",
        website:
            "https://example.com",
        map_x: 74,
        map_y: 48
    },

    {
        id: 10,
        company_name: "NovaFare Technologies",
        booth_number: "2820",
        category: "Fare Collection",
        description:
            "Develops modern fare collection, payment and account-based ticketing systems for transit agencies.",
        website:
            "https://example.com",
        map_x: 15,
        map_y: 73
    },

    {
        id: 11,
        company_name: "Cinder Transit Manufacturing",
        booth_number: "1938",
        category: "Manufacturing",
        description:
            "Manufactures equipment and specialized components for rail and public transportation applications.",
        website:
            "https://example.com",
        map_x: 42,
        map_y: 76
    },

    {
        id: 12,
        company_name: "Aurelia Communications",
        booth_number: "2341",
        category: "Signals & Communications",
        description:
            "Provides wireless communications, network infrastructure and connected-system technology for transit environments.",
        website:
            "https://example.com",
        map_x: 72,
        map_y: 74
    }

];



/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeMap
);



async function initializeMap() {

    bindControls();

    setStatus(
        "Loading expo floor..."
    );

    await loadExhibitors();

    populateCategoryFilter();

    renderMap();

    renderTargetList();

    updateMetrics();

    openExhibitorFromURL();

    setStatus(
        `${exhibitors.length} exhibitors loaded · Expo map ready`
    );

}



/* =========================================================
   LOAD DATA
   ========================================================= */

async function loadExhibitors() {

    exhibitors = [...demoExhibitors];

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
            refreshMap
        );


    document
        .getElementById(
            "mapTargetFilter"
        )
        ?.addEventListener(
            "change",
            refreshMap
        );


    document
        .getElementById(
            "mapCategoryFilter"
        )
        ?.addEventListener(
            "change",
            refreshMap
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
   FILTERED EXHIBITORS
   ========================================================= */

function getFilteredExhibitors() {

    const search =

        (
            document
                .getElementById(
                    "mapSearch"
                )
                ?.value || ""
        )

            .trim()

            .toLowerCase();


    const targetFilter =

        document
            .getElementById(
                "mapTargetFilter"
            )
            ?.value || "";


    const category =

        document
            .getElementById(
                "mapCategoryFilter"
            )
            ?.value || "";


    return exhibitors.filter(
        exhibitor => {

            const text = [

                exhibitor.company_name,

                exhibitor.booth_number,

                exhibitor.category,

                exhibitor.description

            ]

                .filter(Boolean)

                .join(" ")

                .toLowerCase();


            if (
                search &&
                !text.includes(search)
            ) {
                return false;
            }


            if (
                category &&
                exhibitor.category !==
                category
            ) {
                return false;
            }


            const targeted =
                isTargeted(
                    exhibitor.id
                );


            if (
                targetFilter ===
                "targets" &&
                !targeted
            ) {
                return false;
            }


            if (
                targetFilter ===
                "not-targets" &&
                targeted
            ) {
                return false;
            }


            return true;

        }
    );

}



/* =========================================================
   REFRESH
   ========================================================= */

function refreshMap() {

    renderMap();

    renderTargetList();

    updateMetrics();

}



/* =========================================================
   MAP RENDER
   ========================================================= */

function renderMap() {

    const map =
        document.getElementById(
            "expoMap"
        );


    if (!map) {
        return;
    }


    const filtered =
        getFilteredExhibitors();


    map.innerHTML = "";


    if (
        filtered.length === 0
    ) {

        map.innerHTML = `

            <div class="map-placeholder">

                <span class="map-placeholder-number">
                    0
                </span>

                <div>

                    <strong>
                        No booths match your filters.
                    </strong>

                    <p>
                        Try another search,
                        category, or target filter.
                    </p>

                </div>

            </div>

        `;


        updateMetrics();


        return;

    }



    /*
       Decorative floor lanes.
    */

    createFloorZones(map);



    filtered.forEach(
        exhibitor => {

            const marker =
                createBoothMarker(
                    exhibitor
                );


            map.appendChild(
                marker
            );

        }
    );


    updateMetrics();

}



/* =========================================================
   DECORATIVE MAP ZONES
   ========================================================= */

function createFloorZones(
    map
) {

    const zones = [

        {
            label: "A",
            top: "8%",
            left: "5%",
            width: "90%",
            height: "22%"
        },

        {
            label: "B",
            top: "36%",
            left: "5%",
            width: "90%",
            height: "22%"
        },

        {
            label: "C",
            top: "65%",
            left: "5%",
            width: "90%",
            height: "22%"
        }

    ];


    zones.forEach(
        zone => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "floor-zone";


            element.style.position =
                "absolute";

            element.style.top =
                zone.top;

            element.style.left =
                zone.left;

            element.style.width =
                zone.width;

            element.style.height =
                zone.height;

            element.style.border =
                "1px solid rgba(247,239,232,0.045)";

            element.style.pointerEvents =
                "none";


            const label =
                document.createElement(
                    "span"
                );


            label.textContent =
                `ZONE ${zone.label}`;


            label.style.position =
                "absolute";

            label.style.left =
                "12px";

            label.style.top =
                "10px";

            label.style.color =
                "rgba(215,185,134,0.22)";

            label.style.fontSize =
                "9px";

            label.style.fontWeight =
                "800";

            label.style.letterSpacing =
                "0.12em";


            element.appendChild(
                label
            );


            map.appendChild(
                element
            );

        }
    );

}



/* =========================================================
   CREATE BOOTH MARKER
   ========================================================= */

function createBoothMarker(
    exhibitor
) {

    const marker =
        document.createElement(
            "button"
        );


    marker.type =
        "button";


    marker.className =
        "booth-marker";


    marker.dataset.id =
        exhibitor.id;


    if (
        isTargeted(
            exhibitor.id
        )
    ) {

        marker.classList.add(
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

        marker.classList.add(
            "selected"
        );

    }


    marker.style.left =
        `${exhibitor.map_x}%`;


    marker.style.top =
        `${exhibitor.map_y}%`;


    marker.textContent =
        exhibitor.booth_number ||
        "—";


    marker.title =
        `${exhibitor.company_name} · Booth ${exhibitor.booth_number}`;


    marker.addEventListener(
        "click",
        () => {

            selectExhibitor(
                exhibitor.id
            );

        }
    );


    return marker;

}



/* =========================================================
   SELECT EXHIBITOR
   ========================================================= */

function selectExhibitor(
    exhibitorId
) {

    const exhibitor =
        exhibitors.find(
            item =>
                String(item.id) ===
                String(exhibitorId)
        );


    if (!exhibitor) {
        return;
    }


    selectedExhibitor =
        exhibitor;


    updateSelectedPanel();

    renderMap();

}



/* =========================================================
   SELECTED SIDEBAR
   ========================================================= */

function updateSelectedPanel() {

    const empty =
        document.getElementById(
            "mapSelectedEmpty"
        );


    const card =
        document.getElementById(
            "mapSelectedCard"
        );


    if (
        !selectedExhibitor
    ) {

        if (empty) {

            empty.hidden =
                false;

        }


        if (card) {

            card.hidden =
                true;

        }


        return;

    }


    if (empty) {

        empty.hidden =
            true;

    }


    if (card) {

        card.hidden =
            false;

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
        selectedExhibitor.booth_number ||
        "—"
    );


    setText(
        "selectedDescription",
        selectedExhibitor.description ||
        "Company information is currently being researched."
    );


    const badge =
        document.getElementById(
            "selectedTargetBadge"
        );


    const targeted =
        isTargeted(
            selectedExhibitor.id
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
                    Remove Target
                    <span>×</span>
                `
                :
                `
                    Add Target
                    <span>+</span>
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
   TARGET LIST
   ========================================================= */

function renderTargetList() {

    const list =
        document.getElementById(
            "mapTargetList"
        );


    if (!list) {
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
                                String(item.id) ===
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



    list.innerHTML = "";


    if (
        targetExhibitors.length === 0
    ) {

        list.innerHTML = `

            <div class="target-list-empty">

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
                "map-target-item";


            item.innerHTML = `

                <span class="map-target-number">

                    ${
                        String(
                            index + 1
                        ).padStart(
                            2,
                            "0"
                        )
                    }

                </span>


                <div class="map-target-copy">

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
                                exhibitor.booth_number ||
                                "—"
                            )
                        }

                        ·

                        ${
                            escapeHTML(
                                formatPriority(
                                    exhibitor.target.priority
                                )
                            )
                        }

                    </span>

                </div>


                <span class="map-target-arrow">
                    →
                </span>

            `;


            item.addEventListener(
                "click",
                () => {

                    selectExhibitor(
                        exhibitor.id
                    );


                    scrollMapIntoView();

                }
            );


            list.appendChild(
                item
            );

        }
    );

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
            JSON.parse(stored)
            :
            [];

    }

    catch (error) {

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
   IS TARGET
   ========================================================= */

function isTargeted(
    exhibitorId
) {

    return getTargets().some(
        target =>
            String(
                target.exhibitor_id
            ) ===
            String(
                exhibitorId
            )
    );

}



/* =========================================================
   ADD / REMOVE TARGET
   ========================================================= */

function toggleSelectedTarget() {

    if (
        !selectedExhibitor
    ) {
        return;
    }


    const targets =
        getTargets();


    const existingIndex =
        targets.findIndex(
            target =>
                String(
                    target.exhibitor_id
                ) ===
                String(
                    selectedExhibitor.id
                )
        );


    if (
        existingIndex >= 0
    ) {

        targets.splice(
            existingIndex,
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


    updateSelectedPanel();

    renderMap();

    renderTargetList();

    updateMetrics();

}



/* =========================================================
   METRICS
   ========================================================= */

function updateMetrics() {

    const visible =
        getFilteredExhibitors();


    const targetCount =
        exhibitors.filter(
            exhibitor =>
                isTargeted(
                    exhibitor.id
                )
        ).length;


    setText(
        "mapExhibitorCount",
        exhibitors.length
    );


    setText(
        "mapTargetCount",
        targetCount
    );


    setText(
        "mapVisibleCount",
        visible.length
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

    refreshMap();


    setStatus(
        "Map view reset"
    );

}



/* =========================================================
   OPEN EXHIBITOR FROM URL
   ========================================================= */

function openExhibitorFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        params.get("id");


    if (!id) {
        return;
    }


    selectExhibitor(
        id
    );

}



/* =========================================================
   SCROLL TO MAP
   ========================================================= */

function scrollMapIntoView() {

    document
        .getElementById(
            "expoMap"
        )
        ?.scrollIntoView({

            behavior:
                "smooth",

            block:
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
                    `${exhibitors.length} exhibitors loaded · Expo map ready`;

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



function formatPriority(
    value
) {

    const labels = {

        high:
            "High Priority",

        medium:
            "Medium Priority",

        low:
            "Low Priority"

    };


    return (
        labels[value]
        ||
        "Medium Priority"
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
