var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on the start/reset
 document.getElementById("reset").onclick = function(){
    //if we are playing
    if(playing == true){
        location.reload();//reload page
    }else{//if we are not playing
        //change mode to playing
        playing = true;
        //set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        //show countdown box
        show("time");
        timeremaining = 60;
        document.getElementById("timevalue").innerHTML = timeremaining;

        //hide game over box
        hide("gameover");
        //change button to reset
        document.getElementById("reset").innerHTML = "Reset Game";
        //start countdown
        startCountdown();
        //generate a new Q&A
        generateQA();
    }
 }
//if we click on answer box
for(i=1; i<5; i++) {
  document.getElementById("number"+ i).onclick = function(){
    //if we are playing
    if(playing == true){
        if(this.innerHTML==correctAnswer){
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            }, 1000);

            generateQA();
        }else{
            //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            }, 1000);
        }
    }
 }  
} 
        //correct?
            //yes
                //increase score
                //show correct box for 1sec
                //generate new Q&A
            //no
                //show try again box for 1sec
function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timevalue").innerHTML = timeremaining;
        if(timeremaining == 0){//game over
            stopCountdown();
            show("gameover");
            document.getElementById("overScore").innerHTML = score;
            hide("time");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("reset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountdown(){
    clearInterval(action);
}

function hide(Id){
    document.getElementById(Id).style.display = "none";
}

function show(Id){
    document.getElementById(Id).style.display = "block";
}

function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("number"+correctPosition).innerHTML = correctAnswer;
    //fill other boxes with wrong answers
    var answers = [correctAnswer];
    for(i=1;i<5;i++){
        if(i != correctPosition){
            var wrongAnswer;
            do{wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));}
            while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("number"+ i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}