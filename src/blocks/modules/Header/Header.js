import { helper } from '@helpers/helper';

/**
 * Анимация body при клике на лого, paddingTop у body
 * @return {Function}
 */ 
const headerActions = () => {
	const header = document.querySelector('.header');
	const logo = header.querySelector('.header__logo');

	logo.addEventListener('click', e => {
		e.preventDefault();

		const points = {
			to: 0,
			from: window.pageYOffset
		}

		if (points.from == 0) return false
			
		const animateOptions = {
			duration: 1000,
			timing: timeFraction => {
				return timeFraction;
			},
			draw: progress => {
				let propressAnimate = (points.to - points.from) * progress + points.from;

				if (propressAnimate < 0) propressAnimate = 0;

				scrollTo(0, propressAnimate);
			}
		}

		helper.animate(animateOptions);
	});

	const setPaddingTopBody = () => document.body.style.paddingTop = header.offsetHeight + 'px';

	setPaddingTopBody();

	return { setPaddingTopBody };
}

export { headerActions };