import { v4 } from "https://deno.land/std/uuid/mod.ts";
import Random from "https://deno.land/x/random@v1.1.2/Random.js"

import actionCards from "../gamePieces/actionCards.ts"
import {possibleItems} from "../gamePieces/itemCards.ts";

export default {
    /**
     * @description Get all cards
     * @route GET /allCards
     */

    getAllCards: ({ response }: { response: any }) => {
        response.status = 200;
        response.body = {
            success: true,
            data: actionCards,
        };
    },

    getAllItems: ({ response }: { response: any }) => {
        response.status = 200;
        response.body = {
            success: true,
            data: possibleItems,
        };
    },

    randomCard: ({ response }: { response: any }) => {
        const r = new Random();
        const weights = actionCards.map( item => item.weight)
        const index = r.weighted(...weights)
        const selectedCard = actionCards[index]

        if(selectedCard.title === "Silence"){
            // First check if the card should get an item
            const itemCheck = r.int(0, 23)
            if(itemCheck >=6) {
                // Then pick an item and attach it to the card
                const itemWeights = possibleItems.map(item => item.weight)
                const itemIndex = r.weighted(...itemWeights)
                selectedCard.item = possibleItems[itemIndex]
            }
        }

        response.status = 200;
        response.body = {
            success: true,
            card: selectedCard,
        };
    },
};
