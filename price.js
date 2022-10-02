'use strict';

var prices = {
	RU: {
		country: 'Россия',
		country1: 'России',
		country2: 'России',
		old: '1499',
		new: '168',
		money: 'руб.',
		tel: '+7',
	},
	KZ: {
		country: 'Казахстан',
		country1: 'Казахстана',
		country2: 'Казахстане',
		old: '8550',
		new: '990',
		money: 'тенге',
		tel: '+7',
	},
	UZ: {
		country: 'Узбекистан',
		country1: 'Узбекистана',
		country2: 'Узбекистане',
		old: '249000',
		new: '29990',
		money: 'сумов',
		tel: '+998',
	},
	// BY: {
	// 	country: 'Беларусь',
	// 	country1: 'Беларуси',
	// 	country2: 'Беларуси',
	// 	old: '55',
	// 	new: '5',
	// 	money: 'руб.',
	// 	tel: '+375',
	// },
	// UA: {
	// 	country: 'Украина',
	// 	country1: 'Украины',
	// 	country2: 'Украине',
	// 	old: '549',
	// 	new: '59',
	// 	money: 'грн',
	// 	tel: '+380',
	// },
	// AM: {
	// 	country: 'Армения',
	// 	country1: 'Армениии',
	// 	country2: 'Армении',
	// 	old: '21 750',
	// 	new: '14 500',
	// 	money: 'драм',
	// 	tel: '+374',
	// },
	// GE: {
	// 	country: 'Грузия',
	// 	country1: 'Грузии',
	// 	country2: 'Грузии',
	// 	old: '66',
	// 	new: '6',
	// 	money: 'лари',
	// 	tel: '+995',
	// },
	// MD: {
	// 	country: 'Молдавия',
	// 	country1: 'Молдавии',
	// 	country2: 'Молдавии',
	// 	old: '355',
	// 	new: '67',
	// 	money: 'лей',
	// 	tel: '+373',
	// },
};

var changePrice = function changePrice(elems, value) {
	elems.forEach(function (elem) {
		elem.textContent = value;
	});
};

var changePlaceholder = function changePlaceholder(elems, value) {
	elems.forEach(function (elem) {
		elem.placeholder = value;
	});
};

var listenner = function listenner(e) {
	changePrice(old_prices, prices[e.target.value].old);
	changePrice(new_prices, prices[e.target.value]['new']);
	changePrice(currencys, prices[e.target.value].money);
	changePrice(country1, prices[e.target.value].country1);
	changePrice(country2, prices[e.target.value].country2);
	changePrice(country, prices[e.target.value].country);
	changePlaceholder(phoneInputs, prices[e.target.value].tel);
	selectors.forEach(function (elem) {
		elem.value = e.target.value;
	});
};

var append = function append() {
	selectors.forEach(function (elem) {
		elem.addEventListener('change', function (e) {
			listenner(e);
		});
		elem.childNodes.forEach(function () {
			var firstElementChild = elem.firstElementChild;
			if (firstElementChild) elem.removeChild(firstElementChild);
		});

		for (var countr in prices) {
			var option = document.createElement('option');
			option.value = countr;
			option.innerHTML = prices[countr].country;
			elem.append(option);
		}
	});
};

var contrySelect = function contrySelect() {
	var query_str = document.location.search.replace('?', '').split('&'),
		countryName = '';
	query_str.forEach(function (elem) {
		if (elem.split('=')[1] && elem.split('=')[0] === 'country_code') {
			countryName = elem.split('=')[1];
		}
	});
	if (!Object.keys(prices).includes(countryName)) countryName = Object.keys(prices)[0];
	changePrice(old_prices, prices[countryName].old);
	changePrice(new_prices, prices[countryName]['new']);
	changePrice(currencys, prices[countryName].money);
	changePrice(country1, prices[countryName].country1);
	changePrice(country2, prices[countryName].country2);
	changePrice(country, prices[countryName].country);
	changePlaceholder(phoneInputs, prices[countryName].tel);
	selectors.forEach(function (elem) {
		elem.value = countryName;
	});
};

var selectors = document.querySelectorAll('.country__selecor'),
	old_prices = document.querySelectorAll('.old_price'),
	new_prices = document.querySelectorAll('.new_price'),
	currencys = document.querySelectorAll('.currency_price'),
	country = document.querySelectorAll('.country_name'),
	country1 = document.querySelectorAll('.country_name1'),
	country2 = document.querySelectorAll('.country_name2'),
	phoneInputs = document.querySelectorAll('.phone-black');
append();
contrySelect();
