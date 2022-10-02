// меняем количество упаковок
let element = document.querySelector('.p_limit_left_text');
let elementInnerHtml = element.innerHTML;
//# Тут мы создаём рандомный интервал в диапазоне
function RandomRange(a, b) {
	// Функция принимает минимальное и максимальное значение
	let c = Math.floor(Math.random() * (b - a + 1)) + a; // Получаем рандомное число
	return c;
}

//запускаем тайме только когда элемент в области видимости
let timer = null;
var Visible = function (target) {
	// Все позиции элемента
	var targetPosition = {
			top: window.pageYOffset + target.getBoundingClientRect().top,
			// left: window.pageXOffset + target.getBoundingClientRect().left,
			// right: window.pageXOffset + target.getBoundingClientRect().right,
			bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
		},
		// Получаем позиции окна
		windowPosition = {
			top: window.pageYOffset,
			// left: window.pageXOffset,
			// right: window.pageXOffset + document.documentElement.clientWidth,
			bottom: window.pageYOffset + document.documentElement.clientHeight,
		};

	if (timer == null && targetPosition.top < windowPosition.bottom) {
		// Если элемент полностью видно, то запускаем следующий код
		timer = setTimeout(function tick() {
			// Тут рекурсивный таймер
			if (elementInnerHtml > 3) {
				elementInnerHtml = elementInnerHtml - 1;
				element.innerHTML = elementInnerHtml;
			}
			timer = setTimeout(tick, RandomRange(5, 15) * 1000); // Интервал будет рандомный от 5 до 15 секунд
		}, RandomRange(5, 15) * 1000);
	}
};

// Запускаем функцию при прокрутке страницы
window.addEventListener('scroll', function () {
	Visible(element);
});

// А также запустим функцию сразу. А то вдруг, элемент изначально видно
Visible(element);
