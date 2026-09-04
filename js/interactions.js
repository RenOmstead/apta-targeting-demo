/* =========================================================
   APTA 2026 TEAM HUB
   NORTHSTAR TRANSIT SOLUTIONS

   INTERACTION MANAGEMENT
   ========================================================= */


/* =========================================================
   STATE
   ========================================================= */

let exhibitors = [];

let interactions = [];

let filteredInteractions = [];


/* =========================================================
   STORAGE
   ========================================================= */

const INTERACTION_STORAGE_KEY =
    "northstar_apta_interactions";


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeInteractions
);


function initializeInteractions() {

    loadExhibitors();

    loadInteractions();

    bindControls();

    populateExhibitorSelect();

    applyFilters();

    updateMetrics();

    prepareDefaultDate();

    openFromURL();

    setStatus(
        `${interactions.length} interaction records loaded`
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
        [...window.APTA_EXHIBITORS]
            .sort(
                (a, b) =>
                    a.company_name
                        .localeCompare(
                            b.company_name
                        )
            );

}


/* =========================================================
   LOAD INTERACTIONS
   ========================================================= */

function loadInteractions() {

    try {

        interactions =
            JSON.parse(
                localStorage.getItem(
                    INTERACTION_STORAGE_KEY
                )
                ||
                "[]"
            );

    }

    catch (error) {

        console.error(
            "Unable to load interactions:",
            error
        );


        interactions =
            [];

    }


    interactions =
        interactions.map(
            normalizeInteraction
        );

}


/* =========================================================
   NORMALIZE
   ========================================================= */

function normalizeInteraction(
    interaction
) {

    return {

        id:
            interaction.id ||
            generateId(),

        exhibitor_id:
            interaction.exhibitor_id ||
            "",

        booth_number:
            interaction.booth_number ||
            "",

        interaction_type:
            interaction.interaction_type ||
            "booth-conversation",

        contact_name:
            interaction.contact_name ||
            "",

        contact_title:
            interaction.contact_title ||
            "",

        interaction_date:
            interaction.interaction_date ||
            todayISO(),

        interaction_time:
            interaction.interaction_time ||
            "",

        outcome:
            interaction.outcome ||
            "informational",

        notes:
            interaction.notes ||
            "",

        follow_up_required:
            Boolean(
                interaction.follow_up_required
            ),

        follow_up_date:
            interaction.follow_up_date ||
            "",

        created_at:
            interaction.created_at ||
            new Date()
                .toISOString(),

        updated_at:
            interaction.updated_at ||
            ""

    };

}


/* =========================================================
   CONTROLS
   ========================================================= */

function bindControls() {

    document
        .getElementById(
            "headerLogInteractionButton"
        )
        ?.addEventListener(
            "click",
            () => openComposer()
        );


    document
        .getElementById(
            "heroLogInteractionButton"
        )
        ?.addEventListener(
            "click",
            () => openComposer()
        );


    document
        .getElementById(
            "composerCloseButton"
        )
        ?.addEventListener(
            "click",
            closeComposer
        );


    document
        .getElementById(
            "cancelInteractionButton"
        )
        ?.addEventListener(
            "click",
            closeComposer
        );


    document
        .getElementById(
            "interactionOverlay"
        )
        ?.addEventListener(
            "click",
            closeComposer
        );


    document
        .getElementById(
            "interactionForm"
        )
        ?.addEventListener(
            "submit",
            saveInteractionFromForm
        );


    document
        .getElementById(
            "interactionExhibitor"
        )
        ?.addEventListener(
            "change",
            updateBoothDisplay
        );


    document
        .getElementById(
            "followUpRequired"
        )
        ?.addEventListener(
            "change",
            updateFollowUpVisibility
        );


    document
        .getElementById(
            "interactionSearch"
        )
        ?.addEventListener(
            "input",
            applyFilters
        );


    document
        .getElementById(
            "typeFilter"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document
        .getElementById(
            "outcomeFilter"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document
        .getElementById(
            "followUpFilter"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document
        .getElementById(
            "interactionSort"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeComposer();

            }

        }
    );

}


/* =========================================================
   EXHIBITOR SELECT
   ========================================================= */

function populateExhibitorSelect() {

    const select =
        document.getElementById(
            "interactionExhibitor"
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


    exhibitors.forEach(
        exhibitor => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                exhibitor.id;


            option.textContent =
                exhibitor.booth_number

                ?

                `${exhibitor.company_name} · Booth ${exhibitor.booth_number}`

                :

                exhibitor.company_name;


            select.appendChild(
                option
            );

        }
    );

}


/* =========================================================
   FILTERING
   ========================================================= */

function applyFilters() {

    const search =
        (
            document
                .getElementById(
                    "interactionSearch"
                )
                ?.value
            ||
            ""
        )
            .trim()
            .toLowerCase();


    const type =
        document
            .getElementById(
                "typeFilter"
            )
            ?.value
        ||
        "";


    const outcome =
        document
            .getElementById(
                "outcomeFilter"
            )
            ?.value
        ||
        "";


    const followUp =
        document
            .getElementById(
                "followUpFilter"
            )
            ?.value
        ||
        "";


    const sort =
        document
            .getElementById(
                "interactionSort"
            )
            ?.value
        ||
        "newest";


    filteredInteractions =
        interactions.filter(
            interaction => {

                const exhibitor =
                    getExhibitorById(
                        interaction.exhibitor_id
                    );


                const searchable =
                    [
                        exhibitor?.company_name,
                        interaction.booth_number,
                        interaction.contact_name,
                        interaction.contact_title,
                        interaction.notes,
                        interaction.interaction_type,
                        interaction.outcome
                    ]
                        .join(" ")
                        .toLowerCase();


                const matchesSearch =
                    !search ||
                    searchable.includes(
                        search
                    );


                const matchesType =
                    !type ||
                    interaction.interaction_type ===
                    type;


                const matchesOutcome =
                    !outcome ||
                    interaction.outcome ===
                    outcome;


                let matchesFollowUp =
                    true;


                if (
                    followUp ===
                    "required"
                ) {

                    matchesFollowUp =
                        interaction.follow_up_required;

                }


                if (
                    followUp ===
                    "not-required"
                ) {

                    matchesFollowUp =
                        !interaction.follow_up_required;

                }


                return (
                    matchesSearch &&
                    matchesType &&
                    matchesOutcome &&
                    matchesFollowUp
                );

            }
        );


    sortInteractions(
        filteredInteractions,
        sort
    );


    renderInteractions();

    updateMetrics();

}


/* =========================================================
   SORT
   ========================================================= */

function sortInteractions(
    records,
    sort
) {

    records.sort(
        (a, b) => {

            if (
                sort ===
                "oldest"
            ) {

                return (
                    getInteractionTimestamp(a)
                    -
                    getInteractionTimestamp(b)
                );

            }


            if (
                sort ===
                "company"
            ) {

                return (
                    getCompanyName(a)
                        .localeCompare(
                            getCompanyName(b)
                        )
                );

            }


            if (
                sort ===
                "follow-up"
            ) {

                const aFollow =
                    Number(
                        a.follow_up_required
                    );


                const bFollow =
                    Number(
                        b.follow_up_required
                    );


                if (
                    aFollow !==
                    bFollow
                ) {

                    return (
                        bFollow -
                        aFollow
                    );

                }

            }


            return (
                getInteractionTimestamp(b)
                -
                getInteractionTimestamp(a)
            );

        }
    );

}


/* =========================================================
   RENDER
   ========================================================= */

function renderInteractions() {

    const container =
        document.getElementById(
            "interactionList"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    setText(
        "visibleInteractionCount",
        filteredInteractions.length
    );


    if (
        !filteredInteractions.length
    ) {

        renderEmptyState(
            container
        );


        return;

    }


    const fragment =
        document.createDocumentFragment();


    filteredInteractions.forEach(
        (
            interaction,
            index
        ) => {

            fragment.appendChild(
                createInteractionCard(
                    interaction,
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
   CARD
   ========================================================= */

function createInteractionCard(
    interaction,
    index
) {

    const exhibitor =
        getExhibitorById(
            interaction.exhibitor_id
        );


    const companyName =
        exhibitor?.company_name ||
        "Unknown Exhibitor";


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "interaction-card";


    if (
        interaction.follow_up_required
    ) {

        card.classList.add(
            "needs-followup"
        );

    }


    card.innerHTML = `

        <div class="interaction-index">

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



        <div class="interaction-company">


            <div class="interaction-badges">

                <span class="interaction-pill">

                    ${
                        escapeHTML(
                            formatType(
                                interaction.interaction_type
                            )
                        )
                    }

                </span>


                <span
                    class="interaction-pill outcome-${escapeHTML(interaction.outcome)}"
                >

                    ${
                        escapeHTML(
                            formatOutcome(
                                interaction.outcome
                            )
                        )
                    }

                </span>

            </div>


            <h3>

                ${
                    escapeHTML(
                        companyName
                    )
                }

            </h3>


            <div class="booth-line">

                Booth

                <strong>

                    ${
                        escapeHTML(
                            interaction.booth_number ||
                            exhibitor?.booth_number ||
                            "—"
                        )
                    }

                </strong>

            </div>


        </div>



        <div class="interaction-contact">

            <span class="interaction-label">
                Contact
            </span>


            <strong>

                ${
                    escapeHTML(
                        interaction.contact_name ||
                        "Not recorded"
                    )
                }

            </strong>


            <span>

                ${
                    escapeHTML(
                        interaction.contact_title ||
                        ""
                    )
                }

            </span>

        </div>



        <div class="interaction-notes">

            <span class="interaction-label">
                Conversation Notes
            </span>


            <p>

                ${
                    escapeHTML(
                        interaction.notes ||
                        "No notes were added."
                    )
                }

            </p>

        </div>



        <div class="interaction-meta">


            <div class="interaction-date">

                <span class="interaction-label">
                    Interaction
                </span>


                <strong>

                    ${
                        escapeHTML(
                            formatInteractionDate(
                                interaction
                            )
                        )
                    }

                </strong>


                ${
                    interaction.follow_up_required

                    ?

                    `
                        <span class="followup-date">

                            Follow-up ${
                                interaction.follow_up_date
                                ?
                                escapeHTML(
                                    formatDate(
                                        interaction.follow_up_date
                                    )
                                )
                                :
                                "required"
                            }

                        </span>
                    `

                    :

                    ""
                }

            </div>



            <div class="interaction-actions">

                <button
                    class="interaction-action"
                    type="button"
                    data-action="edit"
                >
                    Edit
                </button>


                <button
                    class="interaction-action delete"
                    type="button"
                    data-action="delete"
                >
                    Delete
                </button>

            </div>


        </div>

    `;


    card
        .querySelector(
            '[data-action="edit"]'
        )
        ?.addEventListener(
            "click",
            () => {

                openComposer(
                    interaction.id
                );

            }
        );


    card
        .querySelector(
            '[data-action="delete"]'
        )
        ?.addEventListener(
            "click",
            () => {

                deleteInteraction(
                    interaction.id
                );

            }
        );


    return card;

}


/* =========================================================
   OPEN COMPOSER
   ========================================================= */

function openComposer(
    interactionId = null,
    exhibitorId = null
) {

    resetComposerForm();


    if (
        interactionId
    ) {

        loadInteractionIntoForm(
            interactionId
        );

    }

    else if (
        exhibitorId
    ) {

        document
            .getElementById(
                "interactionExhibitor"
            )
            .value =
                exhibitorId;


        updateBoothDisplay();

    }


    const overlay =
        document.getElementById(
            "interactionOverlay"
        );


    const composer =
        document.getElementById(
            "interactionComposer"
        );


    if (overlay) {

        overlay.hidden =
            false;

    }


    if (composer) {

        composer.hidden =
            false;


        requestAnimationFrame(
            () => {

                overlay?.classList.add(
                    "open"
                );


                composer.classList.add(
                    "open"
                );

            }
        );

    }


    document.body.classList.add(
        "composer-open"
    );

}


/* =========================================================
   CLOSE
   ========================================================= */

function closeComposer() {

    const overlay =
        document.getElementById(
            "interactionOverlay"
        );


    const composer =
        document.getElementById(
            "interactionComposer"
        );


    overlay?.classList.remove(
        "open"
    );


    composer?.classList.remove(
        "open"
    );


    document.body.classList.remove(
        "composer-open"
    );


    setTimeout(
        () => {

            if (overlay) {
                overlay.hidden = true;
            }


            if (composer) {
                composer.hidden = true;
            }

        },
        220
    );

}


/* =========================================================
   RESET FORM
   ========================================================= */

function resetComposerForm() {

    const form =
        document.getElementById(
            "interactionForm"
        );


    form?.reset();


    setValue(
        "editingInteractionId",
        ""
    );


    setValue(
        "interactionDate",
        todayISO()
    );


    setValue(
        "interactionType",
        "booth-conversation"
    );


    setValue(
        "interactionOutcome",
        "informational"
    );


    setText(
        "composerTitle",
        "Log interaction"
    );


    setText(
        "saveInteractionLabel",
        "Save Interaction"
    );


    setText(
        "interactionBoothDisplay",
        "—"
    );


    const followUpDateWrap =
        document.getElementById(
            "followUpDateWrap"
        );


    if (followUpDateWrap) {

        followUpDateWrap.hidden =
            true;

    }

}


/* =========================================================
   EDIT FORM
   ========================================================= */

function loadInteractionIntoForm(
    interactionId
) {

    const interaction =
        interactions.find(
            item =>
                String(
                    item.id
                )
                ===
                String(
                    interactionId
                )
        );


    if (!interaction) {
        return;
    }


    setValue(
        "editingInteractionId",
        interaction.id
    );


    setValue(
        "interactionExhibitor",
        interaction.exhibitor_id
    );


    setValue(
        "interactionType",
        interaction.interaction_type
    );


    setValue(
        "contactName",
        interaction.contact_name
    );


    setValue(
        "contactTitle",
        interaction.contact_title
    );


    setValue(
        "interactionDate",
        interaction.interaction_date
    );


    setValue(
        "interactionTime",
        interaction.interaction_time
    );


    setValue(
        "interactionOutcome",
        interaction.outcome
    );


    setValue(
        "interactionNotes",
        interaction.notes
    );


    const followUpCheckbox =
        document.getElementById(
            "followUpRequired"
        );


    if (followUpCheckbox) {

        followUpCheckbox.checked =
            interaction.follow_up_required;

    }


    setValue(
        "followUpDate",
        interaction.follow_up_date
    );


    setText(
        "composerTitle",
        "Edit interaction"
    );


    setText(
        "saveInteractionLabel",
        "Update Interaction"
    );


    updateBoothDisplay();

    updateFollowUpVisibility();

}


/* =========================================================
   BOOTH DISPLAY
   ========================================================= */

function updateBoothDisplay() {

    const exhibitorId =
        document
            .getElementById(
                "interactionExhibitor"
            )
            ?.value;


    const exhibitor =
        getExhibitorById(
            exhibitorId
        );


    setText(
        "interactionBoothDisplay",
        exhibitor?.booth_number ||
        "—"
    );

}


/* =========================================================
   FOLLOW-UP VISIBILITY
   ========================================================= */

function updateFollowUpVisibility() {

    const checked =
        document
            .getElementById(
                "followUpRequired"
            )
            ?.checked;


    const wrap =
        document.getElementById(
            "followUpDateWrap"
        );


    if (wrap) {

        wrap.hidden =
            !checked;

    }

}


/* =========================================================
   SAVE
   ========================================================= */

function saveInteractionFromForm(
    event
) {

    event.preventDefault();


    const exhibitorId =
        document
            .getElementById(
                "interactionExhibitor"
            )
            ?.value;


    if (!exhibitorId) {

        setStatus(
            "Select an exhibitor before saving"
        );


        return;

    }


    const exhibitor =
        getExhibitorById(
            exhibitorId
        );


    const editingId =
        document
            .getElementById(
                "editingInteractionId"
            )
            ?.value;


    const followUpRequired =
        Boolean(
            document
                .getElementById(
                    "followUpRequired"
                )
                ?.checked
        );


    const record = {

        id:
            editingId ||
            generateId(),

        exhibitor_id:
            exhibitorId,

        booth_number:
            exhibitor?.booth_number ||
            "",

        interaction_type:
            getValue(
                "interactionType"
            ),

        contact_name:
            getValue(
                "contactName"
            ),

        contact_title:
            getValue(
                "contactTitle"
            ),

        interaction_date:
            getValue(
                "interactionDate"
            )
            ||
            todayISO(),

        interaction_time:
            getValue(
                "interactionTime"
            ),

        outcome:
            getValue(
                "interactionOutcome"
            ),

        notes:
            getValue(
                "interactionNotes"
            ),

        follow_up_required:
            followUpRequired,

        follow_up_date:
            followUpRequired
            ?
            getValue(
                "followUpDate"
            )
            :
            "",

        created_at:
            editingId
            ?
            (
                interactions.find(
                    item =>
                        String(
                            item.id
                        )
                        ===
                        String(
                            editingId
                        )
                )
                ?.created_at
                ||
                new Date()
                    .toISOString()
            )
            :
            new Date()
                .toISOString(),

        updated_at:
            new Date()
                .toISOString()

    };


    if (
        editingId
    ) {

        const index =
            interactions.findIndex(
                item =>
                    String(
                        item.id
                    )
                    ===
                    String(
                        editingId
                    )
            );


        if (
            index >=
            0
        ) {

            interactions[
                index
            ] = record;

        }

    }

    else {

        interactions.push(
            record
        );

    }


    saveInteractions();

    closeComposer();

    applyFilters();

    updateMetrics();


    setStatus(
        editingId
        ?
        "Interaction updated"
        :
        `${exhibitor?.company_name || "Interaction"} logged`
    );

}


/* =========================================================
   DELETE
   ========================================================= */

function deleteInteraction(
    interactionId
) {

    interactions =
        interactions.filter(
            interaction =>
                String(
                    interaction.id
                )
                !==
                String(
                    interactionId
                )
        );


    saveInteractions();

    applyFilters();

    updateMetrics();


    setStatus(
        "Interaction deleted"
    );

}


/* =========================================================
   SAVE STORAGE
   ========================================================= */

function saveInteractions() {

    localStorage.setItem(
        INTERACTION_STORAGE_KEY,
        JSON.stringify(
            interactions
        )
    );

}


/* =========================================================
   METRICS
   ========================================================= */

function updateMetrics() {

    setText(
        "metricTotal",
        interactions.length
    );


    const today =
        todayISO();


    setText(
        "metricToday",

        interactions.filter(
            interaction =>
                interaction.interaction_date ===
                today
        ).length

    );


    setText(
        "metricFollowUp",

        interactions.filter(
            interaction =>
                interaction.follow_up_required
        ).length

    );


    setText(
        "metricPositive",

        interactions.filter(
            interaction =>
                interaction.outcome ===
                "strong-interest"
                ||
                interaction.outcome ===
                "promising"
        ).length

    );


    setText(
        "visibleInteractionCount",
        filteredInteractions.length
    );

}


/* =========================================================
   EMPTY
   ========================================================= */

function renderEmptyState(
    container
) {

    const hasInteractions =
        interactions.length >
        0;


    container.innerHTML = `

        <div class="interactions-empty">

            <span>

                ${
                    hasInteractions
                    ?
                    "NO MATCHES"
                    :
                    "NO INTERACTIONS YET"
                }

            </span>


            <h3>

                ${
                    hasInteractions
                    ?
                    "Nothing matches these filters."
                    :
                    "Start capturing conversations."
                }

            </h3>


            <p>

                ${
                    hasInteractions

                    ?

                    "Try adjusting the search, interaction type, outcome, or follow-up filters."

                    :

                    "Log booth conversations, meetings, and follow-up needs so the team leaves APTA with usable information instead of scattered notes."

                }

            </p>


            ${
                !hasInteractions

                ?

                `
                    <button
                        id="emptyLogInteractionButton"
                        type="button"
                    >
                        Log Interaction
                    </button>
                `

                :

                ""
            }

        </div>

    `;


    document
        .getElementById(
            "emptyLogInteractionButton"
        )
        ?.addEventListener(
            "click",
            () => openComposer()
        );

}


/* =========================================================
   URL HANDLING

   Example:
   interactions.html?exhibitor=1806-23
   ========================================================= */

function openFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const exhibitorId =
        params.get(
            "exhibitor"
        );


    if (!exhibitorId) {
        return;
    }


    const exhibitor =
        getExhibitorById(
            exhibitorId
        );


    if (!exhibitor) {

        return;

    }


    openComposer(
        null,
        exhibitor.id
    );

}


/* =========================================================
   EXHIBITOR LOOKUP
   ========================================================= */

function getExhibitorById(
    exhibitorId
) {

    return exhibitors.find(
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

}


/* =========================================================
   COMPANY
   ========================================================= */

function getCompanyName(
    interaction
) {

    return (
        getExhibitorById(
            interaction.exhibitor_id
        )
        ?.company_name
        ||
        ""
    );

}


/* =========================================================
   TIME
   ========================================================= */

function getInteractionTimestamp(
    interaction
) {

    const date =
        interaction.interaction_date ||
        "1970-01-01";


    const time =
        interaction.interaction_time ||
        "00:00";


    return new Date(
        `${date}T${time}`
    )
        .getTime();

}


/* =========================================================
   DATE FORMATTING
   ========================================================= */

function formatInteractionDate(
    interaction
) {

    let result =
        formatDate(
            interaction.interaction_date
        );


    if (
        interaction.interaction_time
    ) {

        result +=
            ` · ${
                formatTime(
                    interaction.interaction_time
                )
            }`;

    }


    return result;

}


function formatDate(
    value
) {

    if (!value) {
        return "—";
    }


    const date =
        new Date(
            `${value}T12:00:00`
        );


    return date.toLocaleDateString(
        "en-US",
        {
            month:
                "short",

            day:
                "numeric",

            year:
                "numeric"
        }
    );

}


function formatTime(
    value
) {

    if (!value) {
        return "";
    }


    const [
        hour,
        minute
    ] =
        value
            .split(":")
            .map(Number);


    const date =
        new Date();


    date.setHours(
        hour,
        minute,
        0,
        0
    );


    return date.toLocaleTimeString(
        "en-US",
        {
            hour:
                "numeric",

            minute:
                "2-digit"
        }
    );

}


/* =========================================================
   LABELS
   ========================================================= */

function formatType(
    value
) {

    const labels = {

        "booth-conversation":
            "Booth Conversation",

        "scheduled-meeting":
            "Scheduled Meeting",

        networking:
            "Networking",

        demo:
            "Demo",

        email:
            "Email",

        phone:
            "Phone",

        other:
            "Other"

    };


    return (
        labels[
            value
        ]
        ||
        value
        ||
        "Interaction"
    );

}


function formatOutcome(
    value
) {

    const labels = {

        "strong-interest":
            "Strong Interest",

        promising:
            "Promising",

        informational:
            "Informational",

        "not-a-fit":
            "Not a Fit",

        "follow-up":
            "Follow-Up Needed"

    };


    return (
        labels[
            value
        ]
        ||
        value
        ||
        "Informational"
    );

}


/* =========================================================
   DEFAULT DATE
   ========================================================= */

function prepareDefaultDate() {

    const input =
        document.getElementById(
            "interactionDate"
        );


    if (
        input &&
        !input.value
    ) {

        input.value =
            todayISO();

    }

}


function todayISO() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        )
            .padStart(
                2,
                "0"
            );


    const day =
        String(
            now.getDate()
        )
            .padStart(
                2,
                "0"
            );


    return (
        `${year}-${month}-${day}`
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
                    `${interactions.length} interactions · conversation history ready`;

            },
            3500
        );

}


/* =========================================================
   VALUE HELPERS
   ========================================================= */

function getValue(
    id
) {

    return (
        document
            .getElementById(
                id
            )
            ?.value
            ?.trim()
        ||
        ""
    );

}


function setValue(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.value =
            value ??
            "";

    }

}


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
   ID
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
   HTML ESCAPE
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
