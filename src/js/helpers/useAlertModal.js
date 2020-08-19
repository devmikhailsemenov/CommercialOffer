/**
 * Генерирует шаблон модального окна и открывает его.
 * @param  {String} options.id          - id модального окна
 * @param  {String} options.title       - текст заголовока
 * @param  {String} options.description - текст описания
 * @param  {String} options.btn         - текст кнопки
 * @param  {String} options.classes     - наименования классов
 * @return {Object} popup               - созданное модальное окно(DOM-элемент)
 */
const useAlertModal = ({ id = 'alert-modal', title, description, btn, classes }) => {
	const popup = document.createElement('div');

	popup.id = id;
	popup.className = classes ? classes + ' popup box-hidden' : 'popup box-hidden';
	popup.insertAdjacentHTML('beforeend', `
		<span class='popup__close-btn popup-close'></span>
		${ title ? `<h2 class='popup__title section-title'>${ title }</h2>` : '' }
		${ description ? `<p class='popup__description'>${ description }</p>` : '' }
		${ btn ?
			`<button class='popup__close popup-close btn-main'>${ btn }</button>`
			: ''
		}
	`);

	document.body.append(popup);

	popup.addEventListener('afterHide', event => popup.remove());

	return popup;
}

export { useAlertModal };
