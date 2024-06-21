/*document.addEventListener('DOMContentLoaded', () => {
     const sections = document.querySelectorAll('.content-section');

     const options = {
         threshold: 0.1
     };

     let lastScrollY = window.pageYOffset;

     const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 if (window.pageYOffset > lastScrollY) {
                     entry.target.classList.add('visible');
                     entry.target.classList.remove('hidden');
                 } else {
                     entry.target.classList.remove('visible');
                     entry.target.classList.add('hidden');
                 }
             } else {
                 entry.target.classList.remove('visible');
                 entry.target.classList.add('hidden');
             }
         });
         lastScrollY = window.pageYOffset;
     }, options);

     sections.forEach(section => {
         observer.observe(section);
     });
});
*/
document.addEventListener('DOMContentLoaded', function () {
    const typingText = document.querySelector('.typing-text');
    const textToType = 'Welcome to FinanceLearn! \nAchieve Your Financial Goals.';
    let index = 0;

    function typeText() {
        if (index < textToType.length) {
            if (textToType[index] === '\n') {
                typingText.innerHTML += '<br>';
            } else {
                typingText.innerHTML += textToType[index];
            }
            index++;
            setTimeout(typeText, 100);
        }
    }

    typeText();


});
