// const acceptBtn = document.getElementById('accept');
// const close = document.querySelectorAll('.close');
// let header = document.querySelector('header');
// let overlay = document.querySelector('.overlay');
// let menu = document.getElementById('menu');
// let menuToggle = document.getElementById('toggle-menu');
// let popUp = document.querySelector('.pop-up');
// let links = document.querySelectorAll('.link');

// //Change background of header when user make scroll
// window.addEventListener('scroll', () => {
//   if(scrollY > 10) {
//     header.classList.add('active');
//   } else {
//     header.classList.remove('active');
//   }
// })
// // toggle overlay
// function toggleOverlay(action='open') {
//   action == 'open' ? overlay.classList.add('active') : action == 'close' ? overlay.classList.remove('active') : null;
// }

// function editing() {
//   toggleOverlay();
//   menu.classList.add('hide-up');
//   setTimeout(() => {
//     popUp.classList.remove('hide-up');
//   }, 500);
// }
// acceptBtn.addEventListener('click', () => {
//   toggleOverlay('close');
// })
// document.getElementById('heart').addEventListener('click', (e) => {
//   e.target.classList.toggle('like')
// })

// menuToggle.addEventListener('click', () => {
//   toggleOverlay('open');
//   popUp.classList.add('hide-up');
//   setTimeout(() => {
//     menu.classList.remove('hide-up');
//     popUp.classList.add('hide-up');
//   }, 500);
// })


// close.forEach(btn => {
//   btn.addEventListener('click', () => {
//     toggleOverlay('close')
//     cartItemsElement.classList.remove('showing')
//   })
// })

// // --------- Adding active class to link
// function addActive() {
//   links.forEach(link => {
//     link.classList.remove('active');
//   })
//   this.classList.add('active');
// }

// links.forEach(link => {
//   link.addEventListener('click', addActive);
// })


console.log('Ok')