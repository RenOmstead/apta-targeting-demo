/* =========================================================
   APTA 2026 FLOOR DATA
   RECONSTRUCTED FLOOR PLAN

   Base unit:
   1 grid unit = 10 physical feet

   IMPORTANT:
   Booth numbers/company associations come from the public
   APTA 2026 exhibitor directory.

   Exact floor coordinates are maintained separately from
   exhibitor/company information so they can be refined
   without rewriting the application.
   ========================================================= */


const FLOOR_CONFIG = {

    unitFeet: 10,

    unitPixels: 34,

    widthUnits: 48,

    heightUnits: 39

};



/* =========================================================
   FLOOR SECTIONS

   These create the visual footprint of the expo hall.
   They are not booths.
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

   Coordinates use the same 10-foot grid.
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
   BOOTH GEOMETRY

   x, y, width and depth are GRID UNITS.

   1 unit = 10 feet.

   Known measurements from the official hover information:

   3186 = 10 × 10
   4279 = 10 × 10
   4614 = 30 × 10

   We'll continue refining this dataset against the
   official floor-plan reference.

   The application itself no longer needs to change when
   coordinates are updated.
   ========================================================= */

const APTA_FLOOR_LAYOUT = [

    /* -----------------------------------------------------
       3100 AREA
       ----------------------------------------------------- */

    {
        booth_number: "3181",
        x: 15,
        y: 5,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3182",
        x: 16,
        y: 5,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3185",
        x: 17,
        y: 5,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3186",
        x: 18,
        y: 5,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3175",
        x: 14,
        y: 6,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3176",
        x: 15,
        y: 6,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3100",
        x: 19,
        y: 3,
        width: 4,
        depth: 3
    },

    {
        booth_number: "3103",
        x: 23,
        y: 4,
        width: 2,
        depth: 2
    },

    {
        booth_number: "3106",
        x: 25,
        y: 5,
        width: 2,
        depth: 1
    },



    /* -----------------------------------------------------
       3400 AREA
       ----------------------------------------------------- */

    {
        booth_number: "3402",
        x: 19,
        y: 12,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3405",
        x: 20,
        y: 12,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3406",
        x: 21,
        y: 12,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3408",
        x: 22,
        y: 12,
        width: 1,
        depth: 1
    },

    {
        booth_number: "3420",
        x: 24,
        y: 12,
        width: 3,
        depth: 2
    },

    {
        booth_number: "3425",
        x: 27,
        y: 12,
        width: 2,
        depth: 1
    },



    /* -----------------------------------------------------
       4200 AREA
       ----------------------------------------------------- */

    {
        booth_number: "4210",
        x: 30,
        y: 19,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4212",
        x: 31,
        y: 19,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4217",
        x: 32,
        y: 19,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4220",
        x: 33,
        y: 19,
        width: 2,
        depth: 1
    },

    {
        booth_number: "4231",
        x: 35,
        y: 19,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4234",
        x: 36,
        y: 19,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4237",
        x: 37,
        y: 19,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4239",
        x: 38,
        y: 19,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4252",
        x: 32,
        y: 21,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4255",
        x: 33,
        y: 21,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4257",
        x: 34,
        y: 21,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4261",
        x: 35,
        y: 21,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4264",
        x: 36,
        y: 21,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4267",
        x: 37,
        y: 21,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4269",
        x: 38,
        y: 21,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4274",
        x: 31,
        y: 23,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4275",
        x: 32,
        y: 23,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4277",
        x: 33,
        y: 23,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4279",
        x: 34,
        y: 23,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4281",
        x: 35,
        y: 23,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4285",
        x: 36,
        y: 23,
        width: 1,
        depth: 1
    },



    /* -----------------------------------------------------
       4600 AREA
       ----------------------------------------------------- */

    {
        booth_number: "4606",
        x: 32,
        y: 32,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4607",
        x: 33,
        y: 32,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4608",
        x: 34,
        y: 32,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4610",
        x: 35,
        y: 32,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4612",
        x: 36,
        y: 32,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4614",
        x: 37,
        y: 32,

        /* verified 30 × 10 */
        width: 3,
        depth: 1
    },

    {
        booth_number: "4617",
        x: 40,
        y: 32,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4620",
        x: 33,
        y: 34,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4622",
        x: 34,
        y: 34,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4624",
        x: 35,
        y: 34,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4625",
        x: 36,
        y: 34,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4627",
        x: 37,
        y: 34,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4628",
        x: 38,
        y: 34,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4631",
        x: 39,
        y: 34,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4632",
        x: 40,
        y: 34,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4636",
        x: 33,
        y: 36,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4638",
        x: 34,
        y: 36,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4642",
        x: 35,
        y: 36,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4644",
        x: 36,
        y: 36,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4646",
        x: 37,
        y: 36,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4647",
        x: 38,
        y: 36,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4648",
        x: 39,
        y: 36,
        width: 1,
        depth: 1
    },

    {
        booth_number: "4649",
        x: 40,
        y: 36,
        width: 1,
        depth: 1
    }

];
