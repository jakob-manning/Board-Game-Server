import games from "./alienGameDatabase.ts";
import {gameInterface, playerInterface} from "../../interfaces/gameState.ts";
import Random from "https://deno.land/x/random@v1.1.2/Random.js"

export default {
    findGameByID(gameID: string){
      const requestedGame = games.find(game => game.id === gameID)
      if(!requestedGame){
          throw new Error("unable to find a table with that name!")
      }
      return requestedGame
    },

    findGameByTableName(tableName: string){
        const requestedGame = games.find(game => game.tableName === tableName)
        if(!requestedGame){
            throw new Error("unable to find a table with that name. Have you tried spelling it correctly?")
        }
        return requestedGame
    },

    drawARole(requestedGame: gameInterface){
        // Check if roles are empty
        const rolesRemaining = requestedGame.roles.filter(role => role.count > 0)

        if(rolesRemaining.length === 0){
            throw new Error("Unable to assign a role - no roles left. Either that or your friends don't want to play with you.")
        }

        console.log(rolesRemaining)

        // decrement role counter and assign role
        const r = new Random();
        const weights = rolesRemaining.map(item => item.count)
        const index = r.weighted(...weights)
        const selectedRole = {...rolesRemaining[index]}
        requestedGame.roles[index].count -= 1

        // hide role count before passing back to player
        selectedRole.count = 1

        return selectedRole
    },

    addPlayer(playerName: string, gameID: string) {

        // get game in question
        const requestedGame = this.findGameByID(gameID)

        // Check that player isn't already in this game
        const playerCheck = requestedGame.players.find(player => player.name === playerName)
        if(playerCheck != undefined){
            throw new Error("Unable to add player, player name is already in the game! Please try to be more creative.")
        }

        // Draw a new role
        const newRole = this.drawARole(requestedGame)
        const player:playerInterface = {
            name: playerName,
            role: newRole.title
        }
        requestedGame.players.push(player)

        return player
    },

    authenticateRequest(tableName:string, password: string = "blank"){
        const requestedGame = this.findGameByTableName(tableName)

        // Confirm password matches
        if(requestedGame.password != password){
            throw new Error("The password you provided was shit, please try again.")
        }

        return requestedGame.id

    }
}