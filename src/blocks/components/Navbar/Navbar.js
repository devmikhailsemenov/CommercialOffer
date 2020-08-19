import { helper } from '@helpers/helper';
import { bodyActions } from '@helpers/bodyActions';

/**
 * Плавная анимация к секциям при клике на соответствующий пункт меню
 */
class Navbar {
	constructor(settings) {
		this.navbar = document.querySelector(settings.selectors.parrent);
		this.navLinks = this.navbar.querySelectorAll('.navbar__link');
		this.duration = settings.duration;

		this.header = document.querySelector('.header');
		this.resolveAnimate = true;

	    this.init();
	}

	initAnimation(e) {
		e.preventDefault();

		if (e.target.classList.contains('navbar__link') == false) return false
		if (this.resolveAnimate == false) return false;

		const target = e.target.getAttribute('href');
		const section = document.querySelector(target);
		const controlPoint = Math.round(
			helper.getCoordsElem(section).top + window.pageYOffset - this.header.offsetHeight
		);

		if (controlPoint == window.pageYOffset) return false;

		bodyActions.animate({
			from: window.pageYOffset,
			to: controlPoint,
			duration: 1000
		})

		this.resolveAnimate = false;
		setTimeout(()=> this.resolveAnimate = true, this.duration)
	}

	init() {
		this.navbar.addEventListener('click', e => this.initAnimation(e));
	}
}

export { Navbar };