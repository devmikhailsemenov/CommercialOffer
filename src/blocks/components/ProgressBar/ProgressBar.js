/**
 * Прогрессбар прокрутки страницы
 * @param  {Number} currentScroll 
 * @return {Function}
 */
const progressAnimate = currentScroll => {

	const progressWidthCalc = () => {
		
		const progressBar = document.querySelector('.progress-bar');
		const curScroll = currentScroll === undefined ? window.pageYOffset : currentScroll;
		const scrollHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);

		const windowHeight = window.innerHeight;
		const progressWidth = (curScroll / (scrollHeight - windowHeight)) * 100;
		
		progressBar.style.width = progressWidth + '%';
	}

	progressWidthCalc();

	return { progressWidthCalc }
};

export { progressAnimate };