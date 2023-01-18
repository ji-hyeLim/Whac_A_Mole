const $box = document.querySelector("#box");
const $timer = document.querySelector("#timer");
const $score = document.querySelector("#score");
const $start = document.querySelector("#start");
const $$cells = document.querySelectorAll(".cell");
console.log($start);

const allHole = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
let score = 0;
let time = 30;
console.log($score);
console.log($box);

// 시작 및 종료
$start.addEventListener('click', () => {
    if(started) return;
    started = true;
    console.log('시작');
    clock();

    const timeId = setInterval(() => {
        // 시간
        time = (time * 10 - 1) / 10;
        time
        $timer.textContent = Math.floor(time);

        // 종료
        if(time == 0) {
            clearInterval(clockId);
            clearInterval(timeId);
            setTimeout(() => {
                alert(`GAME OVER, 점수는 ${score}점 입니다.`);
                location.reload();
            }, 50);
        }
    },100);
    const clockId = setInterval(clock, 1000);
});

// 두더지 나오기
let moleNum = 0.95;
function clock() {
    allHole.forEach((back, index) => {
        if(back) return;
        if (Math.random() < moleNum) {
            const $mole = $$cells[index].querySelector('.mole');
            allHole[index] = setTimeout(() => {
                $mole.classList.add('hidden');
                allHole[index] = 0;
            }, 1000);
            $mole.classList.remove('hidden');
        }
    });
}

console.log(clock);

// 두더지 잡기
$$cells.forEach(($cell, index) => {
    $cell.querySelector('.mole').addEventListener('click', (e) => {
        
        // 점수
        console.log("두더지 클릭");
        if(!e.target.classList.contains('die')) {
            score += 1;
            $score.textContent = score;
        }

        // 우는 두더지
        e.target.classList.add('die');
        e.target.classList.add('hidden');
        clearTimeout(allHole[index]);
        setTimeout(() => {
            allHole[index] = 0;
            e.target.remove('.die');
        }, 1000);
    });
});