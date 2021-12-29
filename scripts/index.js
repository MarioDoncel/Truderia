import{getRandomIntInclusive} from './utils'
//Adaptando viewheight para mobile
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Posição randomica da imagem do background
const background = document.querySelector('.background')
if(background) background.style.backgroundPosition = `${getRandomIntInclusive(1,100)}%`