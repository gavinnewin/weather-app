import './style.css';

let curX = 0;
let curY = 0;
let tgX = 0;
let tgY = 0;

document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector<HTMLDivElement>('.interactive')!;

    function move() {
        curX += (tgX - curX) / 7;
        curY += (tgY - curY) / 7;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});