// Gift animation
if (true) {
	const giftElement = document.getElementsByClassName("gift")[0];
	setInterval(() => {
		giftElement.classList.remove("gift");
		setTimeout(() => {
			giftElement.classList.add("gift");
		}, 2500);
	}, 3000);
}

if (false) {
	var sections = document.querySelectorAll('id^="section"'); // Получаем все разделы страницы
	var navLinks = document.querySelectorAll('nav a'); // Получаем все ссылки меню

	// Функция для проверки, находится ли элемент в видимой области окна
	function isElementInViewport(el) {
		var rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	// Функция для обновления активного пункта меню при скролле
	function updateActiveLink() {
		sections.forEach(function (section) {
			if (isElementInViewport(section)) {
				var targetLink = document.querySelector('nav a[href="#' + section.id + '"]');
				navLinks.forEach(function (link) {
					link.classList.remove('active');
				});
				targetLink.classList.add('active');
			}
		});
	}

	// Обновляем активный пункт меню при загрузке страницы и при скролле
	window.addEventListener('load', updateActiveLink);
	window.addEventListener('scroll', updateActiveLink);
}

// Заполнение хедера
if (true) {
	function updateVisibility() {
		const deadline = 60;
		const headerKey = "header";
		const setClass = "c42190";
		const element = document.querySelector(headerKey);

		if (document.body.scrollTop > deadline || document.documentElement.scrollTop > deadline) {
			element.classList.add(setClass);
		} else {
			element.classList.remove(setClass);
		}
	}
	window.addEventListener("load", updateVisibility);
	document.addEventListener("scroll", updateVisibility);
}

// Скрытие хедера
if (true) {
	var prevScrollpos = window.scrollY;
	const headerKey = "header";
	const element = document.querySelector(headerKey);

	window.addEventListener("scroll", function () {
		var currentScrollPos = window.scrollY;

		if (prevScrollpos > currentScrollPos)
			element.style.transform = "translateY(0)";
		else
			element.style.transform = "translateY(-100%)";

		prevScrollpos = currentScrollPos;
	});
}