import { helper } from '@helpers/helper';

/**
 * Анимация графиков в секции 'График выполнения работ по этапам'.
 */
class Graphics {
	constructor(options) {
		// Элементы
		this.parent = document.querySelector('.time-constraints__graphics');
		this.column = document.querySelector('.time-constraints__col');
		this.selector = this.parent.querySelectorAll('.time-constraints__graphic-wrap');
		this.dataDates = document.querySelectorAll('.time-constraints__data');
		this.dates = '.time-constraints__dates';

		this.stagesCallback = options.stagesCallback;

		// Размеры родительского блока и колонок
		this.parentWidth = null;
		this.colWidth = null;

		// Массив месяцей
		this.months = [
			'января', 'февраля', 'марта', 
			'апреля', 'мая', 'июня', 
			'июля', 'августа', 'сентября', 
			'октября', 'ноября', 'декабря'
		];

		this.stages = null;
	}
	
	/**
	 * Получает массив дат
	 */
	getStages() {
		fetch('../stages.json')
			.then(response => response.json())
			.then(data => {
			  this.stages = data.stages;

			  this.stagesCallback(this);
			  this.iterationDataDates();
			})
			.catch(error => alert(`Произошла ошибка на сервере: ${ error }`))
	}
	
	/**
	 * Возвращает объект new Date(date)
	 * @param  {String} date
	 * @return {Object}
	 */
	getDate(date) {
		return new Date(date);
	}
	
	/**
	 * Преобразует даты в timestamp
	 * @param  {Object} item
	 */
	dateParse(item) {
		item.startDate = +this.getDate(item.startDate);
		item.endDate = +this.getDate(item.endDate);
		item.controlDate = +this.getDate(item.controlDate);
	}
	
	/**
	 * Ограничивает графики в зависимости от дат.
	 * @param  {Object} item
	 * @param  {Number} index
	 * @param  {Object} array
	 */
	restrictionDates(item, index, array) {
		const itemDate = +this.getDate(array[index].endDate);
		const controlItemDate = +this.getDate(array[index].controlDate);
		const endItemDate = +this.getDate(array[this.stages.length - 1].endDate);

		if (itemDate > endItemDate) {
			array[index].endDate = array[this.stages.length - 1].endDate;
		}

		if (itemDate < controlItemDate) {
			array[index].endDate = array[index].controlDate;
		}

		const getIndex = array.indexOf(array.filter(el => el.key == item.controlKey)[0]);

		if (array[index].controlKey == undefined) {
			array[index].endDate = array[index].controlDate;
		} else {
			if (itemDate > +this.getDate(array[getIndex].endDate)) {
				array[index].endDate = array[getIndex].endDate;
			}
		}
	}
	
	/**
	 * Выводит даты на страницу
	 * @param {Object} item
	 * @param {Number} index
	 */
	setDatesTextContent(item, index) {
		const dates = item.querySelectorAll(this.dates);

		for (let i = 0; i < dates.length; i++) {
			this.restrictionDates(this.stages[i], i, this.stages);
			const formatDates = {
				startDay: this.getDate(this.stages[i].startDate).getDate(),
				endDay: this.getDate(this.stages[i].endDate).getDate(),
				startMonth: this.months[this.getDate(this.stages[i].startDate).getMonth()],
				endMonth: this.months[this.getDate(this.stages[i].endDate).getMonth()]
			}

			dates[i].textContent = `${formatDates.startDay} ${formatDates.startMonth} - ${formatDates.endDay} ${formatDates.endMonth}`;
		}
	}
	
	/**
	 * @param  {Object} el
	 * @param  {Object} item
	 * @return {Boolean}
	 */
	getLimitWidthGraphics(el, item) {
		return el.startDate <= item.endDate && el.controlDate >= item.endDate;
	}
	
	/**
	 * Устанавливает ширину графика в зависимости от дат.
	 * @param {Object} item
	 * @param {Number} index
	 * @param {Object} array
	 */
	setGraphicsWidth(item, index, array) {
		const getIndex = array.indexOf(array.filter(el => this.getLimitWidthGraphics(el, item))[0]);
		const percentDates = (item.endDate - array[getIndex].startDate) / (array[getIndex].controlDate - array[getIndex].startDate);
		const percentWidth = (this.colWidth * percentDates / this.parentWidth) * 100;

		this.stages[index].width = (getIndex * this.colWidth / this.parentWidth * 100) + percentWidth;

		this.selector[index].style.width = Math.round(this.stages[index].width) + '%';
	}
	
	/**
	 * Устанавливает ширины всех графиков
	 */
	iterationStages () {
		this.stages.forEach((item, index, array) => {
			this.restrictionDates(item, index, array);
			this.dateParse(item);
			setTimeout(() => this.setGraphicsWidth(item, index, array))
		});
	}
	
	/**
	 * Выводит все даты на страницу
	 */
	iterationDataDates() {
		for (let i = 0; i < this.dataDates.length; i++) {
			this.setDatesTextContent(this.dataDates[i], i);
		}
	}
	
	/**
	 * Инициализация всех действий с графиками
	 */
	resolveInitGraphics() {
		if (!this.stages) return;
		
		if (!helper.isHidden(this.parent)) {
			this.parentWidth = this.parent.offsetWidth;
			this.colWidth = this.column.offsetWidth;
			this.iterationDataDates();
			this.iterationStages();
		}
	}
	
	animate() {
		this.resolveInitGraphics();
	}
}

export { Graphics }