
for (var li of document.getElementsByTagName('li')) {
	li.addEventListener('click', function() {
        let currentLi = this;
        var count = parseInt(currentLi.firstElementChild.innerHTML);
        currentLi.firstElementChild.innerHTML = ++count;
    });
};