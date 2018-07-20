'use strict';

var btnMain = document.querySelector('.main__btn');

function getLink(link) {
  document.querySelector(link.getAttribute("href")).scrollIntoView({
    behavior: 'smooth',
    block: "start"
  });
}

window.addEventListener('click', function (e){
  if(e.target.classList.contains('main__btn')) {
    e.preventDefault();
    getLink(e.target);
  }
})