const goal = 25;

var running = false;
var count = 0;
var needO = true;

var timerInterval

function beginTimer(){
	var start = new Date;

	timerInterval = setInterval(function() {
	    $('#timer').text((new Date - start) / 1000);
	}, 1);
}

function incrementOK(){
	count += 1;
	$('#count').text(count);
}

function endGame(outcome){
	$('#times').html("<span class='" + outcome + "'>" + $('#timer').html() + "</span><br/>" + $('#times').html());
	clearInterval(timerInterval);
	running = false;
	needO = true;
}

function winGame(){
	$('#count').addClass('win');
	$('#timer').addClass('win');
	$('#message').text("YOU WIN! Great job!");
	endGame("win");
}

function loseGame(){
	$('#count').addClass('lose');
	$('#timer').addClass('lose');
	$('#message').text("YOU LOSE! Better luck next time!");
	endGame("lose");
}

$(document).keypress(function(event){
	if(event.which == 111){
		event.preventDefault();
		if(!running){
			$('#count').removeClass();
			$('#timer').removeClass();
			beginTimer()
			count = 0;
			running = true;
		}
		if(!needO && running){
			loseGame();
		}
		else{
			needO = false;
		}
		
	}

	if(event.which == 107){
		event.preventDefault();
		if(running){
			if(needO){
				loseGame();
			}
			else{
				incrementOK();
				needO = true;
			}
			if(count >= goal){
				winGame();
			}
		}
	}
});