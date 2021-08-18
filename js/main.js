const menu = document.querySelector('.menu');
const navbar = document.querySelector('.navbar');

menu.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

/*remove menu mobile - .nav__link 중 하나를 누르면 메뉴 창이 닫히도록 하기*/
const navLink = document.querySelectorAll('.navbar a');

function linkAction() {
    navbar.classList.remove('active');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

/*
const slideContainer = document.querySelector('.slide-container');
const width = document.querySelector('.slide').offsetWidth;
const slide = document.querySelectorAll('.slide');

const totalWidth = width * slide.length;

slideContainer.style.width = totalWidth + 'px';

const moveLeftAnimation = slideContainer.animate([
    {transform: 'translateX(0px)'},
    {transform: 'translateX(-1596px)',
offset: .85},
], {
    duration: 40000
});

moveLeftAnimation.onfinish = function() {
    const removeItem = slideContainer.removeChild(slideContainer.firstElementChild);
    slideContainer.appendChild(removeItem);
    moveLeftAnimation.play();
}
*/

/*lookbook image grabbing slide
주요하게 사용하는 함수는 getBoundingclientRect(), offsetX*/

let slider = document.querySelector('.slider');
let innerslider = document.querySelector('.slider-inner');
let pressed = false; /*클릭되었는지 아닌지를 체크하는 변수 - default는 false*/
let startX; /*마우스 드래그 시작점 x좌표 체크 - 쉽게 말하면 이미지를 grab하여 이미지를 움직이려고 할 때 grab한 지점의 x좌표를 체크하는 변수*/
let x; /*마우스 드래그 시 x좌표 체크 - 즉 이미지를 grab하여 왼쪽으로 움직이면, 움직여 이동한 그 지점의 x좌표를 체크하는 변수*/

/*즉 startX는 처음에 드래그하려고 이미지를 잡은 지점.
x는 innerslider.style.left = '0px'을 기준으로 내 마우스가 최종적으로 위치한 지점의 좌표*/

slider.addEventListener('mousedown', e => {
    pressed = true; /*클릭이 되었으므로 값은 true가 되어야 함*/ 
    startX = e.offsetX - innerslider.offsetLeft; /*innerslider.offsetParent는 div.slider*/
    slider.style.cursor = "grabbing"; /*grabbing은 잡고 있는 모양의 커서*/
})
/*mousedown() 이벤트는 특정 태그 위에 마우스 포인터가 있는 상태에서 마우스 버튼을 눌렀을 경우에 실행됨
e.offsetX나 e.offsetY 는 해당 객체를 기준으로 한 마우스의 X,Y 좌표를 말함
여기서 e.offsetX는 slider에서 마우스가 mousedown 되었을 때 x좌표로, 얼마나 떨어져 있는가를 나타냄
offsetLeft는 offsetParent를 기준으로 각각 요소가 오른쪽으로 얼마나 떨여져 있는지를 나타냄*/ 

slider.addEventListener('mouseenter', () => {
    slider.style.cursor = "grab" /*grab은 잡을 수 있음을 표현하는 모양의 커서*/
})

slider.addEventListener('mouseup', () => {
    slider.style.cursor = "grab"
})

window.addEventListener('mouseup', () => {
    pressed = false;
})

function checkBoundary() {
    let outer = slider.getBoundingClientRect();
    let inner = innerslider.getBoundingClientRect();
    /*getBoundingClientRect() 메소드를 사용하면 해당 요소의 모든 좌푯값을 받을 수 있음*/

    if(parseInt(innerslider.style.left) > 0) {
        innerslider.style.left = '0px';
    } else if (inner.right < outer.right) {
        innerslider.style.left = `-${inner.width - outer.width}px`
    }
    /*innerslider.style.left는 innerslider가 브라우저에서 왼족으로 얼마나 떨어져 있는가, position:absolute가 적용되어
    브라우저를 relative 삼고 위치를 반환한다고 생각하면 됨
    parseInt()는 정수로 반환해주는 함수
    innerslider.style.left 값을 측정하여 0보다 클 경우에 left 값을 초기화 해주기 위함
    즉 slider가 오른쪽으로도 drag 될 수 있는 것을 막아주기 위함
    inner.right < outer.right 는 이미지들이 다 slider 안으로 들어왔을 때, 
    즉 마지막 이미지가 slider 안에 들어왔을 때를 말함*/
}
/*checkBoundary() 함수는 slider의 시작점과 끝점을 체크해서 boundary가 초과하지 않도록 해주는 함수*/

slider.addEventListener('mousemove', e => {
    if(!pressed) return 
    e.preventDefault();
    x = e.offsetX;

    innerslider.style.left = `${x - startX}px`;
    checkBoundary();
})
/*drag를 처리하는 이벤트로, preventDefault() 는 현재 이벤트의 기본 동작을 중단시키는 함수 
이 이벤트가 실행되는 즉시 위에서 만든 checkboundary() 함수를 호출하여 영역 내부 처리가 맞는지 확인해줌*/

function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');

    if(this.scrollY >=200) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollUp);