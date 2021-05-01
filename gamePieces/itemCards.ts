import {itemInterface} from "../interfaces/gamePieces.ts";

export const possibleItems: itemInterface[] = [
    {
        title: "Attack",
        description: "Attack, using the same rules as the aliens.",
        weight: 2
    },
    {
        title: "Defence",
        description: "Play this card immediately when an Alien attacks you. You are NOT AFFECTED BY THE ATTACK.",
        weight: 1
    },
    {
        title: "Teleport",
        description: "Move directly to the Human Sector. This is in addition to your normal movement which can happen before or after you use the item.",
        weight: 1
    },

    {
        title: "Sensor",
        description: "Play on another player. That player must immediately announce their exact location. This card affects both Humans and Aliens.",
        weight: 1
    },
    {
        title: "Mutation", description: "Use to transform into an Alien.",
        weight: 1
    },
    {
        title: "Clone",
        description: "Play when an Alien attacks you. Discard your items and begin your next turn in the Human Sector.",
        weight: 1
    },
    {
        title: "Sedatives",
        description: "Do not draw a Dangerous Sector Card this turn. Play at the beginning of your turn",
        weight: 3
    },
    {
        title: "Cat",
        description: "Declare noise in two different sectors.",
        weight: 3
    },
    {
        title: "Spotlight",
        description: "Name a Sector. Players in that Sector or any of the six adjacent must announce their location.",
        weight: 2
    },
    {
        title: "Adrenaline",
        description: "Move one extra sector this turn.",
        weight: 3
    },
]