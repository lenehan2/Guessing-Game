$('.status').hide();
$('#Submit').hide();
$('#Restart').hide();
$('.lose').hide();
$('.win').hide();
$('.buttons').hide();

var answer = Math.floor(Math.random()*100)+1;
var numberOfTries = 5;
var prevAnswers = [];
var previous = 300;
var hotNCold = {};
$('.main').on('click','#Play',function(){
	$('.buttons').show();
	$('input').focus();
	$('input').on('keyup',function(event){
		if(event.keyCode === 13){
			$('#Submit').trigger('click');
		};
	});
	
	$('.mytext').attr('placeholder',"Please guess a number!");

	$('#Restart').show();
	$('#Play').hide();

	$('.status').show();
	$('#Submit').show();


});

$('.main').on('click','#Submit',function(){
	var userInput = Number($('.mytext').val());	
	if(userInput===answer){
		$('.main').hide();
		$('.win').show();
		$('.buttons').hide();
	}
	if(jQuery.inArray(userInput,prevAnswers)!== -1){
		$('.status').text("You've already used that number, pick a new one!");
	}
	// else if(prevAnswers.indexOf(answer)!= -1){
	// 	$('.status').text("You already tried that!  Try a different number."); 
	// }
	else {
			if(!(userInput <= 100 && userInput >= 1)){
				$('.status').text("That is not a valid number.  Please input a number between 1 and 100!");
			} else {
				prevAnswers.push(userInput);
				console.log(prevAnswers)
				var diff = userInput-answer;
				var temp = "";
				var direction = "";
				
				switch(true){
					case (diff > 15):
						temp = "cold";
						direction = "lower";
						break;
					
					case (diff < 15 && diff > 5):
						temp = "warm";
						direction = "lower";
						break;
					
					case (diff > 0 && diff <= 5):
						temp = "hot";
						direction = "lower";
						break;
					
					case (diff < -15):
						temp = "cold";
						direction = "higher";
						break;
					
					case (diff > -15 && diff < -5):
						temp = "warm";
						direction = "higher";
						break;
					
					case (diff < 0 && diff >= -5):
						temp = "hot";
						direction = "higher";
						break;
				}
				
				$('.status').text("You are "+temp+"!  Guess a "+direction+" number!");

				$('#circle'+numberOfTries+'').css({"background-color":"red"});	
				numberOfTries--;

				

				
			
			}
			if(prevAnswers.length>1){
				if(Math.abs(answer-previous)>Math.abs(answer-userInput)){
					$('.closeness').text("You are warmer than your last answer!");
				} else if(Math.abs(answer-previous)===Math.abs(answer-userInput)) {
					$('.closeness').text("You are the same distance away as your last answer!");
				} else {
					$('.closeness').text("You are the colder than your last answer!");
				}
			};
			hotNCold[userInput]=temp;
			$('.previous').text("Your last answers are: "+JSON.stringify(hotNCold));
			previous = userInput;
	}
	if(numberOfTries<1){
		$('.answer').text("The answer was "+answer);
		$('.lose').show();
		$('.main').hide();
		$('.buttons').hide();
	};
});



$('.buttons').on('click','#Hint',function(){
	alert('The answer is '+answer+".");
	$('.mytext').attr('placeholder','The answer is '+answer+".");
});


$('.buttons').on('click','#Restart',function(){
	location.reload(false);
});

$('.states').on('click','#Again',function(){
	location.reload(false);
});

$('.buttons').on('click','#giveUp',function(){
	$('.lose').show();
	$('.lose p').text("You Give Up!");				
	$('.main').hide();
	$('.buttons').hide();
});

