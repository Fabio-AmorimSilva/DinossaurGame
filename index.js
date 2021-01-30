const dinoDiv = document.querySelector('.dinoImage');
const backgroundDiv = document.querySelector('.gameBackground');
const score = document.querySelector('.gameScore');

//Verifica se o personagem está pulando
let isJumping = false;
//Marca a posição do personagem
let position = 0;
//Marca a distancia percorrida
var dist = 0;


function handleKeyUp(event) {

    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }

    }

}


function jump() {
    isJumping = true;

    let upPosition = setInterval(() => {
        //setInterval permite a execução sem parada durante um tempo determinado
        if (position >= 150) {
            clearInterval(upPosition);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;

                } else {
                    position -= 20;
                    dinoDiv.style.bottom = position + 'px';
                }
            }, 40);

        } else {
            //Subindo
            position += 20;
            dinoDiv.style.bottom = position + 'px';

        }
    }, 20);


}

function createCactus() {
    const cactus = document.createElement('div');
    let randomCactus = Math.random() * 6000;
    let cactusPosition = 1000;
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    backgroundDiv.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            backgroundDiv.removeChild(cactus);

        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="gameOver">Game Over</h1>' +
                '<p class="gameOver">Recorde: ' + dist + '.</p>' +
                '<p class="gameOver">Pressione a tecla Enter para jogar novamente</p>'

        } else {
            dist++;
            score.textContent = dist;
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }

    }, 20)

    setTimeout(createCactus, randomCactus);

}

function gameLost(event) {

    if (event.keyCode === 13) {
        document.location.reload();
    }


}

createCactus();
document.addEventListener('keydown', handleKeyUp);
document.addEventListener('keydown', gameLost);