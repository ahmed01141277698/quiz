let countSend=document.querySelector('.count span');
let bullets =document.querySelector('.bullets')
let bulletSspaned=document.querySelector('.bullets .spans');
let quizArea=document.querySelector(".quiz_area");
let answerArea=document.querySelector('.answers_area');
let submetAnser= document.querySelector('.submit_answer');
let resultsALL=document.querySelector('.results')
let countdownElemint =document.querySelector('.countdown')
//set options
let currentIndex=0;
let rightanswer=0;
let countdownel=0;
function getQuesion(){
    let myRequest= new XMLHttpRequest();
myRequest.onreadystatechange=function(){
    if (this.readyState === 4 && this.status ===200){
        let questionsObject=JSON.parse(this.responseText);
        let qcount=questionsObject.length;

        //creat bullets + set question count 
        createbullets(qcount);

        // Add question data
        addQuestionData(questionsObject[currentIndex] , qcount)
        //  start countdownElemint
        countdownelFun(5 ,qcount);
    // click on submit 
    submetAnser.onclick = () =>{
//get right answer 
let theRightAnswer=questionsObject[currentIndex].right_answer;
// increase index 
currentIndex++;
//check the answer 
checkAnswer(theRightAnswer,qcount);
      
// remove question 
quizArea.innerHTML='';
answerArea.innerHTML='';
// add quesions once agein
        addQuestionData(questionsObject[currentIndex] , qcount)
// handellbolets
handleBullets();
  // end countdownElemint
  clearInterval(countdownel);
   countdownelFun(5 ,qcount);
// show result
showReuslt(qcount);
    };  
    }
};
myRequest.open("get" ,"html_qustions.json" ,true);
 myRequest.send();
};
getQuesion();

function createbullets(num){
    countSend.innerHTML=num;
//creat spans 
    for(let i = 0 ; i < num ; i++  ){
        //creat bulltes
        let thebullet =document.createElement("span");
        if( i===0){
            thebullet.className='no';
        }
 //Append bullets to main bullet contenar .
        bulletSspaned.appendChild(thebullet);
    }
}
 
function addQuestionData(obj,count ){
    if(currentIndex<count){ //creat title
  let questionTitle= document.createElement('h2')
  //creat question  Text
 let questionText= document.createTextNode(obj["title"]);
// Append Text to H2
 questionTitle.appendChild(questionText);
 //append the h2 to the quiz area 
 quizArea.appendChild(questionTitle);



 //creat answwer 
  for(let i=1 ; i<=4 ; i++){
    // creat main dIv
    let mainDiv = document.createElement("div");
    //creat main class
    mainDiv.className='answer';
    // creat raidoInpot 
    let raidoInpot=document.createElement('input');
    // add typ and name , data attrubyuot 
    raidoInpot.name='question';
    raidoInpot.type='radio';
    raidoInpot.id =`answer_${i}`;
    raidoInpot.dataset.answer =obj[`answer_${i}`];
     // make first option selesct 
     if(i===1){
        raidoInpot.checked=true;
     } 
    //creat label
    let theLabel =document.createElement('label');
    //add for attribuote
    theLabel.htmlFor=`answer_${i}`;
    //creat text label
   let  theLabelText = document.createTextNode(obj[`answer_${i}`]);
   // add the text to label
   theLabel.appendChild(theLabelText);
   //add inbut and label to main div 
   mainDiv.appendChild(raidoInpot); 
   mainDiv.appendChild(theLabel);
 //append all divs to answer area 
 answerArea.appendChild(mainDiv);
  }

}
 
}

function checkAnswer(rAnswer, count){
  let answers =document.getElementsByName("question");
    let theChooseAnswer ;
    for(let i=0 ; i <answers.length ;i++){
        if(answers[i].checked){
            theChooseAnswer =answers[i].dataset.answer;
        }
    }
if(rAnswer===theChooseAnswer){
    rightanswer++;
    console.log("good");

}
}

function handleBullets(){
   let bulletsSpan= document.querySelectorAll(".bullets .spans span ");
   let arrayofSpan= Array.from(bulletsSpan);
   arrayofSpan.forEach((span , index)=>{
    if(currentIndex===index){span.className="on";

    }
   });
}

function showReuslt(count){
    let reslt;
if(currentIndex===count){
quizArea.remove();
answerArea.remove();
submetAnser.remove();
bullets.remove();

if(rightanswer>count/2 && rightanswer<count){
    reslt =`<span class="good">good </span>,${rightanswer} from ${count} is good`;
}else if(rightanswer===count){    reslt =`<span class="prifect">prefect </span>,${rightanswer} from ${count} is prifect`;
}else{
        reslt =`<span class="bad">bad </span>,${rightanswer} from ${count} is bad`;

}
resultsALL.innerHTML=reslt;
}
}
 function countdownelFun(duration , count){
    if(currentIndex<count){
        let minutse , secound ;
        countdownel=setInterval(function(){
            minutse =parseInt(duration/60);
            secound =parseInt(duration%60);
            minutse=minutse<10?`0${minutse}`:minutse;
            secound=secound<10?`0${secound}`:secound;
            countdownElemint.innerHTML=`${minutse}:${secound}`;
            if(--duration<0){
                clearInterval(countdownel);
                submetAnser.onclick();
            }
        },1000);
    }
 }