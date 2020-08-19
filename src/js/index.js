import '@helpers/detectBadBrowser.js';
import WOW from 'wow.js/dist/wow.js';
import { bodyActions } from '@helpers/bodyActions.js';
import { progressAnimate } from '@components/ProgressBar/ProgressBar';
import { Navbar } from '@components/Navbar/Navbar';
import { headerActions } from '@modules/Header/Header';
import { Graphics } from '@modules/TimeConstraints/TimeConstraints';
import { emailModalFormSubmit } from '@modules/EmailModal/EmailModal';

document.addEventListener('DOMContentLoaded', () => {
	const progressAnimateInit = progressAnimate();
	const headerActionsInit = headerActions();
	const emailModalFormSubmitInit = emailModalFormSubmit();

	const navbar = new Navbar({
		selectors: {
			parrent: '.navbar',
		},
		duration: 1000
	});

	const wow = new WOW({
		callback: box => {
			if (box.id === 'graphics') {
				graphics.animate();
			}
		}
	});

	// Инициализация класса с графиками
	const graphics = new Graphics({
		stagesCallback: context => {
			// Инициализация WOW.js.
			// Инициализируем тогда, когда получаем массив дат
			wow.init();
		}
	});

	graphics.getStages();

	window.addEventListener('resize', event => {
		graphics.animate();
		headerActionsInit.setPaddingTopBody();
	});

	document.addEventListener('scroll', event => {
		progressAnimateInit.progressWidthCalc();
	});
});