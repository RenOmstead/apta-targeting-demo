/* =========================================================
   APTA 2026 TEAM HUB
   NORTHSTAR TRANSIT SOLUTIONS

   EXHIBITOR DIRECTORY
   Demo / Portfolio Version
   ========================================================= */


/* =========================================================
   STATE
   ========================================================= */

let exhibitors = [];

let selectedExhibitor = null;

let currentView = "grid";



/* =========================================================
   DEMO DATA

   Temporary.

   Later we will replace this array with the complete
   APTA exhibitor database from Supabase.
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
            "https://example.com"
    },

    {
        id: 2,
        company_name: "Lumina Transit Systems",
        booth_number: "2145",
        category: "Transit Technology",
        description:
            "Provides connected transit technology, passenger information systems and intelligent fleet solutions.",
        website:
            "https://example.com"
    },

    {
        id: 3,
        company_name: "Meridian Mobility",
        booth_number: "1334",
        category: "Mobility",
        description:
            "Designs transportation technology supporting connected mobility, fleet operations and passenger experience.",
        website:
            "https://example.com"
    },

    {
        id: 4,
        company_name: "Forge Infrastructure Group",
        booth_number: "2418",
        category: "Engineering",
        description:
            "Engineering and infrastructure organization supporting complex transportation systems and modernization programs.",
        website:
            "https://example.com"
    },

    {
        id: 5,
        company_name: "Arc Signal Technologies",
        booth_number: "3106",
        category: "Signals & Communications",
        description:
            "Develops signaling, communications and control technology for rail and public transportation networks.",
        website:
            "https://example.com"
    },

    {
        id: 6,
        company_name: "Vela Passenger Systems",
        booth_number: "1722",
        category: "Passenger Systems",
        description:
            "Creates digital passenger-information, onboard communication and transit experience platforms.",
        website:
            "https://example.com"
    },

    {
        id: 7,
        company_name: "Monarch Rolling Stock",
        booth_number: "2607",
        category: "Rolling Stock",
        description:
            "Supplies components, engineering services and lifecycle support for passenger rail vehicle programs.",
        website:
            "https://example.com"
    },

    {
        id: 8,
        company_name: "Ember Fleet Analytics",
        booth_number: "2214",
        category: "Data & Analytics",
        description:
            "Provides fleet intelligence, predictive analytics and operational dashboards for transportation organizations.",
        website:
            "https://example.com"
    },

    {
        id: 9,
        company_name: "Solace Engineering",
        booth_number: "1517",
        category: "Engineering",
        description:
            "Transportation engineering firm specializing in system integration, documentation and infrastructure programs.",
        website:
            "https://example.com"
    },

    {
        id: 10,
        company_name: "NovaFare Technologies",
        booth_number: "2820",
        category: "Fare Collection",
        description:
            "Develops modern fare collection, payment and account-based ticketing systems for transit agencies.",
        website:
            "https://example.com"
    },

    {
        id: 11,
        company_name: "Cinder Transit Manufacturing",
        booth_number: "1938",
        category: "Manufacturing",
        description:
            "Manufactures equipment and specialized components for rail and public transportation applications.",
        website:
            "https://example.com"
    },

    {
        id: 12,
        company_name: "Aurelia Communications",
        booth_number: "2341",
        category: "Signals & Communications",
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
    initializeExhibitors
);



async function initializeExhibitors() {

    bindControls();

    setDatabaseStatus(
        "Loading exhibitor intelligence..."
    );

    await loadExhibitors();

    populateCategoryFilter();

    updateMetrics();

    renderExhibitors();

    setDatabaseStatus(
        `${exhibitors.length} exhibitors loaded · Demo workspace active`
    );


    /*
       Allows another page to link directly to an exhibitor:

       exhibitors.html?id=4
    */

    openExhibitorFromURL();

}



/* =========================================================
   LOAD DATA

   For now:
   loads demo exhibitors.

   Later:
   replace this function with Supabase.
   ========================================================= */

async function loadExhibitors() {

    exhibitors = [...demoExhibitors];

}



/* =========================================================
   CONTROLS
   ========================================================= */

function bindControls() {

    const search =
        document.getElementById(
            "exhibitorSearch"
        );

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );

    const targetFilter =
        document.getElementById(
            "targetFilter"
        );

    const sortFilter =
        document.getElementById(
            "sortFilter"
        );

    const gridButton =
        document.getElementById(
            "gridViewButton"
        );

    const listButton =
        document.getElementById(
            "listViewButton"
        );


    search?.addEventListener(
        "input",
        renderExhibitors
    );


    categoryFilter?.addEventListener(
        "change",
        renderExhibitors
    );


    targetFilter?.addEventListener(
        "change",
        renderExhibitors
    );


    sortFilter?.addEventListener(
        "change",
        renderExhibitors
    );


    gridButton?.addEventListener(
        "click",
        () => setView("grid")
    );


    listButton?.addEventListener(
        "click",
        () => setView("list")
    );


    bindDrawer();

}



/* =========================================================
   CATEGORY FILTER
   ========================================================= */

function populateCategoryFilter() {

    const select =
        document.getElementById(
            "categoryFilter"
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

            option.value = category;

            option.textContent =
                category;

            select.appendChild(
                option
            );

        }
    );

}



/* =========================================================
   FILTER EXHIBITORS
   ========================================================= */

function getFilteredExhibitors() {

    const search =
        (
            document
                .getElementById(
                    "exhibitorSearch"
                )
                ?.value || ""
        )
            .trim()
            .toLowerCase();


    const category =
        document
            .getElementById(
                "categoryFilter"
            )
            ?.value || "";


    const targetFilter =
        document
            .getElementById(
                "targetFilter"
            )
            ?.value || "";


    const sort =
        document
            .getElementById(
                "sortFilter"
            )
            ?.value ||
        "company-asc";


    let filtered =
        exhibitors.filter(
            exhibitor => {

                const research =
                    getResearch(
                        exhibitor.id
                    );


                const searchableText = [

                    exhibitor.company_name,

                    exhibitor.booth_number,

                    exhibitor.category,

                    exhibitor.description,

                    research.notes

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                if (
                    search &&
                    !searchableText.includes(
                        search
                    )
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
                    "target" &&
                    !targeted
                ) {
                    return false;
                }


                if (
                    targetFilter ===
                    "not-target" &&
                    targeted
                ) {
                    return false;
                }


                return true;

            }
        );


    filtered =
        sortExhibitors(
            filtered,
            sort
        );


    return filtered;

}



/* =========================================================
   SORT
   ========================================================= */

function sortExhibitors(
    list,
    sort
) {

    const sorted =
        [...list];


    if (
        sort ===
        "company-desc"
    ) {

        sorted.sort(
            (a, b) =>
                b.company_name
                    .localeCompare(
                        a.company_name
                    )
        );

    }


    else if (
        sort ===
        "booth"
    ) {

        sorted.sort(
            (a, b) =>
                naturalCompare(
                    a.booth_number,
                    b.booth_number
                )
        );

    }


    else if (
        sort ===
        "targets"
    ) {

        sorted.sort(
            (a, b) => {

                const aTarget =
                    isTargeted(a.id)
                        ? 1
                        : 0;

                const bTarget =
                    isTargeted(b.id)
                        ? 1
                        : 0;


                if (
                    bTarget !==
                    aTarget
                ) {

                    return (
                        bTarget -
                        aTarget
                    );

                }


                return (
                    a.company_name
                        .localeCompare(
                            b.company_name
                        )
                );

            }
        );

    }


    else {

        sorted.sort(
            (a, b) =>
                a.company_name
                    .localeCompare(
                        b.company_name
                    )
        );

    }


    return sorted;

}



/* =========================================================
   RENDER
   ========================================================= */

function renderExhibitors() {

    const grid =
        document.getElementById(
            "exhibitorGrid"
        );


    if (!grid) {
        return;
    }


    const filtered =
        getFilteredExhibitors();


    updateResultCount(
        filtered.length
    );


    grid.innerHTML = "";


    if (
        currentView ===
        "list"
    ) {

        grid.classList.add(
            "list-view"
        );

    }

    else {

        grid.classList.remove(
            "list-view"
        );

    }


    if (
        filtered.length === 0
    ) {

        grid.innerHTML = `

            <div class="directory-empty">

                <span class="empty-number">
                    0
                </span>

                <div>

                    <strong>
                        No exhibitors found.
                    </strong>

                    <p>
                        Try changing your search
                        terms or directory filters.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    filtered.forEach(
        exhibitor => {

            grid.appendChild(
                createExhibitorCard(
                    exhibitor
                )
            );

        }
    );

}



/* =========================================================
   CREATE CARD
   ========================================================= */

function createExhibitorCard(
    exhibitor
) {

    const targeted =
        isTargeted(
            exhibitor.id
        );


    const research =
        getResearch(
            exhibitor.id
        );


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "exhibitor-card";


    if (targeted) {

        card.classList.add(
            "targeted"
        );

    }


    card.dataset.id =
        exhibitor.id;


    const initial =
        getCompanyInitial(
            exhibitor.company_name
        );


    const description =
        exhibitor.description ||
        "Company information is being researched.";


    card.innerHTML = `

        <div class="exhibitor-card-top">

            <div class="exhibitor-card-mark">
                ${escapeHTML(initial)}
            </div>

            ${
                targeted
                    ?
                    `
                    <span class="exhibitor-target-badge">
                        Northstar Target
                    </span>
                    `
                    :
                    ""
            }

        </div>


        <div class="exhibitor-card-body">

            <span class="exhibitor-card-category">

                ${
                    escapeHTML(
                        exhibitor.category ||
                        "APTA Exhibitor"
                    )
                }

                ${
                    research.fit
                        ?
                        ` · ${formatFit(research.fit)}`
                        :
                        ""
                }

            </span>


            <h3>
                ${
                    escapeHTML(
                        exhibitor.company_name
                    )
                }
            </h3>


            <p class="exhibitor-card-description">

                ${
                    escapeHTML(
                        description
                    )
                }

            </p>

        </div>


        <div class="exhibitor-card-footer">

            <span class="exhibitor-booth">
                Booth ${
                    escapeHTML(
                        exhibitor.booth_number ||
                        "—"
                    )
                }
            </span>

            <span class="exhibitor-card-action">
                →
            </span>

        </div>

    `;


    card.addEventListener(
        "click",
        () => {

            openExhibitorDrawer(
                exhibitor.id
            );

        }
    );


    return card;

}



/* =========================================================
   METRICS
   ========================================================= */

function updateMetrics() {

    const total =
        exhibitors.length;


    const targetCount =
        exhibitors.filter(
            exhibitor =>
                isTargeted(
                    exhibitor.id
                )
        ).length;


    setText(
        "exhibitorTotal",
        total
    );


    setText(
        "targetTotal",
        targetCount
    );

}



/* =========================================================
   RESULT COUNT
   ========================================================= */

function updateResultCount(
    count
) {

    const text =
        count === 1
            ? "1 company"
            : `${count} companies`;


    setText(
        "resultCount",
        text
    );

}



/* =========================================================
   GRID / LIST VIEW
   ========================================================= */

function setView(
    view
) {

    currentView =
        view;


    const gridButton =
        document.getElementById(
            "gridViewButton"
        );


    const listButton =
        document.getElementById(
            "listViewButton"
        );


    gridButton
        ?.classList
        .toggle(
            "active",
            view === "grid"
        );


    listButton
        ?.classList
        .toggle(
            "active",
            view === "list"
        );


    renderExhibitors();

}



/* =========================================================
   DRAWER
   ========================================================= */

function bindDrawer() {

    const overlay =
        document.getElementById(
            "drawerOverlay"
        );


    const close =
        document.getElementById(
            "drawerClose"
        );


    const targetButton =
        document.getElementById(
            "drawerTargetButton"
        );


    const saveResearch =
        document.getElementById(
            "saveResearchButton"
        );


    overlay?.addEventListener(
        "click",
        closeExhibitorDrawer
    );


    close?.addEventListener(
        "click",
        closeExhibitorDrawer
    );


    targetButton?.addEventListener(
        "click",
        toggleSelectedTarget
    );


    saveResearch?.addEventListener(
        "click",
        saveSelectedResearch
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeExhibitorDrawer();

            }

        }
    );

}



/* =========================================================
   OPEN DRAWER
   ========================================================= */

function openExhibitorDrawer(
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


    const research =
        getResearch(
            exhibitor.id
        );


    setText(
        "drawerCompany",
        exhibitor.company_name
    );


    setText(
        "drawerCompanyMark",
        getCompanyInitial(
            exhibitor.company_name
        )
    );


    setText(
        "drawerCategory",
        exhibitor.category ||
        "APTA Exhibitor"
    );


    setText(
        "drawerBooth",
        `Booth ${
            exhibitor.booth_number ||
            "—"
        }`
    );


    setText(
        "drawerBoothDetail",
        exhibitor.booth_number ||
        "—"
    );


    setText(
        "drawerCategoryDetail",
        exhibitor.category ||
        "—"
    );


    setText(
        "drawerDescription",
        exhibitor.description ||
        "Company information is currently being researched."
    );


    const website =
        document.getElementById(
            "drawerWebsite"
        );


    if (
        website &&
        exhibitor.website
    ) {

        website.href =
            exhibitor.website;

        website.textContent =
            cleanWebsite(
                exhibitor.website
            );

        website.style.pointerEvents =
            "auto";

    }

    else if (website) {

        website.href = "#";

        website.textContent =
            "Not available";

        website.style.pointerEvents =
            "none";

    }


    const fit =
        document.getElementById(
            "drawerFit"
        );


    if (fit) {

        fit.value =
            research.fit || "";

    }


    const notes =
        document.getElementById(
            "drawerNotes"
        );


    if (notes) {

        notes.value =
            research.notes || "";

    }


    updateDrawerTargetState();


    const mapLink =
        document.getElementById(
            "drawerMapLink"
        );


    if (mapLink) {

        mapLink.href =
            `map.html?id=${
                encodeURIComponent(
                    exhibitor.id
                )
            }`;

    }


    const interactionLink =
        document.getElementById(
            "drawerInteractionLink"
        );


    if (
        interactionLink
    ) {

        interactionLink.href =
            `interactions.html?exhibitor=${
                encodeURIComponent(
                    exhibitor.id
                )
            }`;

    }


    document
        .getElementById(
            "drawerOverlay"
        )
        ?.classList
        .add("open");


    const drawer =
        document.getElementById(
            "exhibitorDrawer"
        );


    drawer
        ?.classList
        .add("open");


    drawer?.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}



/* =========================================================
   CLOSE DRAWER
   ========================================================= */

function closeExhibitorDrawer() {

    document
        .getElementById(
            "drawerOverlay"
        )
        ?.classList
        .remove("open");


    const drawer =
        document.getElementById(
            "exhibitorDrawer"
        );


    drawer
        ?.classList
        .remove("open");


    drawer?.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    selectedExhibitor =
        null;

}



/* =========================================================
   TARGET STORAGE

   Temporary localStorage implementation.

   Later this becomes the Supabase "targets" table.
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
            "Could not read targets:",
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
        JSON.stringify(targets)
    );

}



/* =========================================================
   CHECK TARGET
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
                ) ===
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


        saveTargets(
            targets
        );


        showTemporaryStatus(
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


        saveTargets(
            targets
        );


        showTemporaryStatus(
            `${selectedExhibitor.company_name} added to Northstar targets`
        );

    }


    updateDrawerTargetState();

    updateMetrics();

    renderExhibitors();

}



/* =========================================================
   DRAWER TARGET STATE
   ========================================================= */

function updateDrawerTargetState() {

    if (
        !selectedExhibitor
    ) {
        return;
    }


    const targeted =
        isTargeted(
            selectedExhibitor.id
        );


    const button =
        document.getElementById(
            "drawerTargetButton"
        );


    const status =
        document.getElementById(
            "drawerTargetStatus"
        );


    if (button) {

        button.classList.toggle(
            "active",
            targeted
        );


        button.innerHTML =
            targeted
                ?
                `
                    <span>✓</span>
                    Northstar Target
                `
                :
                `
                    <span>+</span>
                    Add to Northstar Targets
                `;

    }


    if (status) {

        status.textContent =
            targeted
                ?
                "Northstar Target"
                :
                "Not Targeted";

    }

}



/* =========================================================
   RESEARCH STORAGE
   ========================================================= */

function getAllResearch() {

    try {

        const stored =
            localStorage.getItem(
                "northstar_apta_research"
            );


        return stored
            ?
            JSON.parse(stored)
            :
            {};

    }

    catch (error) {

        console.error(
            "Could not read research:",
            error
        );


        return {};

    }

}



function getResearch(
    exhibitorId
) {

    const research =
        getAllResearch();


    return (
        research[
            String(
                exhibitorId
            )
        ]
        || {
            fit: "",
            notes: ""
        }
    );

}



/* =========================================================
   SAVE RESEARCH
   ========================================================= */

function saveSelectedResearch() {

    if (
        !selectedExhibitor
    ) {
        return;
    }


    const fit =
        document
            .getElementById(
                "drawerFit"
            )
            ?.value || "";


    const notes =
        document
            .getElementById(
                "drawerNotes"
            )
            ?.value
            ?.trim() || "";


    const research =
        getAllResearch();


    research[
        String(
            selectedExhibitor.id
        )
    ] = {

        fit,
        notes,

        updated_at:
            new Date()
                .toISOString()

    };


    localStorage.setItem(
        "northstar_apta_research",
        JSON.stringify(
            research
        )
    );


    /*
       If someone saves research,
       automatically make the company
       a target.

       This makes the workflow feel
       natural.
    */

    if (
        !isTargeted(
            selectedExhibitor.id
        )
    ) {

        const targets =
            getTargets();


        targets.push({

            id:
                generateId(),

            exhibitor_id:
                selectedExhibitor.id,

            priority:
                fit === "high"
                    ?
                    "high"
                    :
                    "medium",

            visited:
                false,

            assigned_to:
                "",

            notes:
                notes,

            status:
                "research",

            created_at:
                new Date()
                    .toISOString()

        });


        saveTargets(
            targets
        );

    }


    updateDrawerTargetState();

    updateMetrics();

    renderExhibitors();


    showTemporaryStatus(
        `Research saved for ${selectedExhibitor.company_name}`
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


    openExhibitorDrawer(
        id
    );

}



/* =========================================================
   STATUS
   ========================================================= */

function setDatabaseStatus(
    message
) {

    const status =
        document.getElementById(
            "databaseStatus"
        );


    if (status) {

        status.textContent =
            message;

    }

}



/* =========================================================
   TEMPORARY STATUS MESSAGE
   ========================================================= */

let statusTimer = null;


function showTemporaryStatus(
    message
) {

    const original =
        `${exhibitors.length} exhibitors loaded · Demo workspace active`;


    setDatabaseStatus(
        message
    );


    clearTimeout(
        statusTimer
    );


    statusTimer =
        setTimeout(
            () => {

                setDatabaseStatus(
                    original
                );

            },
            2800
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



function getCompanyInitial(
    company
) {

    if (!company) {
        return "—";
    }


    return company
        .trim()
        .charAt(0)
        .toUpperCase();

}



function formatFit(
    fit
) {

    const labels = {

        high:
            "High Fit",

        medium:
            "Medium Fit",

        low:
            "Low Fit"

    };


    return (
        labels[fit]
        || ""
    );

}



/* =========================================================
   NATURAL BOOTH SORTING
   ========================================================= */

function naturalCompare(
    a,
    b
) {

    return String(
        a || ""
    ).localeCompare(
        String(
            b || ""
        ),
        undefined,
        {
            numeric: true,
            sensitivity: "base"
        }
    );

}



/* =========================================================
   CLEAN WEBSITE DISPLAY
   ========================================================= */

function cleanWebsite(
    website
) {

    if (!website) {
        return "—";
    }


    return website

        .replace(
            /^https?:\/\//i,
            ""
        )

        .replace(
            /^www\./i,
            ""
        )

        .replace(
            /\/$/,
            ""
        );

}



/* =========================================================
   ID GENERATOR
   ========================================================= */

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
