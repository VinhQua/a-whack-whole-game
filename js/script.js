const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');
const hammer = document.querySelector('.hammer');
const button = document.querySelector('button');
const holes = document.querySelectorAll('.hole');
const body = document.querySelector('body');
boom = document.querySelector('.boom');
let lastMole;
let score= 0;
let timeOut = 10000;
let timeUp = false;
let start = false;
console.log(holes);
console.log(moles);
const randomTime =function(min,max){
    return Math.round(Math.random()*(max-min)+min) ;
};
const randomMole = function(moles){
    const index = Math.floor(Math.random()*moles.length);
    const mole = moles[index];
    if (mole=== lastMole){
       //console.log('the same man');
        return randomMole(moles);
       
    }
    lastMole = mole;
    return mole  
};
const showRandomMole = function(){
    const time = randomTime(200,1000);
    const mole = randomMole(moles);
    mole.classList.add('up');
    setTimeout(()=>{
        mole.classList.remove('up');
        if (!timeUp===true){showRandomMole();}
        
    },time)
};
hammerClick = function(e){
    if (start === false)return;
    //console.log(e.clientX,e.clientY);
    hammer.classList.add('show');
    hammer.style.transform= `translate(${e.clientX-35}px,${e.clientY-35}px) rotate(-90deg)` ;
    setTimeout(() => {
        hammer.classList.remove('show');
    }, 150);
};
window.addEventListener('click',hammerClick);

const getScore = function(e){
    if (e.isTrusted ===false)return;
    score++;
    console.log(e);
    scoreBoard.textContent = score;
    const moleCoords = this.getBoundingClientRect()
    boom.style.left = moleCoords.left + 50 + "px";
    boom.style.top = moleCoords.top + "px";
    boom.classList.add('show');
    setTimeout(()=>{
            this.classList.remove('up');
            boom.classList.remove('show');
    },150)
    
    //console.log(moleCoords);
};
moles.forEach(mole => mole.addEventListener('click',getScore));
const startGame = function(){
    score = 0;
    timeUp =false;
    start =true;
    scoreBoard.textContent =score;
    showRandomMole();
    button.classList.add('hide');
    setTimeout(()=> {
        timeUp =true;
        button.classList.remove('hide');
        start = false;
        hammer.classList.remove('show');
    },timeOut);
};

