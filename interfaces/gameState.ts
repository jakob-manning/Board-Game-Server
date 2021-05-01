import {cardInterface, itemInterface} from "./gamePieces.ts";

export interface roleInterface {
    title: string,
    count: number
}

export interface playerInterface {
    name: string,
    role: string
}

export interface gameInterface {
            id: string,
            tableName: string,
            password: string,
            players: playerInterface[],
            roles: roleInterface[],
            actionCards: cardInterface[],
            possibleItems: itemInterface[]
}