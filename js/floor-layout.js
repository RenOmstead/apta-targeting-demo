/* =========================================================
   APTA 2026 FLOOR LAYOUT
   NORTHSTAR TRANSIT SOLUTIONS PORTFOLIO DEMO

   PURPOSE
   ---------------------------------------------------------
   This file contains booth geometry only.

   Exhibitor/company data comes from:
   js/exhibitor-data.js

   IMPORTANT
   ---------------------------------------------------------
   - 1 layout unit = 10 physical feet
   - Known verified booth dimensions are preserved:
       3186 = 10' x 10'
       4279 = 10' x 10'
       4614 = 30' x 10'
   - Other booths are arranged automatically into a dense
     reconstructed floor so every published booth can appear.
   - This is a portfolio reconstruction, not the official
     APTA floor-plan geometry.
   ========================================================= */


/* =========================================================
   CONFIG
   ========================================================= */

const FLOOR_LAYOUT_CONFIG = {

    unitFeet: 10,

    /*
       Total virtual floor size.

       map.js currently uses 48 x 39.
       We use that same coordinate system here.
    */

    widthUnits: 48,

    heightUnits: 39,


    /*
       Leave space around the outside.
    */

    marginX: 2,

    marginY: 2,


    /*
       Main aisle widths in 10-foot units.
    */

    verticalAisleWidth: 2,

    horizontalAisleHeight: 2

};


/* =========================================================
   VERIFIED BOOTH DIMENSIONS

   These came from the APTA hover information you provided.
   ========================================================= */

const VERIFIED_BOOTH_SIZES = {

    "3186": {
        width: 1,
        depth: 1
    },

    "4279": {
        width: 1,
        depth: 1
    },

    "4614": {
        width: 3,
        depth: 1
    }

};


/* =========================================================
   OPTIONAL KNOWN LARGE-BOOTH OVERRIDES

   These are reconstruction-only visual assumptions.

   They are NOT presented as official booth dimensions.

   You can refine/remove these later.
   ========================================================= */

const RECONSTRUCTED_LARGE_BOOTHS = {

    "3100": {
        width: 4,
        depth: 3
    },

    "3420": {
        width: 3,
        depth: 2
    },

    "1506": {
        width: 4,
        depth: 3
    },

    "1531": {
        width: 5,
        depth: 3
    },

    "1806": {
        width: 4,
        depth: 3
    },

    "2307": {
        width: 3,
        depth: 2
    },

    "2367": {
        width: 3,
        depth: 2
    },

    "2504": {
        width: 4,
        depth: 3
    },

    "2700": {
        width: 4,
        depth: 3
    },

    "2875": {
        width: 4,
        depth: 3
    },

    "1031": {
        width: 4,
        depth: 3
    },

    "506": {
        width: 4,
        depth: 3
    },

    "425": {
        width: 4,
        depth: 3
    },

    "419": {
        width: 4,
        depth: 3
    },

    "631": {
        width: 3,
        depth: 2
    },

    "659": {
        width: 3,
        depth: 2
    },

    "643": {
        width: 3,
        depth: 2
    },

    "1312": {
        width: 3,
        depth: 2
    },

    "1013": {
        width: 3,
        depth: 2
    },

    "1317": {
        width: 3,
        depth: 2
    },

    "1537": {
        width: 3,
        depth: 2
    },

    "2012": {
        width: 3,
        depth: 2
    },

    "2231": {
        width: 3,
        depth: 2
    },

    "2446": {
        width: 3,
        depth: 2
    },

    "2820": {
        width: 3,
        depth: 2
    },

    "2875": {
        width: 4,
        depth: 3
    },

    "3020": {
        width: 3,
        depth: 2
    },

    "3208": {
        width: 3,
        depth: 2
    },

    "3431": {
        width: 3,
        depth: 2
    },

    "3551": {
        width: 3,
        depth: 2
    },

    "3567": {
        width: 3,
        depth: 2
    },

    "3685": {
        width: 3,
        depth: 2
    },

    "3785": {
        width: 3,
        depth: 2
    },

    "4043": {
        width: 3,
        depth: 2
    },

    "4122": {
        width: 3,
        depth: 2
    },

    "4220": {
        width: 2,
        depth: 1
    },

    "4288": {
        width: 3,
        depth: 2
    },

    "4352": {
        width: 3,
        depth: 2
    },

    "4485": {
        width: 3,
        depth: 2
    },

    "458": {
        width: 3,
        depth: 2
    },

    "4112": {
        width: 3,
        depth: 2
    }

};


/* =========================================================
   SPECIAL NON-EXHIBITOR / FEATURE AREAS

   These exist in the published directory and are useful
   to keep visible on the reconstructed floor.
   ========================================================= */

const SPECIAL_AREA_SIZES = {

    "2846": {
        width: 4,
        depth: 3
    },

    "2656": {
        width: 3,
        depth: 2
    },

    "3256": {
        width: 3,
        depth: 2
    },

    "3238": {
        width: 3,
        depth: 2
    },

    "1785": {
        width: 3,
        depth: 2
    },

    "4785": {
        width: 4,
        depth: 3
    },

    "2638": {
        width: 3,
        depth: 2
    },

    "2731": {
        width: 2,
        depth: 2
    },

    "3700": {
        width: 4,
        depth: 3
    },

    "4624": {
        width: 3,
        depth: 2
    }

};


/* =========================================================
   GET UNIQUE BOOTH NUMBERS FROM SHARED EXHIBITOR DATA
   ========================================================= */

function getUniqueBoothNumbers() {

    if (
        !window.APTA_EXHIBITORS ||
        !Array.isArray(
            window.APTA_EXHIBITORS
        )
    ) {

        console.error(
            "floor-layout.js could not find window.APTA_EXHIBITORS."
        );

        return [];

    }


    const boothNumbers =
        window.APTA_EXHIBITORS

            .map(
                exhibitor =>
                    String(
                        exhibitor.booth_number || ""
                    )
                    .trim()
            )

            .filter(Boolean);


    return [
        ...new Set(
            boothNumbers
        )
    ];

}


/* =========================================================
   BOOTH NUMBER SORT
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
   GET BOOTH DIMENSIONS
   ========================================================= */

function getBoothDimensions(
    boothNumber
) {

    /*
       1. Verified official hover dimensions
    */

    if (
        VERIFIED_BOOTH_SIZES[
            boothNumber
        ]
    ) {

        return {
            ...VERIFIED_BOOTH_SIZES[
                boothNumber
            ]
        };

    }


    /*
       2. Special event areas
    */

    if (
        SPECIAL_AREA_SIZES[
            boothNumber
        ]
    ) {

        return {
            ...SPECIAL_AREA_SIZES[
                boothNumber
            ]
        };

    }


    /*
       3. Reconstruction-only large booth assumptions
    */

    if (
        RECONSTRUCTED_LARGE_BOOTHS[
            boothNumber
        ]
    ) {

        return {
            ...RECONSTRUCTED_LARGE_BOOTHS[
                boothNumber
            ]
        };

    }


    /*
       4. Default booth module
    */

    return {

        width: 1,

        depth: 1

    };

}


/* =========================================================
   GROUP BOOTHS BY NUMBER RANGE

   This creates visual neighborhoods similar to an expo hall.

   Example:
   425 -> 0-series block
   1506 -> 1000-series block
   3420 -> 3000-series block
   4614 -> 4000-series block
   ========================================================= */

function getBoothGroup(
    boothNumber
) {

    const number =
        parseInt(
            String(
                boothNumber
            )
                .replace(
                    /\D/g,
                    ""
                ),
            10
        );


    if (
        Number.isNaN(
            number
        )
    ) {

        return 5;

    }


    if (
        number <
        1000
    ) {

        return 0;

    }


    if (
        number <
        2000
    ) {

        return 1;

    }


    if (
        number <
        3000
    ) {

        return 2;

    }


    if (
        number <
        4000
    ) {

        return 3;

    }


    return 4;

}


/* =========================================================
   FLOOR REGIONS

   These divide the 48 x 39 map into five major booth areas.
   ========================================================= */

const FLOOR_REGIONS = {

    0: {
        x: 2,
        y: 2,
        width: 13,
        height: 15
    },

    1: {
        x: 17,
        y: 2,
        width: 13,
        height: 15
    },

    2: {
        x: 32,
        y: 2,
        width: 13,
        height: 15
    },

    3: {
        x: 2,
        y: 21,
        width: 20,
        height: 15
    },

    4: {
        x: 25,
        y: 21,
        width: 20,
        height: 15
    },

    5: {
        x: 2,
        y: 2,
        width: 43,
        height: 34
    }

};


/* =========================================================
   PLACE BOOTHS INTO A REGION

   Uses a shelf-packing approach:
   left-to-right, then next row.

   This prevents overlaps for variable-size booths.
   ========================================================= */

function packBoothsIntoRegion(
    boothNumbers,
    region
) {

    const result =
        [];


    let cursorX =
        region.x;


    let cursorY =
        region.y;


    let rowDepth =
        1;


    const maxX =
        region.x +
        region.width;


    const maxY =
        region.y +
        region.height;


    boothNumbers.forEach(
        boothNumber => {

            const dimensions =
                getBoothDimensions(
                    boothNumber
                );


            /*
               New row if current booth would overflow.
            */

            if (
                cursorX +
                dimensions.width >
                maxX
            ) {

                cursorX =
                    region.x;


                cursorY +=
                    rowDepth +
                    1;


                rowDepth =
                    1;

            }


            /*
               If we run out of vertical room, continue
               beneath the nominal region instead of dropping
               exhibitors entirely.

               This keeps all booths visible.
            */

            if (
                cursorY +
                dimensions.depth >
                maxY
            ) {

                cursorY =
                    maxY +
                    Math.floor(
                        result.length /
                        Math.max(
                            region.width,
                            1
                        )
                    );


                cursorX =
                    region.x;

            }


            result.push({

                booth_number:
                    boothNumber,

                x:
                    cursorX,

                y:
                    cursorY,

                width:
                    dimensions.width,

                depth:
                    dimensions.depth

            });


            cursorX +=
                dimensions.width +
                1;


            rowDepth =
                Math.max(
                    rowDepth,
                    dimensions.depth
                );

        }
    );


    return result;

}


/* =========================================================
   BUILD FULL FLOOR LAYOUT
   ========================================================= */

function buildFloorLayout() {

    const allBoothNumbers =
        getUniqueBoothNumbers()
            .sort(
                compareBoothNumbers
            );


    const grouped = {

        0: [],

        1: [],

        2: [],

        3: [],

        4: [],

        5: []

    };


    allBoothNumbers.forEach(
        boothNumber => {

            const group =
                getBoothGroup(
                    boothNumber
                );


            grouped[
                group
            ].push(
                boothNumber
            );

        }
    );


    let layout =
        [];


    Object
        .keys(
            grouped
        )
        .forEach(
            groupKey => {

                const groupNumber =
                    Number(
                        groupKey
                    );


                if (
                    !grouped[
                        groupNumber
                    ].length
                ) {

                    return;

                }


                const region =
                    FLOOR_REGIONS[
                        groupNumber
                    ]
                    ||
                    FLOOR_REGIONS[5];


                const packed =
                    packBoothsIntoRegion(

                        grouped[
                            groupNumber
                        ],

                        region

                    );


                layout =
                    layout.concat(
                        packed
                    );

            }
        );


    return layout;

}


/* =========================================================
   FORCE VERIFIED / KNOWN ANCHORS

   These override auto-generated positions for the three
   booth examples we have directly verified.

   Positions are reconstruction coordinates.
   Dimensions remain verified.
   ========================================================= */

function applyKnownAnchors(
    layout
) {

    const anchors = {

        "3186": {

            x: 18,

            y: 8,

            width: 1,

            depth: 1

        },


        "4279": {

            x: 34,

            y: 27,

            width: 1,

            depth: 1

        },


        "4614": {

            x: 37,

            y: 32,

            width: 3,

            depth: 1

        }

    };


    return layout.map(
        booth => {

            const anchor =
                anchors[
                    booth.booth_number
                ];


            if (!anchor) {

                return booth;

            }


            return {

                ...booth,

                ...anchor

            };

        }
    );

}


/* =========================================================
   REMOVE EXACT COORDINATE COLLISIONS

   If an anchor happens to overlap an auto-packed booth,
   move the non-anchor booth until its starting cell is free.

   This is intentionally lightweight and is only for the
   reconstructed demo floor.
   ========================================================= */

function removeStartCellCollisions(
    layout
) {

    const occupied =
        new Set();


    const protectedBooths =
        new Set([
            "3186",
            "4279",
            "4614"
        ]);


    /*
       Process anchors first.
    */

    const ordered =
        [...layout]
            .sort(
                (a, b) => {

                    const aProtected =
                        protectedBooths.has(
                            a.booth_number
                        );


                    const bProtected =
                        protectedBooths.has(
                            b.booth_number
                        );


                    if (
                        aProtected &&
                        !bProtected
                    ) {

                        return -1;

                    }


                    if (
                        !aProtected &&
                        bProtected
                    ) {

                        return 1;

                    }


                    return 0;

                }
            );


    ordered.forEach(
        booth => {

            let key =
                `${booth.x}:${booth.y}`;


            if (
                protectedBooths.has(
                    booth.booth_number
                )
            ) {

                occupied.add(
                    key
                );


                return;

            }


            while (
                occupied.has(
                    key
                )
            ) {

                booth.x +=
                    1;


                if (
                    booth.x >=
                    FLOOR_LAYOUT_CONFIG
                        .widthUnits -
                    2
                ) {

                    booth.x =
                        2;


                    booth.y +=
                        1;

                }


                key =
                    `${booth.x}:${booth.y}`;

            }


            occupied.add(
                key
            );

        }
    );


    return ordered;

}


/* =========================================================
   CREATE FINAL SHARED FLOOR DATA
   ========================================================= */

window.APTA_FLOOR_LAYOUT =
    removeStartCellCollisions(

        applyKnownAnchors(

            buildFloorLayout()

        )

    );


/* =========================================================
   OPTIONAL DEBUG INFORMATION
   ========================================================= */

console.log(
    "APTA floor reconstruction loaded:",
    window.APTA_FLOOR_LAYOUT.length,
    "unique booth positions"
);
