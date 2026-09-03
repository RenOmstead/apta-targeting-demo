/* =========================================================
   APTA 2026 TEAM HUB
   NORTHSTAR TRANSIT SOLUTIONS

   INTERACTIVE EXPO FLOOR
   ========================================================= */


/* =========================================================
   FLOOR CONFIGURATION

   1 grid unit = 10 physical feet
   ========================================================= */

const FLOOR_CONFIG = {

    unitFeet: 10,

    unitPixels: 34,

    widthUnits: 48,

    heightUnits: 39

};



/* =========================================================
   STATE
   ========================================================= */

let exhibitors = [];

let selectedExhibitor = null;

let visibleBoothCount = 0;



/* =========================================================
   FLOOR STRUCTURE
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
   AISLES
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
   FLOOR LAYOUT

   width / depth are 10-foot modules.

   Example:
   width: 1, depth: 1
   = 10' × 10'

   width: 3, depth: 1
   = 30' × 10'
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

        /* VERIFIED 30 × 10 */

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
   EXHIBITOR DIRECTORY
   ========================================================= */

const APTA_EXHIBITORS = [

    {
        id: "3175",
        company_name: "Token Transit",
        booth_number: "3175",
        category: "Fare Collection"
    },

    {
        id: "3176",
        company_name: "Xcalliber",
        booth_number: "3176",
        category: "Technology"
    },

    {
        id: "3181",
        company_name: "LYT",
        booth_number: "3181",
        category: "Transit Technology"
    },

    {
        id: "3182",
        company_name:
            "Propane Education & Research Council",
        booth_number: "3182",
        category: "Alternative Fuels"
    },

    {
        id: "3185",
        company_name: "LPA Group Plc",
        booth_number: "3185",
        category: "Transit Technology"
    },

    {
        id: "3186",
        company_name: "APTA Exhibitor",
        booth_number: "3186",
        category: "Exhibitor"
    },

    {
        id: "3100",
        company_name: "BAE Systems",
        booth_number: "3100",
        category: "Vehicle Systems"
    },

    {
        id: "3103",
        company_name:
            "Brookville Equipment Corporation",
        booth_number: "3103",
        category: "Rolling Stock"
    },

    {
        id: "3106",
        company_name: "ROUSH CleanTech",
        booth_number: "3106",
        category: "Clean Transportation"
    },


    {
        id: "3402",
        company_name:
            "Global Display Solutions",
        booth_number: "3402",
        category: "Passenger Systems"
    },

    {
        id: "3405",
        company_name:
            "Advanced Rail Systems",
        booth_number: "3405",
        category: "Rail Technology"
    },

    {
        id: "3406",
        company_name:
            "Fraenkische Industrial Pipes",
        booth_number: "3406",
        category: "Components"
    },

    {
        id: "3408",
        company_name: "REI",
        booth_number: "3408",
        category: "Transit Technology"
    },

    {
        id: "3420",
        company_name:
            "Kawasaki Rail Car Inc.",
        booth_number: "3420",
        category: "Rolling Stock"
    },

    {
        id: "3425",
        company_name:
            "Scheidt & Bachmann",
        booth_number: "3425",
        category: "Fare Collection"
    },


    {
        id: "3500",
        company_name:
            "North Hall Exhibitor",
        booth_number: "3500",
        category: "Transit Industry"
    },

    {
        id: "3600",
        company_name:
            "Central Island Exhibitor",
        booth_number: "3600",
        category: "Transit Industry"
    },

    {
        id: "3700",
        company_name:
            "Mobility Pavilion",
        booth_number: "3700",
        category: "Mobility"
    },

    {
        id: "3800",
        company_name:
            "Transit Technology Pavilion",
        booth_number: "3800",
        category: "Technology"
    },

    {
        id: "3900",
        company_name:
            "Rail Systems Pavilion",
        booth_number: "3900",
        category: "Rail Technology"
    },


    {
        id: "4210",
        company_name: "LockNClimb, LLC",
        booth_number: "4210",
        category: "Equipment"
    },

    {
        id: "4212",
        company_name: "Kuba",
        booth_number: "4212",
        category: "Fare Collection"
    },

    {
        id: "4217",
        company_name: "BBA Project, Inc.",
        booth_number: "4217",
        category: "Consulting"
    },

    {
        id: "4220",
        company_name: "May Mobility",
        booth_number: "4220",
        category: "Mobility"
    },

    {
        id: "4231",
        company_name:
            "Tolar Manufacturing Company",
        booth_number: "4231",
        category: "Transit Equipment"
    },

    {
        id: "4234",
        company_name:
            "Michael Baker International",
        booth_number: "4234",
        category: "Engineering"
    },

    {
        id: "4237",
        company_name:
            "FLEETWATCH",
        booth_number: "4237",
        category: "Fleet Technology"
    },

    {
        id: "4239",
        company_name:
            "A Customer's Point of View",
        booth_number: "4239",
        category: "Consulting"
    },

    {
        id: "4252",
        company_name: "Delta-Danobat",
        booth_number: "4252",
        category: "Rail Equipment"
    },

    {
        id: "4255",
        company_name:
            "The Routing Company",
        booth_number: "4255",
        category: "Mobility Technology"
    },

    {
        id: "4257",
        company_name:
            "NATSCO",
        booth_number: "4257",
        category: "Manufacturing"
    },

    {
        id: "4261",
        company_name: "Pro-Flex Inc.",
        booth_number: "4261",
        category: "Components"
    },

    {
        id: "4264",
        company_name:
            "WOW Brand Products",
        booth_number: "4264",
        category: "Transit Products"
    },

    {
        id: "4267",
        company_name: "Ofolux S.R.L.",
        booth_number: "4267",
        category: "Vehicle Systems"
    },

    {
        id: "4269",
        company_name: "SignAgent",
        booth_number: "4269",
        category: "Passenger Information"
    },

    {
        id: "4274",
        company_name:
            "Strive Transit Ambassadors",
        booth_number: "4274",
        category: "Transit Services"
    },

    {
        id: "4275",
        company_name: "RideShark",
        booth_number: "4275",
        category: "Mobility Technology"
    },

    {
        id: "4277",
        company_name: "Bridgestone",
        booth_number: "4277",
        category: "Vehicle Components"
    },

    {
        id: "4279",
        company_name: "APTA Exhibitor",
        booth_number: "4279",
        category: "Exhibitor"
    },

    {
        id: "4281",
        company_name:
            "PureTech Systems",
        booth_number: "4281",
        category: "Security Technology"
    },

    {
        id: "4285",
        company_name:
            "Xiamen Magnetic North Technology",
        booth_number: "4285",
        category: "Transit Technology"
    },


    {
        id: "4606",
        company_name:
            "Advantage Manufacturing",
        booth_number: "4606",
        category: "Manufacturing"
    },

    {
        id: "4607",
        company_name:
            "Acorn Wire & Iron Works",
        booth_number: "4607",
        category: "Manufacturing"
    },

    {
        id: "4608",
        company_name:
            "Whiting Door Manufacturing",
        booth_number: "4608",
        category: "Vehicle Components"
    },

    {
        id: "4610",
        company_name:
            "Common Pixels",
        booth_number: "4610",
        category: "Technology"
    },

    {
        id: "4612",
        company_name:
            "PowerPusher",
        booth_number: "4612",
        category: "Equipment"
    },

    {
        id: "4614",
        company_name:
            "APTA Exhibitor",
        booth_number: "4614",
        category: "Exhibitor"
    },

    {
        id: "4617",
        company_name:
            "r2p USA Inc.",
        booth_number: "4617",
        category: "Transit Technology"
    },

    {
        id: "4620",
        company_name:
            "S. Sterling Company",
        booth_number: "4620",
        category: "Transit Products"
    },

    {
        id: "4622",
        company_name:
            "Block By Block",
        booth_number: "4622",
        category: "Transit Services"
    },

    {
        id: "4624",
        company_name:
            "Block By Block",
        booth_number: "4624",
        category: "Transit Services"
    },

    {
        id: "4625",
        company_name:
            "ICP DAS",
        booth_number: "4625",
        category: "Technology"
    },

    {
        id: "4627",
        company_name:
            "ddm hopt+schuler",
        booth_number: "4627",
        category: "Fare Systems"
    },

    {
        id: "4628",
        company_name: "HID",
        booth_number: "4628",
        category: "Identity Technology"
    },

    {
        id: "4631",
        company_name:
            "Zilla Corporation",
        booth_number: "4631",
        category: "Transit Products"
    },

    {
        id: "4632",
        company_name:
            "SELS USA",
        booth_number: "4632",
        category: "Transportation Systems"
    },

    {
        id: "4636",
        company_name:
            "Milwaukee Composites",
        booth_number: "4636",
        category: "Vehicle Components"
    },

    {
        id: "4638",
        company_name:
            "SpaceAge Synthetics",
        booth_number: "4638",
        category: "Materials"
    },

    {
        id: "4642",
        company_name:
            "Imagry Autonomous Buses & Shuttles",
        booth_number: "4642",
        category: "Autonomous Mobility"
    },

    {
        id: "4644",
        company_name:
            "oToBrite Electronics",
        booth_number: "4644",
        category: "Vehicle Technology"
    },

    {
        id: "4646",
        company_name:
            "Dana B. Kenyon",
        booth_number: "4646",
        category: "Engineering"
    },

    {
        id: "4647",
        company_name:
            "Spradling International",
        booth_number: "4647",
        category: "Vehicle Interiors"
    },

    {
        id: "4648",
        company_name:
            "Concept Seating",
        booth_number: "4648",
        category: "Vehicle Interiors"
    },

    {
        id: "4649",
        company_name:
            "WaySine LLC",
        booth_number: "4649",
        category: "Passenger Information"
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
        [...APTA_EXHIBITORS];


    bindControls();

    populateCategoryFilter();

    renderFloor();

    renderTargetRoute();

    updateMetrics();

    openExhibitorFromURL();


    setStatus(
        `${APTA_FLOOR_LAYOUT.length} mapped booths loaded`
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


    /*
       Prevent duplicates if initializeMap()
       ever gets called twice.
    */

    while (
        select.options.length >
        1
    ) {

        select.remove(1);

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

        console.error(
            'Map error: element with id="expoFloor" was not found.'
        );

        return;

    }


    const unit =
        FLOOR_CONFIG.unitPixels;


    /*
       CRITICAL:
       Set an explicit visible size.
    */

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


    floor.style.minWidth =
        `${
            FLOOR_CONFIG.widthUnits *
            unit
        }px`;


    floor.style.minHeight =
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

            const exhibitor =
                getExhibitorByBooth(
                    layout.booth_number
                );


            const booth =
                createBooth(
                    layout,
                    exhibitor
                );


            floor.appendChild(
                booth
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


            element.style.position =
                "absolute";


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
   AISLES
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


            element.style.position =
                "absolute";


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
    exhibitor
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


    const company =
        exhibitor?.company_name ||
        `Booth ${layout.booth_number}`;


    if (
        isTargeted(
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
                                company
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
   LOOKUPS
   ========================================================= */

function getExhibitorByBooth(
    boothNumber
) {

    return exhibitors.find(
        exhibitor =>
            String(
                exhibitor.booth_number
            )
            ===
            String(
                boothNumber
            )
    )
    || null;

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
    || null;

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


    const exhibitor =
        getExhibitorByBooth(
            boothNumber
        );


    selectedExhibitor = {

        id:
            exhibitor?.id ||
            boothNumber,

        company_name:
            exhibitor?.company_name ||
            `Booth ${boothNumber}`,

        booth_number:
            boothNumber,

        category:
            exhibitor?.category ||
            "APTA Exhibitor",

        description:
            exhibitor?.description ||
            "Public exhibitor profile information will appear here as the directory is completed.",

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


    const sqft =
        widthFeet *
        depthFeet;


    setText(
        "selectedCompanyMark",
        getInitial(
            selectedExhibitor.company_name
        )
    );


    setText(
        "selectedCategory",
        selectedExhibitor.category
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
        `${sqft} sq ft`
    );


    setText(
        "selectedDescription",
        selectedExhibitor.description
    );


    const targeted =
        isTargeted(
            selectedExhibitor.booth_number
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

                <b>×</b>
            `

            :

            `
                <span>
                    Add to Northstar Targets
                </span>

                <b>+</b>
            `;

    }


    const profileLink =
        document.getElementById(
            "selectedProfileLink"
        );


    if (profileLink) {

        profileLink.href =
            `exhibitors.html?id=${
                encodeURIComponent(
                    selectedExhibitor.id
                )
            }`;

    }


    const interactionLink =
        document.getElementById(
            "selectedInteractionLink"
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


                const exhibitor =
                    getExhibitorByBooth(
                        boothNumber
                    );


                const company =
                    exhibitor?.company_name ||
                    "";


                const category =
                    exhibitor?.category ||
                    "";


                const text =
                    `${company} ${boothNumber} ${category}`
                        .toLowerCase();


                const matchesSearch =
                    !search ||
                    text.includes(search);


                const matchesCategory =
                    !categoryFilter ||
                    category ===
                    categoryFilter;


                const targeted =
                    isTargeted(
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

        return JSON.parse(

            localStorage.getItem(
                "northstar_apta_targets"
            )

            || "[]"

        );

    }

    catch (error) {

        console.error(
            "Target storage error:",
            error
        );


        return [];

    }

}



function isTargeted(
    boothNumber
) {

    const exhibitor =
        getExhibitorByBooth(
            boothNumber
        );


    const id =
        exhibitor?.id ||
        boothNumber;


    return getTargets().some(
        target =>
            String(
                target.exhibitor_id
            )
            ===
            String(id)
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
                )
                ===
                String(
                    selectedExhibitor.id
                )
        );


    if (index >= 0) {

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


    localStorage.setItem(
        "northstar_apta_targets",
        JSON.stringify(
            targets
        )
    );


    updateSelectedPanel();

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

                        ...exhibitor,

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


    if (!route.length) {

        container.innerHTML = `

            <div class="route-empty">

                No mapped Northstar targets yet.

            </div>

        `;


        return;

    }


    route.forEach(
        (
            exhibitor,
            index
        ) => {

            const item =
                document.createElement(
                    "button"
                );


            item.type =
                "button";


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


                <span class="route-copy">

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

                    </span>

                </span>


                <span class="route-arrow">
                    →
                </span>

            `;


            item.addEventListener(
                "click",
                () => {

                    selectBooth(
                        exhibitor.booth_number
                    );


                    scrollToBooth(
                        exhibitor.booth_number
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
    layout,
    exhibitor,
    event
) {

    const widthFeet =
        layout.width *
        FLOOR_CONFIG.unitFeet;


    const depthFeet =
        layout.depth *
        FLOOR_CONFIG.unitFeet;


    const sqft =
        widthFeet *
        depthFeet;


    setText(
        "tooltipStatus",

        isTargeted(
            layout.booth_number
        )

        ?

        "NORTHSTAR TARGET"

        :

        "APTA EXHIBITOR"
    );


    setText(
        "tooltipCompany",

        exhibitor?.company_name ||
        `Booth ${layout.booth_number}`
    );


    setText(
        "tooltipBooth",

        `Booth ${layout.booth_number}`
    );


    setText(
        "tooltipSize",

        `${widthFeet}' × ${depthFeet}' · ${sqft} sq ft`
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
        APTA_FLOOR_LAYOUT.length
    );


    const targets =
        APTA_FLOOR_LAYOUT.filter(
            layout =>
                isTargeted(
                    layout.booth_number
                )
        ).length;


    setText(
        "mapTargetCount",
        targets
    );


    setText(
        "mapVisibleCount",
        APTA_FLOOR_LAYOUT.length
    );

}



/* =========================================================
   RESET
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
   URL SELECTION
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


    const exhibitor =
        exhibitors.find(
            item =>
                String(
                    item.id
                )
                ===
                String(id)
        );


    if (!exhibitor) {
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
        50
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
                    `${APTA_FLOOR_LAYOUT.length} mapped booths · Interactive floor ready`;

            },
            3000
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



function getInitial(
    company
) {

    return (
        company
            ?.trim()
            ?.charAt(0)
            ?.toUpperCase()
        ||
        "?"
    );

}



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



function generateId() {

    if (
        window.crypto &&
        crypto.randomUUID
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
