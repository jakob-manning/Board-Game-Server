import {v4} from "https://deno.land/std/uuid/mod.ts";
import actionCards from "../../gamePieces/actionCards.ts";
import {possibleItems} from "../../gamePieces/itemCards.ts";
import {gameInterface, roleInterface} from "../../interfaces/gameState.ts";

const games: gameInterface[] = [
    {
        id: v4.generate(),
        tableName: "Game1",
        password: "funfunfun",
        players: [],
        roles: [
            {
                title: "human",
                count: 2
            },
            {
                title: "alien",
                count: 1
            }
        ],
        actionCards: [...actionCards],
        possibleItems: [...possibleItems]
    }
]

const roles: roleInterface[] = [
    {
        title: "human",
        count: 2
    },
    {
        title: "alien",
        count: 1
    }
]


export default games