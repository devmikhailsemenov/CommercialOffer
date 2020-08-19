import { useValidateForm } from '@helpers/useValidateForm';
import { useAlertModal } from '@helpers/useAlertModal';
import { modal } from '@components/Modal/Modal';
import { fieldText } from '@components/FieldText/FieldText';

const emailModalFormSubmit = () => {
	const emailModalForm = document.querySelector('#popup-email-form');

	if (!emailModalForm) return;

	const fields = emailModalForm.querySelectorAll('.field-wrap__input');
	const validateArr = [...fields].map(field => ({ field, error: true }));

	const validateEmailModal = useValidateForm(validateArr);

	const successSubmitForm = target => {
		target.reset();

		const successModal = useAlertModal({ title: 'Спасибо', btn: 'хорошо'});

		modal.nextModal({
			current: event.target.closest('.popup'),
			next: successModal,
			nameClasses: {
				enter: 'popup_enter-to',
				leave: 'popup_leave-to'
			},
			type: 'next-delay'
		});

		fields.forEach(field => fieldText.clear(field));
	}

	const emailModalSubmit = event => {
		const { target } = event;

		event.preventDefault();

		if (validateEmailModal() === false) return;

		const formData = new FormData(target);

		successSubmitForm(target);
	}

	emailModalForm.addEventListener('submit', emailModalSubmit);
}

export { emailModalFormSubmit };