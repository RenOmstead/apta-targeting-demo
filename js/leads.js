/* =========================================================
   APTA 2026 TEAM HUB
   NORTHSTAR TRANSIT SOLUTIONS

   LEAD PIPELINE MANAGEMENT
   ========================================================= */


/* =========================================================
   STATE
   ========================================================= */

let exhibitors = [];

let leads = [];

let filteredLeads = [];


/* =========================================================
   STORAGE
   ========================================================= */

const LEAD_STORAGE_KEY =
    "northstar_apta_leads";

const INTERACTION_STORAGE_KEY =
    "northstar_apta_interactions";


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeLeads
);


function initializeLeads() {

    loadExhibitors();

    loadLeads();

    bindControls();

    populateExhibitorSelect();

    populateOwnerFilter();

    applyFilters();

    updateMetrics();

    openFromURL();

    setStatus(
        `${leads.length} lead records loaded`
    );

}


/* =========================================================
   EXHIBITORS
   ========================================================= */

function loadExhibitors() {

    if (
        !window.APTA_EXHIBITORS ||
        !Array.isArray(
            window.APTA_EXHIBITORS
        )
    ) {

        exhibitors = [];

        console.error(
            "APTA exhibitor data did not load."
        );

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
   LOAD LEADS
   ========================================================= */

function loadLeads() {

    try {

        leads =
            JSON.parse(
                localStorage.getItem(
                    LEAD_STORAGE_KEY
                )
                ||
                "[]"
            );

    }

    catch (error) {

        console.error(
            "Unable to load leads:",
            error
        );


        leads = [];

    }


    leads =
        leads.map(
            normalizeLead
        );

}


/* =========================================================
   NORMALIZE LEAD
   ========================================================= */

function normalizeLead(
    lead
) {

    return {

        id:
            lead.id ||
            generateId(),

        exhibitor_id:
            lead.exhibitor_id ||
            "",

        booth_number:
            lead.booth_number ||
            "",

        source:
            lead.source ||
            "apta-interaction",

        contact_name:
            lead.contact_name ||
            "",

        contact_title:
            lead.contact_title ||
            "",

        stage:
            normalizeStage(
                lead.stage
            ),

        owner:
            lead.owner ||
            "",

        value:
            Number(
                lead.value || 0
            ),

        probability:
            clampProbability(
                lead.probability
            ),

        next_action:
            lead.next_action ||
            "",

        follow_up_date:
            lead.follow_up_date ||
            "",

        last_contact:
            lead.last_contact ||
            "",

        notes:
            lead.notes ||
            "",

        created_at:
            lead.created_at ||
            new Date()
                .toISOString(),

        updated_at:
            lead.updated_at ||
            ""

    };

}


/* =========================================================
   CONTROLS
   ========================================================= */

function bindControls() {

    document
        .getElementById(
            "headerAddLeadButton"
        )
        ?.addEventListener(
            "click",
            () => openComposer()
        );


    document
        .getElementById(
            "heroAddLeadButton"
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
            "cancelLeadButton"
        )
        ?.addEventListener(
            "click",
            closeComposer
        );


    document
        .getElementById(
            "leadOverlay"
        )
        ?.addEventListener(
            "click",
            closeComposer
        );


    document
        .getElementById(
            "leadForm"
        )
        ?.addEventListener(
            "submit",
            saveLeadFromForm
        );


    document
        .getElementById(
            "leadExhibitor"
        )
        ?.addEventListener(
            "change",
            handleExhibitorSelection
        );


    document
        .getElementById(
            "leadSearch"
        )
        ?.addEventListener(
            "input",
            applyFilters
        );


    document
        .getElementById(
            "stageFilter"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document
        .getElementById(
            "ownerFilter"
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
            "leadSort"
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
            "leadExhibitor"
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
   OWNER FILTER
   ========================================================= */

function populateOwnerFilter() {

    const select =
        document.getElementById(
            "ownerFilter"
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


    const owners =
        [
            ...new Set(
                leads
                    .map(
                        lead =>
                            lead.owner
                                .trim()
                    )
                    .filter(Boolean)
            )
        ]
            .sort(
                (a, b) =>
                    a.localeCompare(b)
            );


    owners.forEach(
        owner => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                owner;


            option.textContent =
                owner;


            select.appendChild(
                option
            );

        }
    );

}


/* =========================================================
   FILTER
   ========================================================= */

function applyFilters() {

    const search =
        (
            document
                .getElementById(
                    "leadSearch"
                )
                ?.value
            ||
            ""
        )
            .trim()
            .toLowerCase();


    const stage =
        document
            .getElementById(
                "stageFilter"
            )
            ?.value
        ||
        "";


    const owner =
        document
            .getElementById(
                "ownerFilter"
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
                "leadSort"
            )
            ?.value
        ||
        "priority";


    filteredLeads =
        leads.filter(
            lead => {

                const exhibitor =
                    getExhibitorById(
                        lead.exhibitor_id
                    );


                const searchable =
                    [
                        exhibitor?.company_name,
                        lead.booth_number,
                        lead.contact_name,
                        lead.contact_title,
                        lead.owner,
                        lead.next_action,
                        lead.notes,
                        lead.stage
                    ]
                        .join(" ")
                        .toLowerCase();


                const matchesSearch =
                    !search ||
                    searchable.includes(
                        search
                    );


                const matchesStage =
                    !stage ||
                    lead.stage ===
                    stage;


                const matchesOwner =
                    !owner ||
                    lead.owner ===
                    owner;


                let matchesFollowUp =
                    true;


                if (
                    followUp ===
                    "due"
                ) {

                    matchesFollowUp =
                        isFollowUpDue(
                            lead
                        );

                }


                if (
                    followUp ===
                    "scheduled"
                ) {

                    matchesFollowUp =
                        Boolean(
                            lead.follow_up_date
                        )
                        &&
                        !isFollowUpDue(
                            lead
                        );

                }


                if (
                    followUp ===
                    "none"
                ) {

                    matchesFollowUp =
                        !lead.follow_up_date;

                }


                return (
                    matchesSearch &&
                    matchesStage &&
                    matchesOwner &&
                    matchesFollowUp
                );

            }
        );


    sortLeads(
        filteredLeads,
        sort
    );


    renderLeads();

    updateMetrics();

}


/* =========================================================
   SORT
   ========================================================= */

function sortLeads(
    records,
    sort
) {

    records.sort(
        (a, b) => {

            if (
                sort ===
                "value"
            ) {

                return (
                    b.value -
                    a.value
                );

            }


            if (
                sort ===
                "probability"
            ) {

                return (
                    b.probability -
                    a.probability
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

                return (
                    compareDates(
                        a.follow_up_date,
                        b.follow_up_date
                    )
                );

            }


            /*
               Default = weighted value
            */

            return (
                getWeightedValue(b)
                -
                getWeightedValue(a)
            );

        }
    );

}


/* =========================================================
   RENDER
   ========================================================= */

function renderLeads() {

    const container =
        document.getElementById(
            "leadList"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    setText(
        "visibleLeadCount",
        filteredLeads.length
    );


    if (
        !filteredLeads.length
    ) {

        renderEmptyState(
            container
        );

        return;

    }


    const fragment =
        document.createDocumentFragment();


    filteredLeads.forEach(
        (
            lead,
            index
        ) => {

            fragment.appendChild(
                createLeadCard(
                    lead,
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

function createLeadCard(
    lead,
    index
) {

    const exhibitor =
        getExhibitorById(
            lead.exhibitor_id
        );


    const companyName =
        exhibitor?.company_name ||
        "Unknown Exhibitor";


    const card =
        document.createElement(
            "article"
        );


    card.className =
        `lead-card stage-${lead.stage}`;


    const followUpDue =
        isFollowUpDue(
            lead
        );


    card.innerHTML = `

        <div class="lead-index">

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



        <div class="lead-company">

            <span
                class="stage-pill ${escapeHTML(lead.stage)}"
            >

                ${
                    escapeHTML(
                        formatStage(
                            lead.stage
                        )
                    )
                }

            </span>


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
                            lead.booth_number ||
                            exhibitor?.booth_number ||
                            "—"
                        )
                    }

                </strong>

            </div>

        </div>



        <div class="lead-column">

            <span class="lead-label">
                Contact
            </span>

            <strong>

                ${
                    escapeHTML(
                        lead.contact_name ||
                        "Not recorded"
                    )
                }

            </strong>

            <small>

                ${
                    escapeHTML(
                        lead.contact_title ||
                        ""
                    )
                }

            </small>

        </div>



        <div class="lead-column lead-value">

            <span class="lead-label">
                Opportunity
            </span>

            <strong>

                ${
                    formatCurrency(
                        lead.value
                    )
                }

            </strong>


            <small>

                ${
                    lead.probability
                }% probability

            </small>


            <div class="probability-track">

                <div
                    class="probability-fill"
                    style="width:${lead.probability}%"
                >
                </div>

            </div>

        </div>



        <div class="lead-column">

            <span class="lead-label">
                Owner
            </span>

            <strong>

                ${
                    escapeHTML(
                        lead.owner ||
                        "Unassigned"
                    )
                }

            </strong>

            <small>
                Weighted:
                ${
                    formatCurrency(
                        getWeightedValue(
                            lead
                        )
                    )
                }
            </small>

        </div>



        <div
            class="lead-column lead-next-action"
        >

            <span class="lead-label">
                Next Action
            </span>

            <p>

                ${
                    escapeHTML(
                        lead.next_action ||
                        "No next action recorded."
                    )
                }

            </p>

        </div>



        <div
            class="lead-column lead-followup ${
                followUpDue
                ?
                "due"
                :
                ""
            }"
        >

            <span class="lead-label">
                Follow-Up
            </span>

            <strong>

                ${
                    lead.follow_up_date
                    ?
                    escapeHTML(
                        formatDate(
                            lead.follow_up_date
                        )
                    )
                    :
                    "No date"
                }

            </strong>

            <small>

                ${
                    followUpDue
                    ?
                    "Due / overdue"
                    :
                    (
                        lead.last_contact
                        ?
                        `Last contact ${escapeHTML(formatDate(lead.last_contact))}`
                        :
                        "No last contact date"
                    )
                }

            </small>

        </div>



        <div class="lead-actions">


            <button
                class="lead-action"
                type="button"
                data-action="edit"
            >

                <span>
                    Edit
                </span>

                <span>
                    →
                </span>

            </button>


            <a
                class="lead-action"
                href="interactions.html?exhibitor=${
                    encodeURIComponent(
                        lead.exhibitor_id
                    )
                }"
            >

                <span>
                    Interactions
                </span>

                <span>
                    ↗
                </span>

            </a>


            <a
                class="lead-action"
                href="exhibitors.html?id=${
                    encodeURIComponent(
                        lead.exhibitor_id
                    )
                }"
            >

                <span>
                    Profile
                </span>

                <span>
                    →
                </span>

            </a>


            <button
                class="lead-action won"
                type="button"
                data-action="won"
            >

                <span>
                    Mark Won
                </span>

                <span>
                    ✓
                </span>

            </button>


            <button
                class="lead-action lost"
                type="button"
                data-action="lost"
            >

                <span>
                    Mark Lost
                </span>

                <span>
                    ×
                </span>

            </button>


            <button
                class="lead-action delete"
                type="button"
                data-action="delete"
            >

                <span>
                    Remove
                </span>

                <span>
                    −
                </span>

            </button>


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
                    lead.id
                );

            }
        );


    card
        .querySelector(
            '[data-action="won"]'
        )
        ?.addEventListener(
            "click",
            () => {

                changeLeadStage(
                    lead.id,
                    "won"
                );

            }
        );


    card
        .querySelector(
            '[data-action="lost"]'
        )
        ?.addEventListener(
            "click",
            () => {

                changeLeadStage(
                    lead.id,
                    "lost"
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

                deleteLead(
                    lead.id
                );

            }
        );


    return card;

}


/* =========================================================
   COMPOSER
   ========================================================= */

function openComposer(
    leadId = null,
    exhibitorId = null
) {

    resetComposerForm();


    if (
        leadId
    ) {

        loadLeadIntoForm(
            leadId
        );

    }

    else if (
        exhibitorId
    ) {

        setValue(
            "leadExhibitor",
            exhibitorId
        );


        handleExhibitorSelection();

    }


    const overlay =
        document.getElementById(
            "leadOverlay"
        );


    const composer =
        document.getElementById(
            "leadComposer"
        );


    if (overlay) {
        overlay.hidden = false;
    }


    if (composer) {

        composer.hidden = false;


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
            "leadOverlay"
        );


    const composer =
        document.getElementById(
            "leadComposer"
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

    document
        .getElementById(
            "leadForm"
        )
        ?.reset();


    setValue(
        "editingLeadId",
        ""
    );


    setValue(
        "leadStage",
        "new"
    );


    setValue(
        "leadSource",
        "apta-interaction"
    );


    setValue(
        "leadProbability",
        "25"
    );


    setText(
        "leadBoothDisplay",
        "—"
    );


    setText(
        "composerTitle",
        "Add lead"
    );


    setText(
        "saveLeadLabel",
        "Save Lead"
    );

}


/* =========================================================
   EXHIBITOR CHANGE
   ========================================================= */

function handleExhibitorSelection() {

    const exhibitorId =
        getValue(
            "leadExhibitor"
        );


    const exhibitor =
        getExhibitorById(
            exhibitorId
        );


    setText(
        "leadBoothDisplay",
        exhibitor?.booth_number ||
        "—"
    );


    /*
       Pull most recent interaction information
       into the lead composer when available.
    */

    if (
        !exhibitor
    ) {

        return;

    }


    const interaction =
        getMostRecentInteraction(
            exhibitor.id
        );


    if (
        !interaction
    ) {

        return;

    }


    if (
        !getValue(
            "leadContactName"
        )
    ) {

        setValue(
            "leadContactName",
            interaction.contact_name
        );

    }


    if (
        !getValue(
            "leadContactTitle"
        )
    ) {

        setValue(
            "leadContactTitle",
            interaction.contact_title
        );

    }


    if (
        !getValue(
            "leadLastContact"
        )
    ) {

        setValue(
            "leadLastContact",
            interaction.interaction_date
        );

    }


    if (
        !getValue(
            "leadFollowUpDate"
        )
    ) {

        setValue(
            "leadFollowUpDate",
            interaction.follow_up_date
        );

    }


    if (
        !getValue(
            "leadNotes"
        )
    ) {

        setValue(
            "leadNotes",
            interaction.notes
        );

    }

}


/* =========================================================
   LOAD LEAD
   ========================================================= */

function loadLeadIntoForm(
    leadId
) {

    const lead =
        getLeadById(
            leadId
        );


    if (!lead) {
        return;
    }


    setValue(
        "editingLeadId",
        lead.id
    );


    setValue(
        "leadExhibitor",
        lead.exhibitor_id
    );


    setValue(
        "leadSource",
        lead.source
    );


    setValue(
        "leadContactName",
        lead.contact_name
    );


    setValue(
        "leadContactTitle",
        lead.contact_title
    );


    setValue(
        "leadStage",
        lead.stage
    );


    setValue(
        "leadOwner",
        lead.owner
    );


    setValue(
        "leadValue",
        lead.value
    );


    setValue(
        "leadProbability",
        lead.probability
    );


    setValue(
        "leadNextAction",
        lead.next_action
    );


    setValue(
        "leadFollowUpDate",
        lead.follow_up_date
    );


    setValue(
        "leadLastContact",
        lead.last_contact
    );


    setValue(
        "leadNotes",
        lead.notes
    );


    const exhibitor =
        getExhibitorById(
            lead.exhibitor_id
        );


    setText(
        "leadBoothDisplay",
        exhibitor?.booth_number ||
        lead.booth_number ||
        "—"
    );


    setText(
        "composerTitle",
        "Edit lead"
    );


    setText(
        "saveLeadLabel",
        "Update Lead"
    );

}


/* =========================================================
   SAVE FORM
   ========================================================= */

function saveLeadFromForm(
    event
) {

    event.preventDefault();


    const exhibitorId =
        getValue(
            "leadExhibitor"
        );


    if (
        !exhibitorId
    ) {

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
        getValue(
            "editingLeadId"
        );


    const oldLead =
        editingId
        ?
        getLeadById(
            editingId
        )
        :
        null;


    const record = {

        id:
            editingId ||
            generateId(),

        exhibitor_id:
            exhibitorId,

        booth_number:
            exhibitor?.booth_number ||
            "",

        source:
            getValue(
                "leadSource"
            ),

        contact_name:
            getValue(
                "leadContactName"
            ),

        contact_title:
            getValue(
                "leadContactTitle"
            ),

        stage:
            normalizeStage(
                getValue(
                    "leadStage"
                )
            ),

        owner:
            getValue(
                "leadOwner"
            ),

        value:
            Math.max(
                0,
                Number(
                    getValue(
                        "leadValue"
                    )
                    ||
                    0
                )
            ),

        probability:
            clampProbability(
                getValue(
                    "leadProbability"
                )
            ),

        next_action:
            getValue(
                "leadNextAction"
            ),

        follow_up_date:
            getValue(
                "leadFollowUpDate"
            ),

        last_contact:
            getValue(
                "leadLastContact"
            ),

        notes:
            getValue(
                "leadNotes"
            ),

        created_at:
            oldLead?.created_at
            ||
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
            leads.findIndex(
                lead =>
                    String(
                        lead.id
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

            leads[index] =
                record;

        }

    }

    else {

        leads.push(
            record
        );

    }


    saveLeads();

    populateOwnerFilter();

    closeComposer();

    applyFilters();


    setStatus(
        editingId
        ?
        "Lead updated"
        :
        `${exhibitor?.company_name || "Lead"} added to pipeline`
    );

}


/* =========================================================
   CHANGE STAGE
   ========================================================= */

function changeLeadStage(
    leadId,
    stage
) {

    const lead =
        getLeadById(
            leadId
        );


    if (!lead) {
        return;
    }


    lead.stage =
        normalizeStage(
            stage
        );


    if (
        stage ===
        "won"
    ) {

        lead.probability =
            100;

    }


    if (
        stage ===
        "lost"
    ) {

        lead.probability =
            0;

    }


    lead.updated_at =
        new Date()
            .toISOString();


    saveLeads();

    applyFilters();


    setStatus(
        `Lead marked ${formatStage(stage)}`
    );

}


/* =========================================================
   DELETE
   ========================================================= */

function deleteLead(
    leadId
) {

    leads =
        leads.filter(
            lead =>
                String(
                    lead.id
                )
                !==
                String(
                    leadId
                )
        );


    saveLeads();

    populateOwnerFilter();

    applyFilters();


    setStatus(
        "Lead removed"
    );

}


/* =========================================================
   STORAGE
   ========================================================= */

function saveLeads() {

    localStorage.setItem(
        LEAD_STORAGE_KEY,
        JSON.stringify(
            leads
        )
    );

}


/* =========================================================
   INTERACTIONS
   ========================================================= */

function getInteractions() {

    try {

        return JSON.parse(
            localStorage.getItem(
                INTERACTION_STORAGE_KEY
            )
            ||
            "[]"
        );

    }

    catch {

        return [];

    }

}


function getMostRecentInteraction(
    exhibitorId
) {

    return getInteractions()
        .filter(
            interaction =>
                String(
                    interaction.exhibitor_id
                )
                ===
                String(
                    exhibitorId
                )
        )
        .sort(
            (a, b) =>
                getInteractionTimestamp(b)
                -
                getInteractionTimestamp(a)
        )[0]
        ||
        null;

}


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
   METRICS
   ========================================================= */

function updateMetrics() {

    const active =
        leads.filter(
            lead =>
                lead.stage !==
                "lost"
        );


    setText(
        "metricTotal",
        active.length
    );


    const pipeline =
        active.reduce(
            (sum,lead) =>
                sum +
                lead.value,
            0
        );


    setText(
        "metricPipeline",
        formatCurrency(
            pipeline
        )
    );


    const weighted =
        active.reduce(
            (sum,lead) =>
                sum +
                getWeightedValue(
                    lead
                ),
            0
        );


    setText(
        "metricWeighted",
        formatCurrency(
            weighted
        )
    );


    setText(
        "metricDue",

        active.filter(
            isFollowUpDue
        ).length

    );


    setText(
        "visibleLeadCount",
        filteredLeads.length
    );

}


/* =========================================================
   FOLLOW-UP
   ========================================================= */

function isFollowUpDue(
    lead
) {

    if (
        !lead.follow_up_date
    ) {

        return false;

    }


    if (
        lead.stage ===
        "won"
        ||
        lead.stage ===
        "lost"
    ) {

        return false;

    }


    return (
        lead.follow_up_date <=
        todayISO()
    );

}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function renderEmptyState(
    container
) {

    const hasLeads =
        leads.length >
        0;


    container.innerHTML = `

        <div class="leads-empty">

            <span>

                ${
                    hasLeads
                    ?
                    "NO MATCHES"
                    :
                    "NO LEADS YET"
                }

            </span>


            <h3>

                ${
                    hasLeads
                    ?
                    "Nothing matches these filters."
                    :
                    "Build the post-expo pipeline."
                }

            </h3>


            <p>

                ${
                    hasLeads

                    ?

                    "Try adjusting stage, owner, follow-up state, or search."

                    :

                    "Turn promising conversations into structured opportunities so APTA activity continues after the event."

                }

            </p>


            ${
                !hasLeads

                ?

                `
                    <button
                        id="emptyAddLeadButton"
                        type="button"
                    >
                        Add Lead
                    </button>
                `

                :

                ""
            }

        </div>

    `;


    document
        .getElementById(
            "emptyAddLeadButton"
        )
        ?.addEventListener(
            "click",
            () => openComposer()
        );

}


/* =========================================================
   URL

   Supports:
   leads.html?exhibitor=EXHIBITOR_ID
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


    if (
        !exhibitorId
    ) {
        return;
    }


    const exhibitor =
        getExhibitorById(
            exhibitorId
        );


    if (
        exhibitor
    ) {

        openComposer(
            null,
            exhibitor.id
        );

    }

}


/* =========================================================
   LOOKUPS
   ========================================================= */

function getExhibitorById(
    id
) {

    return exhibitors.find(
        exhibitor =>
            String(
                exhibitor.id
            )
            ===
            String(
                id
            )
    )
    ||
    null;

}


function getLeadById(
    id
) {

    return leads.find(
        lead =>
            String(
                lead.id
            )
            ===
            String(
                id
            )
    )
    ||
    null;

}


function getCompanyName(
    lead
) {

    return (
        getExhibitorById(
            lead.exhibitor_id
        )
        ?.company_name
        ||
        ""
    );

}


/* =========================================================
   VALUE
   ========================================================= */

function getWeightedValue(
    lead
) {

    return (
        lead.value *
        (
            lead.probability /
            100
        )
    );

}


/* =========================================================
   FORMATTING
   ========================================================= */

function formatCurrency(
    value
) {

    return new Intl.NumberFormat(
        "en-US",
        {
            style:
                "currency",

            currency:
                "USD",

            maximumFractionDigits:
                0
        }
    )
        .format(
            Number(value || 0)
        );

}


function formatDate(
    value
) {

    if (!value) {
        return "—";
    }


    return new Date(
        `${value}T12:00:00`
    )
        .toLocaleDateString(
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


function formatStage(
    stage
) {

    const labels = {

        new:
            "New",

        qualified:
            "Qualified",

        discovery:
            "Discovery",

        proposal:
            "Proposal",

        negotiation:
            "Negotiation",

        won:
            "Won",

        lost:
            "Lost"

    };


    return (
        labels[
            stage
        ]
        ||
        stage
    );

}


/* =========================================================
   NORMALIZATION
   ========================================================= */

function normalizeStage(
    stage
) {

    const value =
        String(
            stage ||
            ""
        )
            .toLowerCase();


    const valid = [

        "new",

        "qualified",

        "discovery",

        "proposal",

        "negotiation",

        "won",

        "lost"

    ];


    return valid.includes(
        value
    )
        ?
        value
        :
        "new";

}


function clampProbability(
    value
) {

    const number =
        Number(
            value
        );


    if (
        Number.isNaN(
            number
        )
    ) {

        return 25;

    }


    return Math.min(
        100,
        Math.max(
            0,
            number
        )
    );

}


/* =========================================================
   DATE SORT
   ========================================================= */

function compareDates(
    a,
    b
) {

    if (
        !a &&
        !b
    ) {

        return 0;

    }


    if (
        !a
    ) {

        return 1;

    }


    if (
        !b
    ) {

        return -1;

    }


    return a.localeCompare(
        b
    );

}


function todayISO() {

    const now =
        new Date();


    return [
        now.getFullYear(),

        String(
            now.getMonth() + 1
        )
            .padStart(
                2,
                "0"
            ),

        String(
            now.getDate()
        )
            .padStart(
                2,
                "0"
            )
    ]
        .join("-");

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
                    `${leads.length} lead records · pipeline ready`;

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
