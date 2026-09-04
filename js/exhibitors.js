/* =========================================================
   APTA 2026 TEAM HUB
   NORTHSTAR TRANSIT SOLUTIONS

   EXHIBITORS PAGE
   Uses shared data from:
   js/exhibitor-data.js
   ========================================================= */


/* =========================================================
   STATE
   ========================================================= */

let exhibitors = [];
let filteredExhibitors = [];
let selectedExhibitor = null;

let currentView = "grid";


/* =========================================================
   STORAGE KEYS
   ========================================================= */

const TARGET_STORAGE_KEY =
    "northstar_apta_targets";

const RESEARCH_STORAGE_KEY =
    "northstar_apta_research";


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeExhibitors
);


async function initializeExhibitors() {

    await loadExhibitors();

    bindControls();

    populateCategoryFilter();

    applyFilters();

    openExhibitorFromURL();

    updatePageMetrics();

    setStatus(
        `${exhibitors.length} APTA exhibitor records loaded`
    );

}


/* =========================================================
   LOAD SHARED EXHIBITOR DATA
   ========================================================= */

async function loadExhibitors() {

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
            (exhibitor, index) => ({

                id:
                    exhibitor.id ||
                    `${exhibitor.booth_number}-${index}`,

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
            "exhibitorSearch"
        )
        ?.addEventListener(
            "input",
            applyFilters
        );


    document
        .getElementById(
            "categoryFilter"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document
        .getElementById(
            "targetFilter"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document
        .getElementById(
            "sortFilter"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document
        .getElementById(
            "gridViewButton"
        )
        ?.addEventListener(
            "click",
            () => setView("grid")
        );


    document
        .getElementById(
            "listViewButton"
        )
        ?.addEventListener(
            "click",
            () => setView("list")
        );


    document
        .getElementById(
            "drawerCloseButton"
        )
        ?.addEventListener(
            "click",
            closeDrawer
        );


    document
        .getElementById(
            "drawerOverlay"
        )
        ?.addEventListener(
            "click",
            closeDrawer
        );


    document
        .getElementById(
            "drawerTargetButton"
        )
        ?.addEventListener(
            "click",
            toggleSelectedTarget
        );


    document
        .getElementById(
            "saveResearchButton"
        )
        ?.addEventListener(
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

                closeDrawer();

            }

        }
    );

}


/* =========================================================
   FILTERS
   ========================================================= */

function applyFilters() {

    const search =
        (
            document
                .getElementById(
                    "exhibitorSearch"
                )
                ?.value ||
            ""
        )
            .trim()
            .toLowerCase();


    const category =
        document
            .getElementById(
                "categoryFilter"
            )
            ?.value ||
        "";


    const targetFilter =
        document
            .getElementById(
                "targetFilter"
            )
            ?.value ||
        "";


    const sort =
        document
            .getElementById(
                "sortFilter"
            )
            ?.value ||
        "company-asc";


    filteredExhibitors =
        exhibitors.filter(
            exhibitor => {

                const searchable =
                    [
                        exhibitor.company_name,
                        exhibitor.booth_number,
                        exhibitor.category,
                        exhibitor.description
                    ]
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


                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesTarget
                );

            }
        );


    sortExhibitors(
        filteredExhibitors,
        sort
    );


    renderExhibitors();

    updatePageMetrics();

}


/* =========================================================
   SORTING
   ========================================================= */

function sortExhibitors(
    list,
    sort
) {

    list.sort(
        (a, b) => {

            switch (sort) {

                case "company-desc":

                    return (
                        b.company_name
                            .localeCompare(
                                a.company_name
                            )
                    );


                case "booth-asc":

                    return (
                        compareBooths(
                            a.booth_number,
                            b.booth_number
                        )
                    );


                case "booth-desc":

                    return (
                        compareBooths(
                            b.booth_number,
                            a.booth_number
                        )
                    );


                case "targets-first":

                    return (
                        Number(
                            isTargeted(
                                b.id
                            )
                        )
                        -
                        Number(
                            isTargeted(
                                a.id
                            )
                        )
                    );


                case "company-asc":
                default:

                    return (
                        a.company_name
                            .localeCompare(
                                b.company_name
                            )
                    );

            }

        }
    );

}


/* =========================================================
   BOOTH SORT HELPER
   ========================================================= */

function compareBooths(
    a,
    b
) {

    const aNumber =
        parseInt(
            String(a)
                .replace(
                    /\D/g,
                    ""
                ),
            10
        );


    const bNumber =
        parseInt(
            String(b)
                .replace(
                    /\D/g,
                    ""
                ),
            10
        );


    if (
        Number.isNaN(aNumber) &&
        Number.isNaN(bNumber)
    ) {

        return (
            String(a)
                .localeCompare(
                    String(b)
                )
        );

    }


    if (
        Number.isNaN(aNumber)
    ) {

        return 1;

    }


    if (
        Number.isNaN(bNumber)
    ) {

        return -1;

    }


    return (
        aNumber -
        bNumber
    );

}


/* =========================================================
   RENDER EXHIBITORS
   ========================================================= */

function renderExhibitors() {

    const container =
        document.getElementById(
            "exhibitorGrid"
        );


    if (!container) {

        console.error(
            'Missing element with id="exhibitorGrid".'
        );

        return;

    }


    container.innerHTML =
        "";


    container.classList.toggle(
        "list-view",
        currentView === "list"
    );


    if (
        !filteredExhibitors.length
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <span>NO MATCHES</span>

                <h3>
                    No exhibitors found.
                </h3>

                <p>
                    Try changing your search or filters.
                </p>

            </div>

        `;


        return;

    }


    const fragment =
        document.createDocumentFragment();


    filteredExhibitors.forEach(
        exhibitor => {

            fragment.appendChild(
                createExhibitorCard(
                    exhibitor
                )
            );

        }
    );


    container.appendChild(
        fragment
    );

}


/* =========================================================
   CREATE EXHIBITOR CARD
   ========================================================= */

function createExhibitorCard(
    exhibitor
) {

    const article =
        document.createElement(
            "article"
        );


    article.className =
        "exhibitor-card";


    article.dataset.id =
        exhibitor.id;


    const targeted =
        isTargeted(
            exhibitor.id
        );


    if (targeted) {

        article.classList.add(
            "is-target"
        );

    }


    const category =
        exhibitor.category ||
        "APTA Exhibitor";


    const description =
        exhibitor.description ||
        "Public exhibitor profile information is being added.";


    article.innerHTML = `

        <div class="card-top">

            <div class="company-mark">

                ${
                    escapeHTML(
                        getInitials(
                            exhibitor.company_name
                        )
                    )
                }

            </div>


            ${
                targeted
                ?
                `

                    <span class="target-badge">

                        NORTHSTAR TARGET

                    </span>

                `
                :
                ""
            }

        </div>


        <div class="card-body">

            <span class="card-category">

                ${
                    escapeHTML(
                        category
                    )
                }

            </span>


            <h3>

                ${
                    escapeHTML(
                        exhibitor.company_name
                    )
                }

            </h3>


            <div class="booth-line">

                Booth

                <strong>

                    ${
                        escapeHTML(
                            exhibitor.booth_number ||
                            "—"
                        )
                    }

                </strong>

            </div>


            <p>

                ${
                    escapeHTML(
                        description
                    )
                }

            </p>

        </div>


        <div class="card-footer">

            <span>
                View profile
            </span>

            <strong>
                →
            </strong>

        </div>

    `;


    article.addEventListener(
        "click",
        () => {

            openExhibitorDrawer(
                exhibitor.id
            );

        }
    );


    return article;

}


/* =========================================================
   GRID / LIST VIEW
   ========================================================= */

function setView(
    view
) {

    currentView =
        view;


    document
        .getElementById(
            "gridViewButton"
        )
        ?.classList.toggle(
            "active",
            view === "grid"
        );


    document
        .getElementById(
            "listViewButton"
        )
        ?.classList.toggle(
            "active",
            view === "list"
        );


    renderExhibitors();

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
   OPEN DRAWER
   ========================================================= */

function openExhibitorDrawer(
    exhibitorId
) {

    const exhibitor =
        exhibitors.find(
            item =>
                String(
                    item.id
                ) ===
                String(
                    exhibitorId
                )
        );


    if (!exhibitor) {
        return;
    }


    selectedExhibitor =
        exhibitor;


    updateDrawer();


    const overlay =
        document.getElementById(
            "drawerOverlay"
        );


    const drawer =
        document.getElementById(
            "exhibitorDrawer"
        );


    if (overlay) {

        overlay.hidden =
            false;

    }


    if (drawer) {

        drawer.hidden =
            false;


        requestAnimationFrame(
            () => {

                drawer.classList.add(
                    "open"
                );

                overlay?.classList.add(
                    "open"
                );

            }
        );

    }


    document.body.classList.add(
        "drawer-open"
    );


    const url =
        new URL(
            window.location.href
        );


    url.searchParams.set(
        "id",
        exhibitor.id
    );


    window.history.replaceState(
        {},
        "",
        url
    );

}


/* =========================================================
   CLOSE DRAWER
   ========================================================= */

function closeDrawer() {

    const overlay =
        document.getElementById(
            "drawerOverlay"
        );


    const drawer =
        document.getElementById(
            "exhibitorDrawer"
        );


    drawer?.classList.remove(
        "open"
    );


    overlay?.classList.remove(
        "open"
    );


    document.body.classList.remove(
        "drawer-open"
    );


    setTimeout(
        () => {

            if (drawer) {

                drawer.hidden =
                    true;

            }


            if (overlay) {

                overlay.hidden =
                    true;

            }

        },
        180
    );


    selectedExhibitor =
        null;


    const url =
        new URL(
            window.location.href
        );


    url.searchParams.delete(
        "id"
    );


    window.history.replaceState(
        {},
        "",
        url
    );

}


/* =========================================================
   UPDATE DRAWER
   ========================================================= */

function updateDrawer() {

    if (!selectedExhibitor) {
        return;
    }


    const exhibitor =
        selectedExhibitor;


    setText(
        "drawerCompanyMark",
        getInitials(
            exhibitor.company_name
        )
    );


    setText(
        "drawerCategory",
        exhibitor.category ||
        "APTA Exhibitor"
    );


    setText(
        "drawerCompanyName",
        exhibitor.company_name
    );


    setText(
        "drawerBoothNumber",
        exhibitor.booth_number ||
        "—"
    );


    setText(
        "drawerDescription",
        exhibitor.description ||
        "Public exhibitor profile information is being added."
    );


    const website =
        document.getElementById(
            "drawerWebsite"
        );


    if (website) {

        if (
            exhibitor.website
        ) {

            website.href =
                normalizeWebsite(
                    exhibitor.website
                );


            website.textContent =
                cleanWebsiteLabel(
                    exhibitor.website
                );


            website.hidden =
                false;

        }

        else {

            website.hidden =
                true;

        }

    }


    updateDrawerTargetState();


    loadResearchIntoDrawer();


    updateDrawerLinks();

}


/* =========================================================
   DRAWER TARGET STATE
   ========================================================= */

function updateDrawerTargetState() {

    if (!selectedExhibitor) {
        return;
    }


    const targeted =
        isTargeted(
            selectedExhibitor.id
        );


    const badge =
        document.getElementById(
            "drawerTargetBadge"
        );


    if (badge) {

        badge.hidden =
            !targeted;

    }


    const button =
        document.getElementById(
            "drawerTargetButton"
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

                <span>
                    Remove from Northstar Targets
                </span>

                <strong>
                    ×
                </strong>

            `
            :
            `

                <span>
                    Add to Northstar Targets
                </span>

                <strong>
                    +
                </strong>

            `;

    }

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


/* =========================================================
   SAVE TARGETS
   ========================================================= */

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
   IS TARGETED
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
                ) ===
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
            `${selectedExhibitor.company_name} removed from targets`
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
            `${selectedExhibitor.company_name} added to targets`
        );

    }


    saveTargets(
        targets
    );


    updateDrawerTargetState();

    applyFilters();

}


/* =========================================================
   RESEARCH STORAGE
   ========================================================= */

function getResearch() {

    try {

        const stored =
            localStorage.getItem(
                RESEARCH_STORAGE_KEY
            );


        return stored
            ?
            JSON.parse(
                stored
            )
            :
            {};

    }

    catch (error) {

        console.error(
            "Unable to read research storage:",
            error
        );


        return {};

    }

}


/* =========================================================
   LOAD RESEARCH INTO DRAWER
   ========================================================= */

function loadResearchIntoDrawer() {

    if (!selectedExhibitor) {
        return;
    }


    const research =
        getResearch();


    const saved =
        research[
            selectedExhibitor.id
        ]
        ||
        {};


    const notes =
        document.getElementById(
            "researchNotes"
        );


    if (notes) {

        notes.value =
            saved.notes ||
            "";

    }


    const fit =
        document.getElementById(
            "potentialFit"
        );


    if (fit) {

        fit.value =
            saved.potential_fit ||
            "";

    }

}


/* =========================================================
   SAVE RESEARCH
   ========================================================= */

function saveSelectedResearch() {

    if (!selectedExhibitor) {
        return;
    }


    const notes =
        document.getElementById(
            "researchNotes"
        )
        ?.value
        ?.trim()
        ||
        "";


    const fit =
        document.getElementById(
            "potentialFit"
        )
        ?.value
        ?.trim()
        ||
        "";


    const research =
        getResearch();


    research[
        selectedExhibitor.id
    ] = {

        exhibitor_id:
            selectedExhibitor.id,

        booth_number:
            selectedExhibitor.booth_number,

        notes:

            notes,

        potential_fit:
            fit,

        updated_at:
            new Date()
                .toISOString()

    };


    localStorage.setItem(
        RESEARCH_STORAGE_KEY,
        JSON.stringify(
            research
        )
    );


    /*
       Researching an exhibitor usually means
       Northstar wants to keep track of them.

       If they are not already a target,
       automatically add them.
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

            booth_number:
                selectedExhibitor.booth_number,

            priority:
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

    applyFilters();


    setStatus(
        `Research saved for ${selectedExhibitor.company_name}`
    );

}


/* =========================================================
   DRAWER LINKS
   ========================================================= */

function updateDrawerLinks() {

    if (!selectedExhibitor) {
        return;
    }


    const mapLink =
        document.getElementById(
            "drawerMapLink"
        );


    if (mapLink) {

        mapLink.href =
            `map.html?id=${
                encodeURIComponent(
                    selectedExhibitor.id
                )
            }`;

    }


    const interactionLink =
        document.getElementById(
            "drawerInteractionLink"
        );


    if (interactionLink) {

        interactionLink.href =
            `interactions.html?exhibitor=${
                encodeURIComponent(
                    selectedExhibitor.id
                )
            }`;

    }

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
                ) ===
                String(
                    id
                )
        );


    if (!exhibitor) {
        return;
    }


    openExhibitorDrawer(
        exhibitor.id
    );

}


/* =========================================================
   PAGE METRICS
   ========================================================= */

function updatePageMetrics() {

    setText(
        "exhibitorCount",
        exhibitors.length
    );


    setText(
        "targetCount",
        getTargets().length
    );


    setText(
        "visibleCount",
        filteredExhibitors.length
    );

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
                    `${exhibitors.length} APTA exhibitor records loaded`;

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
   WEBSITE HELPERS
   ========================================================= */

function normalizeWebsite(
    website
) {

    if (
        /^https?:\/\//i
            .test(
                website
            )
    ) {

        return website;

    }


    return (
        "https://" +
        website
    );

}


function cleanWebsiteLabel(
    website
) {

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
