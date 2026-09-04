/* =========================================================
   APTA 2026 TEAM HUB
   NORTHSTAR TRANSIT SOLUTIONS

   TARGET MANAGEMENT
   ========================================================= */


/* =========================================================
   STATE
   ========================================================= */

let exhibitors = [];

let targets = [];

let targetRecords = [];

let filteredTargets = [];


/* =========================================================
   STORAGE
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
    initializeTargets
);


function initializeTargets() {

    loadExhibitors();

    loadTargets();

    normalizeTargets();

    buildTargetRecords();

    bindControls();

    applyFilters();

    updateMetrics();

    setStatus(
        `${targetRecords.length} Northstar targets loaded`
    );

}


/* =========================================================
   LOAD EXHIBITORS
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

        exhibitors =
            [];

        return;

    }


    exhibitors =
        [...window.APTA_EXHIBITORS];

}


/* =========================================================
   LOAD TARGETS
   ========================================================= */

function loadTargets() {

    try {

        targets =
            JSON.parse(
                localStorage.getItem(
                    TARGET_STORAGE_KEY
                )
                ||
                "[]"
            );

    }

    catch (error) {

        console.error(
            "Unable to load targets:",
            error
        );


        targets =
            [];

    }

}


/* =========================================================
   NORMALIZE OLD + NEW TARGET DATA

   This lets targets created during previous versions of
   the app continue working where possible.
   ========================================================= */

function normalizeTargets() {

    let changed =
        false;


    targets =
        targets.map(
            target => {

                const normalized = {

                    id:
                        target.id ||
                        generateId(),

                    exhibitor_id:
                        target.exhibitor_id ??
                        "",

                    booth_number:
                        target.booth_number ??
                        "",

                    priority:
                        normalizePriority(
                            target.priority
                        ),

                    visited:
                        Boolean(
                            target.visited
                        ),

                    assigned_to:
                        target.assigned_to ||
                        "",

                    notes:
                        target.notes ||
                        "",

                    status:
                        normalizeStatus(
                            target.status
                        ),

                    created_at:
                        target.created_at ||
                        new Date()
                            .toISOString()

                };


                if (
                    JSON.stringify(
                        normalized
                    )
                    !==
                    JSON.stringify(
                        target
                    )
                ) {

                    changed =
                        true;

                }


                return normalized;

            }
        );


    if (changed) {

        saveTargets();

    }

}


/* =========================================================
   BUILD JOINED TARGET RECORDS
   ========================================================= */

function buildTargetRecords() {

    const research =
        getResearch();


    targetRecords =
        targets
            .map(
                target => {

                    const exhibitor =
                        resolveTargetExhibitor(
                            target
                        );


                    if (!exhibitor) {

                        return {

                            target,

                            exhibitor: {

                                id:
                                    target.exhibitor_id,

                                company_name:
                                    "Unknown Exhibitor",

                                booth_number:
                                    target.booth_number ||
                                    "",

                                category:
                                    "",

                                description:
                                    "",

                                website:
                                    ""

                            },

                            research:
                                {}

                        };

                    }


                    return {

                        target,

                        exhibitor,

                        research:
                            research[
                                exhibitor.id
                            ]
                            ||
                            {}

                    };

                }
            );

}


/* =========================================================
   RESOLVE EXHIBITOR

   First match by the current shared exhibitor ID.

   If an older target used a different ID system, fall back
   to booth number.
   ========================================================= */

function resolveTargetExhibitor(
    target
) {

    let exhibitor =
        exhibitors.find(
            item =>
                String(
                    item.id
                ) ===
                String(
                    target.exhibitor_id
                )
        );


    if (exhibitor) {

        return exhibitor;

    }


    if (
        target.booth_number
    ) {

        exhibitor =
            exhibitors.find(
                item =>
                    String(
                        item.booth_number
                    ) ===
                    String(
                        target.booth_number
                    )
            );


        if (exhibitor) {

            /*
               Upgrade the old target ID automatically.
            */

            target.exhibitor_id =
                exhibitor.id;


            return exhibitor;

        }

    }


    return null;

}


/* =========================================================
   CONTROLS
   ========================================================= */

function bindControls() {

    document
        .getElementById(
            "targetSearch"
        )
        ?.addEventListener(
            "input",
            applyFilters
        );


    document
        .getElementById(
            "priorityFilter"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document
        .getElementById(
            "statusFilter"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document
        .getElementById(
            "visitFilter"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document
        .getElementById(
            "targetSort"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );

}


/* =========================================================
   FILTER
   ========================================================= */

function applyFilters() {

    buildTargetRecords();


    const search =
        (
            document
                .getElementById(
                    "targetSearch"
                )
                ?.value
            ||
            ""
        )
            .trim()
            .toLowerCase();


    const priority =
        document
            .getElementById(
                "priorityFilter"
            )
            ?.value
        ||
        "";


    const status =
        document
            .getElementById(
                "statusFilter"
            )
            ?.value
        ||
        "";


    const visit =
        document
            .getElementById(
                "visitFilter"
            )
            ?.value
        ||
        "";


    const sort =
        document
            .getElementById(
                "targetSort"
            )
            ?.value
        ||
        "priority";


    filteredTargets =
        targetRecords.filter(
            record => {

                const target =
                    record.target;


                const exhibitor =
                    record.exhibitor;


                const searchable =
                    [
                        exhibitor.company_name,
                        exhibitor.booth_number,
                        exhibitor.category,
                        target.assigned_to,
                        target.notes,
                        record.research.notes,
                        record.research.potential_fit,
                        target.priority,
                        target.status
                    ]
                        .join(" ")
                        .toLowerCase();


                const matchesSearch =
                    !search ||
                    searchable.includes(
                        search
                    );


                const matchesPriority =
                    !priority ||
                    target.priority ===
                    priority;


                const matchesStatus =
                    !status ||
                    target.status ===
                    status;


                let matchesVisit =
                    true;


                if (
                    visit ===
                    "visited"
                ) {

                    matchesVisit =
                        target.visited;

                }


                if (
                    visit ===
                    "not-visited"
                ) {

                    matchesVisit =
                        !target.visited;

                }


                return (
                    matchesSearch &&
                    matchesPriority &&
                    matchesStatus &&
                    matchesVisit
                );

            }
        );


    sortTargetRecords(
        filteredTargets,
        sort
    );


    renderTargets();

    updateMetrics();

}


/* =========================================================
   SORT
   ========================================================= */

function sortTargetRecords(
    records,
    sort
) {

    records.sort(
        (a, b) => {

            if (
                sort ===
                "company"
            ) {

                return (
                    a.exhibitor.company_name
                        .localeCompare(
                            b.exhibitor.company_name
                        )
                );

            }


            if (
                sort ===
                "booth"
            ) {

                return (
                    compareBoothNumbers(
                        a.exhibitor.booth_number,
                        b.exhibitor.booth_number
                    )
                );

            }


            if (
                sort ===
                "status"
            ) {

                return (
                    getStatusOrder(
                        a.target.status
                    )
                    -
                    getStatusOrder(
                        b.target.status
                    )
                );

            }


            /*
               Default:
               Priority first.

               High
               Medium
               Low
            */

            const priorityDifference =

                getPriorityOrder(
                    a.target.priority
                )
                -
                getPriorityOrder(
                    b.target.priority
                );


            if (
                priorityDifference !==
                0
            ) {

                return priorityDifference;

            }


            return (
                a.exhibitor.company_name
                    .localeCompare(
                        b.exhibitor.company_name
                    )
            );

        }
    );

}


/* =========================================================
   RENDER
   ========================================================= */

function renderTargets() {

    const container =
        document.getElementById(
            "targetsList"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    setText(
        "visibleTargetCount",
        filteredTargets.length
    );


    if (
        !filteredTargets.length
    ) {

        renderEmptyState(
            container
        );

        return;

    }


    const fragment =
        document.createDocumentFragment();


    filteredTargets.forEach(
        (
            record,
            index
        ) => {

            fragment.appendChild(
                createTargetCard(
                    record,
                    index
                )
            );

        }
    );


    container.appendChild(
        fragment
    );

}


/* =========================================================
   CREATE TARGET CARD
   ========================================================= */

function createTargetCard(
    record,
    index
) {

    const target =
        record.target;


    const exhibitor =
        record.exhibitor;


    const card =
        document.createElement(
            "article"
        );


    card.className =
        `target-card priority-${target.priority}`;


    card.dataset.targetId =
        target.id;


    if (
        target.visited
    ) {

        card.classList.add(
            "is-visited"
        );

    }


    const researchNotes =

        target.notes ||

        record.research.notes ||

        "";


    card.innerHTML = `

        <div class="target-index">

            ${
                String(
                    index + 1
                )
                    .padStart(
                        2,
                        "0"
                    )
            }

        </div>



        <div class="target-company">


            <div class="target-company-top">

                <span
                    class="priority-pill ${escapeHTML(target.priority)}"
                >

                    ${
                        escapeHTML(
                            capitalize(
                                target.priority
                            )
                        )
                    }

                </span>


                ${
                    target.visited

                    ?

                    `
                        <span class="visit-pill">
                            Visited
                        </span>
                    `

                    :

                    ""
                }

            </div>


            <h3>

                ${
                    escapeHTML(
                        exhibitor.company_name
                    )
                }

            </h3>


            <span class="booth-number">

                Booth

                <strong>

                    ${
                        escapeHTML(
                            exhibitor.booth_number ||
                            "—"
                        )
                    }

                </strong>

            </span>


        </div>



        <div class="target-field">

            <label>
                Priority
            </label>

            <select
                class="card-priority"
                aria-label="Target priority"
            >

                ${buildPriorityOptions(
                    target.priority
                )}

            </select>

        </div>



        <div class="target-field">

            <label>
                Status
            </label>

            <select
                class="card-status"
                aria-label="Target status"
            >

                ${buildStatusOptions(
                    target.status
                )}

            </select>

        </div>



        <div class="target-field">

            <label>
                Assigned To
            </label>

            <input
                class="card-assigned"
                type="text"
                value="${
                    escapeAttribute(
                        target.assigned_to
                    )
                }"
                placeholder="Team member"
            >

        </div>



        <div class="target-actions">

            <button
                type="button"
                class="target-action save"
                data-action="save"
            >

                <span>
                    Save Changes
                </span>

                <span>
                    ✓
                </span>

            </button>


            <a
                class="target-action"
                href="exhibitors.html?id=${
                    encodeURIComponent(
                        exhibitor.id
                    )
                }"
            >

                <span>
                    View Profile
                </span>

                <span>
                    →
                </span>

            </a>


            <a
                class="target-action"
                href="map.html?id=${
                    encodeURIComponent(
                        exhibitor.id
                    )
                }"
            >

                <span>
                    Find on Map
                </span>

                <span>
                    ⌖
                </span>

            </a>


            <a
                class="target-action"
                href="interactions.html?exhibitor=${
                    encodeURIComponent(
                        exhibitor.id
                    )
                }"
            >

                <span>
                    Log Interaction
                </span>

                <span>
                    ↗
                </span>

            </a>


            <button
                type="button"
                class="target-action visit"
                data-action="visit"
            >

                <span>

                    ${
                        target.visited
                        ?
                        "Mark Not Visited"
                        :
                        "Mark Visited"
                    }

                </span>

                <span>
                    ${
                        target.visited
                        ?
                        "↶"
                        :
                        "✓"
                    }
                </span>

            </button>


            <button
                type="button"
                class="target-action remove"
                data-action="remove"
            >

                <span>
                    Remove Target
                </span>

                <span>
                    ×
                </span>

            </button>

        </div>



        <div class="target-notes">

            <label>
                Research / Meeting Notes
            </label>

            <textarea
                class="card-notes"
                placeholder="What should the team know before visiting this booth?"
            >${escapeHTML(researchNotes)}</textarea>

        </div>

    `;


    bindTargetCard(
        card,
        target.id
    );


    return card;

}


/* =========================================================
   CARD EVENTS
   ========================================================= */

function bindTargetCard(
    card,
    targetId
) {

    card
        .querySelector(
            '[data-action="save"]'
        )
        ?.addEventListener(
            "click",
            () => {

                saveCardChanges(
                    card,
                    targetId
                );

            }
        );


    card
        .querySelector(
            '[data-action="visit"]'
        )
        ?.addEventListener(
            "click",
            () => {

                toggleVisited(
                    targetId
                );

            }
        );


    card
        .querySelector(
            '[data-action="remove"]'
        )
        ?.addEventListener(
            "click",
            () => {

                removeTarget(
                    targetId
                );

            }
        );

}


/* =========================================================
   SAVE CARD CHANGES
   ========================================================= */

function saveCardChanges(
    card,
    targetId
) {

    const target =
        getTargetById(
            targetId
        );


    if (!target) {

        return;

    }


    target.priority =
        normalizePriority(
            card
                .querySelector(
                    ".card-priority"
                )
                ?.value
        );


    target.status =
        normalizeStatus(
            card
                .querySelector(
                    ".card-status"
                )
                ?.value
        );


    target.assigned_to =
        card
            .querySelector(
                ".card-assigned"
            )
            ?.value
            ?.trim()
        ||
        "";


    target.notes =
        card
            .querySelector(
                ".card-notes"
            )
            ?.value
            ?.trim()
        ||
        "";


    saveTargets();


    setStatus(
        "Target changes saved"
    );


    applyFilters();

}


/* =========================================================
   VISITED TOGGLE
   ========================================================= */

function toggleVisited(
    targetId
) {

    const target =
        getTargetById(
            targetId
        );


    if (!target) {
        return;
    }


    target.visited =
        !target.visited;


    /*
       If somebody marks the booth visited while status is
       still "research", move it to "met".

       They can always change it afterward.
    */

    if (
        target.visited &&
        (
            target.status ===
            "research"
            ||
            target.status ===
            "planned"
        )
    ) {

        target.status =
            "met";

    }


    saveTargets();


    setStatus(
        target.visited
        ?
        "Target marked visited"
        :
        "Target marked not visited"
    );


    applyFilters();

}


/* =========================================================
   REMOVE TARGET
   ========================================================= */

function removeTarget(
    targetId
) {

    const record =
        targetRecords.find(
            item =>
                String(
                    item.target.id
                )
                ===
                String(
                    targetId
                )
        );


    const companyName =
        record?.exhibitor
            ?.company_name
        ||
        "Target";


    targets =
        targets.filter(
            target =>
                String(
                    target.id
                )
                !==
                String(
                    targetId
                )
        );


    saveTargets();


    setStatus(
        `${companyName} removed from Northstar targets`
    );


    applyFilters();

}


/* =========================================================
   SAVE TARGET STORAGE
   ========================================================= */

function saveTargets() {

    localStorage.setItem(
        TARGET_STORAGE_KEY,
        JSON.stringify(
            targets
        )
    );

}


/* =========================================================
   TARGET LOOKUP
   ========================================================= */

function getTargetById(
    targetId
) {

    return targets.find(
        target =>
            String(
                target.id
            )
            ===
            String(
                targetId
            )
    )
    ||
    null;

}


/* =========================================================
   RESEARCH STORAGE
   ========================================================= */

function getResearch() {

    try {

        return JSON.parse(
            localStorage.getItem(
                RESEARCH_STORAGE_KEY
            )
            ||
            "{}"
        );

    }

    catch {

        return {};

    }

}


/* =========================================================
   METRICS
   ========================================================= */

function updateMetrics() {

    setText(
        "metricTotal",
        targetRecords.length
    );


    setText(
        "metricHigh",

        targetRecords.filter(
            record =>
                record.target.priority ===
                "high"
        ).length

    );


    setText(
        "metricUnvisited",

        targetRecords.filter(
            record =>
                !record.target.visited
        ).length

    );


    setText(
        "metricFollowUp",

        targetRecords.filter(
            record =>
                record.target.status ===
                "follow-up"
        ).length

    );


    setText(
        "visibleTargetCount",
        filteredTargets.length
    );

}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function renderEmptyState(
    container
) {

    const hasTargets =
        targetRecords.length >
        0;


    container.innerHTML = `

        <div class="targets-empty">

            <span>

                ${
                    hasTargets
                    ?
                    "NO MATCHES"
                    :
                    "NO TARGETS YET"
                }

            </span>


            <h3>

                ${
                    hasTargets
                    ?
                    "Nothing matches these filters."
                    :
                    "Build your conference target list."
                }

            </h3>


            <p>

                ${
                    hasTargets

                    ?

                    "Try changing the search, priority, status, or visit filters."

                    :

                    "Browse the APTA exhibitor directory and add the companies Northstar should prioritize at the expo."

                }

            </p>


            ${
                !hasTargets

                ?

                `
                    <a href="exhibitors.html">
                        Browse Exhibitors
                    </a>
                `

                :

                ""
            }

        </div>

    `;

}


/* =========================================================
   PRIORITY OPTIONS
   ========================================================= */

function buildPriorityOptions(
    current
) {

    const options = [

        ["high", "High"],

        ["medium", "Medium"],

        ["low", "Low"]

    ];


    return options
        .map(
            ([value,label]) => `

                <option
                    value="${value}"
                    ${
                        current === value
                        ?
                        "selected"
                        :
                        ""
                    }
                >

                    ${label}

                </option>

            `
        )
        .join("");

}


/* =========================================================
   STATUS OPTIONS
   ========================================================= */

function buildStatusOptions(
    current
) {

    const options = [

        [
            "research",
            "Research"
        ],

        [
            "planned",
            "Planned"
        ],

        [
            "contacted",
            "Contacted"
        ],

        [
            "met",
            "Met"
        ],

        [
            "follow-up",
            "Follow-Up"
        ]

    ];


    return options
        .map(
            ([value,label]) => `

                <option
                    value="${value}"
                    ${
                        current === value
                        ?
                        "selected"
                        :
                        ""
                    }
                >

                    ${label}

                </option>

            `
        )
        .join("");

}


/* =========================================================
   NORMALIZATION
   ========================================================= */

function normalizePriority(
    priority
) {

    const value =
        String(
            priority ||
            ""
        )
            .trim()
            .toLowerCase();


    if (
        value === "high" ||
        value === "medium" ||
        value === "low"
    ) {

        return value;

    }


    return "medium";

}


function normalizeStatus(
    status
) {

    const value =
        String(
            status ||
            ""
        )
            .trim()
            .toLowerCase();


    const valid = [

        "research",

        "planned",

        "contacted",

        "met",

        "follow-up"

    ];


    return valid.includes(
        value
    )
        ?
        value
        :
        "research";

}


/* =========================================================
   SORT VALUES
   ========================================================= */

function getPriorityOrder(
    priority
) {

    const order = {

        high: 0,

        medium: 1,

        low: 2

    };


    return (
        order[
            priority
        ]
        ??
        99
    );

}


function getStatusOrder(
    status
) {

    const order = {

        research: 0,

        planned: 1,

        contacted: 2,

        met: 3,

        "follow-up": 4

    };


    return (
        order[
            status
        ]
        ??
        99
    );

}


/* =========================================================
   BOOTH SORT
   ========================================================= */

function compareBoothNumbers(
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
   STATUS MESSAGE
   ========================================================= */

let statusTimer =
    null;


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
                    `${targetRecords.length} Northstar targets · conference planning ready`;

            },
            3500
        );

}


/* =========================================================
   TEXT
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
   CAPITALIZE
   ========================================================= */

function capitalize(
    value
) {

    const text =
        String(
            value || ""
        );


    return (
        text.charAt(0)
            .toUpperCase()
        +
        text.slice(1)
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
        value ??
        ""
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


/* =========================================================
   ESCAPE ATTRIBUTE
   ========================================================= */

function escapeAttribute(
    value
) {

    return escapeHTML(
        value
    );

}
