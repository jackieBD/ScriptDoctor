// my plan:
//PUT IN CURRENT WC,
//NAME YOUR PROJECT
//COUNTDOWN--> BEEP BEEP BEEP
//SELECT TIME (eg. 10mins, 20mins, 40mins )
//enter ur NEW WC
//pretty css BTW
//



const timerEl = document.getElementById("timer-el");
const messageEl = document.getElementById("message-el")
const startBut = document.getElementById("start-but")
const inputEl = document.getElementById("input-el")
const prevWpmEl = document.getElementById("prev-wpm-el")
const startingTime = 10;
let time = startingTime *60;
let counting = false
let isSprinting = false
var interval = null
var beeps = new Audio('beeps5.wav');
wordCount= []
perMinCounts = []
messageEl.textContent = "Sprint Doctor is here to help! Tell us your story's symptoms (aka your starting word count!"

function startTimer(){
  if (isSprinting === false){
    isSprinting = true
    counting = true
    messageEl.textContent = "This story needs more words STAT! Quick before the timer is up!! WRITE WRITE WRITE!!!"
    interval = setInterval(updateCountdown, 1000);
    wordCount.push(inputEl.value)
    console.log(wordCount)
  }

  if (isSprinting === true && counting === false){
    wordCount.push(inputEl.value)
    let wordsWritten = (wordCount[1]-wordCount[0])
    let wordsPerMin = (wordsWritten/10)
    messageEl.textContent = "Starting word count: " + (wordCount[0]) + ". Final word count: " + (wordCount[1]) + ". Total words written: " + (wordsWritten) + ". Words per minute: " + (wordsPerMin) + ". Just what the Doctor ordered!!"
    isSprinting = false
    startBut.textContent = "SPRINT"
    perMinCounts.push(wordsPerMin)
    time = startingTime* 60
    prevWpmEl.textContent = "Prev: "
    for(i=perMinCounts.length-1; i>=0; i--){
      prevWpmEl.textContent += perMinCounts[i] + " wpm, "
    }
    wordCount= []

  }
}


function updateCountdown() {
  if (counting === true){
  const minutes = Math.floor(time/60);
  let seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  timerEl.innerHTML = `${minutes}:${seconds}`
  time--;
  if (minutes <0){
    setTimeout(updateCountdown, 100)
    clearInterval(interval)
    timerOver()
  }
}
}


function timerOver(){
  counting = false
  timerEl.textContent = "0:00"
  beeps.play();
  console.log("BEEP BEEP BEEP")
  messageEl.textContent = "Phew-- Nice job! Your story is looking more lively! Tell us your new wordcount!"
  document.getElementById("input-el").value = ""
  startBut.textContent = "SUBMIT"
}
