// When the user scrolls the page, execute myFunction
window.onscroll = function () { scrollProgress() };

function scrollProgress() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	var scrolled = (winScroll / height) * 100;
	document.getElementById("prog-bar").style.width = scrolled + "%";
}