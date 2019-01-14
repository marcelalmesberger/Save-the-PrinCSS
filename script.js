//GLOBAL VARIABLES

//creating Objects
function fighter(name, lifeEnergy) {
    this.name = name;
    this.life = lifeEnergy;
}
var player = new fighter("Player", 10);
var dragon = new fighter("Dragon", 10);

//other global variables
var turnOutcome;
var damage;

//FUNCTIONS

//displays the current round of the fight
function roundCounter(value) {
    console.log("ROUND " + (value + 1));
    $("#htmlconsole").append("ROUND " + (value + 1) + "<br>");
}

//displays a message in the html file and the console
function displayMessage (text) {
    console.log(text);
    $("#htmlconsole").append(text + "<br>");
}

//creates a random number between "2" and "6"
function diceRoll () {
    return Math.floor(Math.random() * 5 + 2);
}

//rolls the dice for player and dragon 3x, generates points and compares them
function dicePhase () {
    
    // Local Variables
    var playerDice;
    var dragonDice;

    var playerPoints = 0;
    var dragonPoints = 0;

    //rolls dice for Player and Dragon 3x, Addition of points
    for (var i = 0; i < 3; i++) {
        playerDice = diceRoll();
        dragonDice = diceRoll();

        if (playerDice > dragonDice) {
            playerPoints += 3;
        }
        else if (playerDice < dragonDice) {
            dragonPoints += 3;
        } 
        else if (playerDice === dragonDice) {
            playerPoints++;
            dragonPoints++;
        }
    }
    //Comparing Points
    if (playerPoints > dragonPoints) {
        if ((playerPoints - dragonPoints) >= 6) {
            displayMessage("Player wins the round. Dragon loses 3 HP.");
            return 2;
        }
        else {
            displayMessage("Player wins the round. Dragon loses 1 HP.");
            return 1;
        }
    } 
    else if (playerPoints < dragonPoints) {
        if (dragonPoints - playerPoints >= 6) {
            displayMessage("Dragon wins the round. Player loses 3 HP.");
            return -2;
        }
        else {
            displayMessage("Dragon wins the round. Player loses 1 HP.");
            return -1;
        }
    } 
    else if (playerPoints === dragonPoints) {
        displayMessage("Draw - No one wins the round. Nobody loses HP.");
        return 0;
    }
}

//generates the specific damage dependent of the points gathered in one round
function generateDamage (turnValue) {
    var dmg;
    if (turnValue === 2 || turnValue === -2) { // = Winner with 6 points difference
        dmg = 3;
    }
    else if (turnValue === 1 || turnValue === -1) { // = Winner
        dmg = 1;
    }
    else if (turnValue === 0) { // = No Winner
        dmg = 0;
    }
    return dmg;
} 

//substracts the specific damage from the HP
function damagePhase (turnValue, dmg) {
    if (turnValue === -2 || turnValue === -1) { // = Dragon wins
        player.life -= dmg;
        if (player.life < 0) {
            player.life = 0;
        }
    }
    else if (turnValue === 2 || turnValue === 1) { // = Player wins
        dragon.life -= dmg;
        if (dragon.life < 0) {
            dragon.life = 0;
        }
    }
    else if (turnValue === 0) { // = Nobody winns
        player.life -= dmg;
        dragon.life -= dmg;
    }
}

//loops the game till the life of the player or the dragon is 0
function fightLoop() {
    var i = 0;
    while (player.life > 0 || dragon.life > 0) {
        
        //Round Counter
        roundCounter(i);
        i++; 

        //Fighter's current lives
        displayMessage("Player's HP: " + player.life);
        displayMessage("Dragon's HP: " + dragon.life);     
        
        //Battle Phase
        turnOutcome = dicePhase();
        damage = generateDamage(turnOutcome);
        damagePhase(turnOutcome, damage);

        //Ending the game
        if (dragon.life === 0) {
            
            //End Stats
            roundCounter(i);
            displayMessage("Player's HP: " + player.life);
            displayMessage("Dragon's HP: " + dragon.life);  
            
            //End Message
            displayMessage("Great! You have defeated the dragon! Now you can save the princess.")
            break;
        }
        else if (player.life === 0) {
            
            //End Stats
            roundCounter(i);
            displayMessage("Player's HP: " + player.life);
            displayMessage("Dragon's HP: " + dragon.life);  
            
            //End Message
            displayMessage("You have been defeated by the dragon! You can no longer save the princess because you are DEAD.")
            break;
        }   
    }
}  

// PROGRAM EXECUTION
$(
    function() {
        fightLoop();
    }
);



