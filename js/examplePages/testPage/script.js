
for (let li of document.getElementsByTagName('li')) {
	li.addEventListener('click', function() {
        let currentLi = this;
        let count = parseInt(currentLi.firstElementChild.innerHTML);
        currentLi.firstElementChild.innerHTML = ++count;
    });
};