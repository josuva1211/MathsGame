var playing = false;
var score;
var action;
var TimeRemaining;
var CorrectAnswer;

//If we click on start or reset button
document.getElementById("StartReset").onclick = function(){
    //If we  are playing
    if(playing == true)
        {
            location.reload(); //Reload Page
        }
    //If we are not playing
    else
    {
        //Change mode to playing
        playing = true;
        //Set score to 0 
        score = 0;
        document.getElementById("ScoreValue").innerHTML = score;
        //Show countdown box
        show("TimeRemaining");
        TimeRemaining = 60;
        document.getElementById("TimeSeconds").innerHTML = TimeRemaining;
        //Hide GameOver box
        hide("GameOver");
        //Change button to reset
        document.getElementById("StartReset").innerHTML = "Reset Game"; 
        //Reduce time by 1 sec using loops
        StartCountDown();
        //Generate new Q&A
        GenerateQA();
    }
}

//If we click on answer box
for(i=1;i<5;i++)
    {
        document.getElementById("Box"+i).onclick = function(){
            //If we are playing
            if(playing == true)
                {
                    if(this.innerHTML == CorrectAnswer)
                        {
                            //Correct
                            score++;
                            document.getElementById("ScoreValue").innerHTML = score;
                            hide("Wrong");
                            show("Correct");
                            setTimeout(function(){
                                hide("Correct");
                            }, 1000)
                            //Generate new Q&A
                            GenerateQA();
                        }
                    else
                    {
                        //wrong
                        hide("Correct");
                        show("Wrong");
                        setTimeout(function(){
                            hide("Wrong");
                        }, 1000)

                    }
                }
        }
    }

    //If we  are playing
        //Reload page
    //If we are not playing
        //Set score to 0 
        //Show countdown box
        //Reduce time by 1 sec using loops
            //Time Remaining
                //Yes --> Continue
                //No --> GameOver
        //Change button to reset
        //Generate new Q&A

//If we click on answer box
    //If we are playing
        //Correct
            //Yes
                //Increase score by 1
                //Show correct box for 1 sec
                //Generate new Q&A
            //No
                //Show try again box
function StartCountDown()
{
    action = setInterval(function(){
        TimeRemaining -= 1;
        document.getElementById("TimeSeconds").innerHTML = TimeRemaining;
        //GameOver
        if(TimeRemaining == 0)
            {
                StopCountDown();
                show("GameOver");
                document.getElementById("GameOver").innerHTML = "<p>Game Over!!!</p><p>Your score is " + score + ".</p>"
                hide("TimeRemaining");
                hide("Correct");
                hide("Wrong");
                playing = false;
                document.getElementById("StartReset").innerHTML = "Start Game"; 
            }
    }, 1000);
}

function StopCountDown()
{
    clearInterval(action);
}

function show(id)
{
    document.getElementById(id).style.display = "block";
}

function hide(id)
{
    document.getElementById(id).style.display = "none";
}

function GenerateQA()
{
    var x = 1+ Math.round(9 * Math.random());
    var y = 1+ Math.round(9 * Math.random());
    CorrectAnswer = x * y;
    document.getElementById("Question").innerHTML = x + "*" + y;
    
    var CorrectPosition = 1+ Math.round(3 * Math.random());
    document.getElementById("Box"+CorrectPosition).innerHTML = CorrectAnswer;
    var answers = [CorrectAnswer];
    for(i=1;i<5;i++)
        {
            
        if(i != CorrectPosition)
            {
                var WrongAnswer;
                do{
                    WrongAnswer = (1+ Math.round(9 * Math.random())) * (1+ Math.round(9 * Math.random()));
                }while(answers.indexOf(WrongAnswer)>-1)
                document.getElementById("Box"+i).innerHTML = WrongAnswer;
                answers.push(WrongAnswer);
            }
        }
}