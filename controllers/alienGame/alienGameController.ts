import {v4} from "https://deno.land/std/uuid/mod.ts";
import Random from "https://deno.land/x/random@v1.1.2/Random.js"
import actionCards from "../../gamePieces/actionCards.ts";
import {possibleItems} from "../../gamePieces/itemCards.ts";
import databaseActions from "../../database/alienGame/databaseActions.ts";
import {playerInterface} from "../../interfaces/gameState.ts";
import games from "../../database/alienGame/alienGameDatabase.ts";

export default {

    getAllGames: ({response}: { response: any }) => {
        response.status = 200;
        response.body = {
            success: true,
            data: games,
        };
    },


    createAGame: async ({request, response}: { request: any; response: any },) => {
        // check if the request has a body
        if (!request.hasBody) {
            response.status = 400;
            response.body = {
                success: false,
                message: "No data provided",
            };
            return;
        }

        const body = await request.body().value;

        console.log(body)

        // Do some ad-hoc data validation here
        if (!body.tableName || !body.humanCount || !body.alienCount || !(body.humanCount >= 0) || !(body.alienCount >= 0)) {
            console.log("error found in request body")

            response.status = 400;
            response.body = {
                success: false,
                message: "Request incomplete",
            };
            return;
        }

        // Check that tableName is unique
        if (games.filter(game => game.tableName === body.tableName).length > 0) {
            response.status = 403;
            response.body = {
                success: false,
                message: "Table already exists, please try a different table name.",
            };
            return;
        }

        let password = body.password
        if (!password) {
            password = "blank"
        }

        // if everything is fine then create a new game
        // and return the entire game state
        let newGame = {
            id: v4.generate(),
            tableName: body.tableName,
            password: password,
            players: [],
            roles: [
                {
                    title: "human",
                    count: parseInt(body.humanCount)
                },
                {
                    title: "alien",
                    count: parseInt(body.alienCount)
                }
            ],
            actionCards: actionCards.map(card => ({...card})),
            possibleItems: possibleItems.map(item => ({...item})),
        };
        games.push(newGame)
        response.body = {
            success: true,
            data: games,
        };
    },

    joinAGame: async ({request, response}: { request: any; response: any },) => {
        // check if the request has a body
        if (!request.hasBody) {
            response.status = 400;
            response.body = {
                success: false,
                message: "No data provided",
            };
            return;
        }

        // Get request body
        const body = await request.body().value;
        console.log(body)


        // Rudimentary data validation
        if (!body.playerName || !body.tableName) {
            console.log("error found in request body")

            response.status = 400;
            response.body = {
                success: false,
                message: "Request incomplete, please provide a Player Name and Table Name",
            };
            return;
        }

        // Find the table
        let tableID: string
        try {
            tableID = databaseActions.authenticateRequest(body.tableName, body.password)
        } catch (e) {
            response.status = 400;
            response.body = {
                success: false,
                message: e.message,
            };
            return
        }

        // add the player
        let player: playerInterface
        try {
            player = databaseActions.addPlayer(body.playerName, tableID)
        } catch (e) {
            response.status = 400;
            response.body = {
                success: false,
                message: e.message,
            };
            return
        }

        // return the updated player object as confirmation that they have been added to the game
        response.status = 200;
        response.body = {
            success: true,
            data: player,
        };
    },

};
