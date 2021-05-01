import {cardInterface} from "../interfaces/gamePieces.ts";

const possibleCards: cardInterface[] = [
    {
        title: "Noise in Any Sector",
        description: "You may fake your position, You must announce 'NOISE IN SECTOR [X,Y]' where [X,Y] is the coordinators of any sector you choose.",
        type: "anySector",
        item: null,
        weight:27
    },
    {
        title: "Noise in Your Sector",
        description: "You must announce your location by saying 'NOISE IN SECTOR [X,Y]' where [X,Y] is the coordinators of the Sector you just moved into.",
        type: "yourSector",
        item: null,
        weight:27
    },
    {
        title: "Silence",
        description: "You must announce 'SILENCE IN ALL SECTORS'.",
        type: "silence",
        item: null,
        weight:23
    }]

export default possibleCards