var playerId = "";
var oppId = "";
var playerForce = 0;
var oppForce = 0;
var playerDamage = 0;
var oppDamage = 0;
var waiting = 0;
var chrId = 0;
var starWars = {

    chrNames: ["CP3O", "VADER", "LUKE", "DARTH MAUL"],
    lifeForce: [100, 120, 150, 180],
    damage: [5, 15, 8, 25],

    champDef: function(event) {




        if ($("#champion").children().length === 0) {


            $('#champion').append(event.currentTarget);

            playerId = $("#champion").children().eq(0).data("chr-number");

            $("#chr" + playerId).prop("disabled", true);

            $("#results").html("<h1 class = 'panmsg'>Now Please Choose Your Defender</h1>");

            $("#panel-champ").html("Champion : " + starWars.chrNames[playerId]);

        } else {

            $("#defender").append(event.currentTarget);

            oppId = $("#defender").children().eq(0).data("chr-number");

            $("#panel-defender").html("Defender : " + starWars.chrNames[oppId]);

            $("#chr" + oppId).prop("disabled", true);

            $("#results").html("<h1 class = 'panmsg'>Lets Get Ready To Rumble!</h1><p><h5>Click The Attack Button To Begin Match</h5></p>");

            $("#panel-label").text(" Next Up");

            waiting = $("#yourChr").children().size();

            for (i = 0; i < waiting; i++) {

                $("#yourChr").children().eq(i).prop("disabled", true);

            }

            $(".attack").prop("disabled", false);

        }

    },

    setStage: function() {

        for (i = 0; i < 4; i++) {



            $("#yourChr").append("<button type='button' id='chr" + i + "' class='chr' data-chr-number='" + i + "' data-chr-lifeforce='" + starWars.lifeForce[i] + "' data-chr-damage='" + starWars.damage[i] + "' data-alive='true'><img src='assets/images/chr" + i + ".png' class='characters' id='chr" + i + "'><br>" + starWars.chrNames[i] + "<br><span id='lf" + i + "'>" + starWars.lifeForce[i] + "</span></button>");

        }

        $(".attack").data("action", "attack");
        $("#results").html("<h1 class = 'panmsg'>Please Choose Your Champion</h1>");
        $(".attack").prop("disabled", true);

    },



    battle: function() {



        playerForce = $("#champion").children().eq(0).data("chr-lifeforce");

        console.log("In Battle =" + playerForce);

        playerDamage = $("#champion").children().eq(0).data("chr-damage");

        oppForce = $("#defender").children().eq(0).data("chr-lifeforce");
        oppDamage = $("#defender").children().eq(0).data("chr-damage");

        playerForce -= oppDamage;
        oppForce -= playerDamage;

        $("#champion").children().eq(0).data("chr-lifeforce", playerForce);

        $("#defender").children().eq(0).data("chr-lifeforce", oppForce);



        if (playerForce < 1) {

            starWars.fightResult();

            $("#champion").children().eq(0).data("alive", false);




            starWars.endOfGame();



            return;
        }

        if (oppForce < 1) {

            starWars.fightResult();

            $("#defender").children().eq(0).data("alive", false);
            $("#defender").children().eq(0).prop("disabled", true);

            if ($("#yourChr").children().size() > 0) {

                $(".attack").data("action", "next");

                starWars.winGame();
            } else {

                $("#results").html("<h1 class = 'panmsg'>You Won Them All!!</h1><p><h5>Please click Restart button to play again</h5></p>");
                $(".attack").text("Restart");
                $(".attack").data("action", "restart");

            }


            return;

        }


    },

    fightResult: function() {

        if ($("#champion").children().eq(0).data("alive") && $("#defender").children().eq(0).data("alive")) {

            $("#results").html("<h4 class = 'panmsg'>You attacked " + starWars.chrNames[oppId] + " with a force of " + $("#champion").children().eq(0).data("chr-damage") + " and " + starWars.chrNames[oppId] + " attacked you back with a force of " + starWars.damage[oppId] + "</h4></p>");

            $("#lf" + playerId).text(playerForce);

            $("#lf" + oppId).text(oppForce);



        }

    },

    champDamage: function() {


        if ($("#champion").children().eq(0).data("alive")) {

            playerDamage = (playerDamage * 2);

            $("#champion").children().eq(0).data("chr-damage", playerDamage);
        }

    },

    winGame: function() {

        $("#results").html("<h1 class = 'panmsg'>You Won!</h1><p><h5>Please click Next button to fight again</h5></p>");
        $(".attack").text("Next");



    },

    endOfGame: function() {

        $("#results").html("<h1 class = 'panmsg'>Sorry You Lost!</h1><p><h5>Please click Restart button to play again</h5></p>");
        $(".attack").text("Restart");
        $(".attack").data("action", "restart");


        return;




    },

    reStartGame: function() {


        $("#lostChar").children().show();
        $("#lostChar").children().detach().prependTo("#yourChr");
        $("#champion").children().detach().prependTo("#yourChr");
        $("#defender").children().detach().prependTo("#yourChr");

        $("#yourChr").children().css("background", "#eee");
        $("#yourChr").children().prop("disabled", false);




        $("#panel-champ").html("");
        $("#panel-defender").html("");


        waiting = $("#yourChr").children().size();

        for (i = 0; i < waiting; i++) {

            charId = parseInt($("#yourChr").children().eq(i).data("chr-number"));
            console.log(charId);

            $("#yourChr").children().eq(i).data("chr-lifeforce", starWars.lifeForce[charId]);
            $("#yourChr").children().eq(i).data("chr-damage", starWars.damage[charId]);
            $("#yourChr").children().eq(i).data("alive", true);
            $("#lf" + charId).text(starWars.lifeForce[charId]);
            $("#results").html("<h1 class = 'panmsg'>Please Choose Your Champion</h1>");




        }




    },

}


starWars.setStage();

$("#results").html("<h1 class = 'panmsg'>Please Choose Your Champion</h1>");

$(".attack").prop("disabled", true);


// Javascript function that wraps everything




$(document).ready(function() {


    $(".chr").on("click", function(event) {

        console.log("working");
        starWars.champDef(event);


    });


    $(".attack").on("click", function() {


        if ($(".attack").data("action") === "restart") {


            starWars.reStartGame();



            $(".attack").data("action", "attack");

            $(".attack").text("Attack");

            $(".attack").prop("disabled", true);


            return;
        }

        if ($(".attack").data("action") === "next") {


            $("#defender").children().detach().prependTo("#lostChar");;
            $("#lostChar").children().hide();

            $("#yourChr").children().prop("disabled", false);

            $("#panel-defender").html("");

            $(".attack").data("action", "attack")

            $(".attack").text("Attack");

            $(".attack").prop("disabled", true);


            return;
        }

        // if (!$("#champion").children().eq(0).data("alive") && $("#champion").children().size() > 0) {

        // starWars.endOfGame();

        //return;
        //}


        if ($(".attack").data("action", "attack")) {

            starWars.battle();

        }



        starWars.fightResult();

        starWars.champDamage();


    });


});