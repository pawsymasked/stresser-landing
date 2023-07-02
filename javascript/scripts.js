// Инициировать каждую функцию после загрузки DOM контента
document.addEventListener("DOMContentLoaded", function () {
	updatehrefButtons();
	updateBottomMenuMove();
	updateMouseUpMenuBehavior();
	updateGiftAnimation();
	updateHeaderBehavior();
	updateScrollSnap();

	new URLMenuUpdater({
		ds: "dashboard"
	});
	new URLMenuUpdater({
		admin: "home"
	});

	spawnToast("Как использовать Тосты", "Смотрите пример в <b>scripts.js -> spawnToast(...)</b>", "", 10000);
	// spawnToast("Success", "Attack has been sent", "success");
	// spawnToast("Error", "Error has occurred", "error");
});

function updateScrollSnap() {
	// Получаем контейнер и кнопки
	const $containers = $('#scrollContainer');
	$containers.each(function() {
		const $container = $(this).find(".scroll-X");
		const $nextButton = $(this).find('#nextButton');
		const $prevButton = $(this).find('#prevButton');

		// Создаем экземпляр Intersection Observer
		var observer = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				// Код выполняется только если объект видим
				enableScrollButtons();
				observer.unobserve(entry.target);
			}
			});
		});
		
		// Наблюдаем за контейнером
		observer.observe($container[0]);
		
		function enableScrollButtons() {
			// Получаем ширину элемента внутри контейнера
			var itemWidth = $container.children().first().outerWidth();
			console.log(itemWidth)
			// Обработчик клика на кнопку "Next"
			$nextButton.on('click', function() {
				$container.animate({
					scrollLeft: '+=' + itemWidth
				}, 'fast');
			});
		
			// Обработчик клика на кнопку "Prev"
			$prevButton.on('click', function() {
				$container.animate({
					scrollLeft: '-=' + itemWidth
				}, 'fast');
			});
		}
		
	})
}


function spawnToast(title, message, type, timeout = 5000) {
	const types = {
		error: "#EB5757",
		success: "#00CC99"
	};

	type = String(type).toLowerCase();
	const color = types[type] || types[type.toLowerCase()] || "#0052CC";

	var toast = $('<div>', {
		'style': '--nb-i-col: ' + color,
		'class': 'notify-item',
		html: $('<div>', {
			'class': 'ic',
			html: $('<img>', {
				src: type == "error" ? '/assets/icons/nb-error.svg' : '/assets/icons/nb-success.svg',
				alt: ''
			})
		}).add($('<div>', {
			'class': 'flex dir-column',
			html: $('<p>', {
				text: title
			}).add('<p>', {
				class: 'small-10px',
				html: message
			})
		}))
	});
	  

	var toastBar = $(".notify-bar");
	toastBar.append(toast);

	setTimeout(function() {
		toast.addClass("hide");

		setTimeout(function() {
			toast.remove();
		}, 100);
	}, timeout);
}

let URLMenus = [];
// URLMenus["key-name"] => (Вернет текущее активное меню)

class URLMenuUpdater {
	constructor(attributes) {
		this.attributes = attributes;
		this.initialize();
	}

	initialize() {
		this.updateURLParams();
		this.initDefaultURLParams();
		this.updateDisplay();
		this.addClickHandlers();
	}

	updateURLParams() {
		var pathname = window.location.pathname.split("?")[0].split("/")[2] || "";
		var params = new URLSearchParams(window.location.search);

		for (var key in this.attributes) {
			if (params[key]) {
				this.attributes[key] = params[key];
			}
		}
	}

	initDefaultURLParams() {
		// var buildURL = new URL(window.location.href);
		// var urlParams = new URLSearchParams(window.location.search);
		// for (var key in this.attributes) {
		// 	var attrValue = $("body").attr("default-page-" + key);
		// 	var paramValue = this.attributes[key];

		// 	if (attrValue && !paramValue) {
		// 		if (attrValue == "#top") {
		// 			buildURL.searchParams.delete(key);
		// 		} else {
		// 			buildURL.searchParams.set(key, attrValue);
		// 		}
		// 	}
		// }

		// window.history.replaceState(null, null, buildURL);
		var self = this;
		var urlParams = new URLSearchParams(window.location.search);
		
		for (var key in this.attributes) {
			var urlValue = urlParams.get(key);
			if (urlValue) {
				self.attributes[key] = urlValue;
			}
		}
	}

	addClickHandlers() {
		var self = this; // Сохраняем доступ к контексту `this`
		for (var key in this.attributes) {
			$("[href-page-" + key + "]").on("click", function () {
				var attrValue = $(this).attr("href-page-" + key);
				// Используем сохраненный контекст
				self.attributes[key] = attrValue;
				self.updateDisplay();
			});
		}
	}

	updateDisplay() {
		for (var key in this.attributes) {
			var attrValue = this.attributes[key];

			var hrefSelector = "[href-page-" + key + "]";
			const hrefclass = $(hrefSelector).attr("data-page-class");
			if (hrefclass) $(hrefSelector).removeClass(hrefclass);

			// if (attrValue) {
			$("[data-page-" + key + "]").each(function () {
				var dataValue = $(this).attr("data-page-" + key);
				var hrefSelector = "[href-page-" + key + "='" + dataValue + "']";

				if (dataValue == attrValue) {
					$(this).attr("active", true);
					const hrefclass = $(hrefSelector).attr("data-page-class");
					if (hrefclass) $(hrefSelector).addClass(hrefclass);
				} else {
					$(this).attr("active", null);
				}
			});
			// }
			URLMenus[key] = attrValue;
		}
	}
}

function updateHeaderBehavior() {
	// Заполнение хедера
	if (true) {
		function updateVisibility() {
			const deadline = 60;
			const headerKey = "header";
			const setClass = "c42190";
			const element = document.querySelector(headerKey);
			if (element) {
				if (document.body.scrollTop > deadline || document.documentElement.scrollTop > deadline) {
					element.classList.add(setClass);
				} else {
					element.classList.remove(setClass);
				}
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
		if (element) {
			window.addEventListener("scroll", function () {
				var currentScrollPos = window.scrollY;

				if (prevScrollpos > currentScrollPos)
					element.style.transform = "translateY(0)";
				else
					element.style.transform = "translateY(-100%)";

				prevScrollpos = currentScrollPos;
			});
		}
	}
}

function updateGiftAnimation() {
	const giftElement = document.getElementsByClassName("gift")[0];
	if (giftElement) {
		setInterval(() => {
			giftElement.classList.remove("gift");
			setTimeout(() => {
				giftElement.classList.add("gift");
			}, 2500);
		}, 3000);
	}
}

// Функция обновляет поведение страницы при клике мышью на элементы, связанные с нижним и боковым меню. Если пользователь кликает вне этих элементов, то функция удаляет соответствующие атрибуты bottomBarActive и sideBarActive, которые регулируют отображение меню на странице. Это позволяет скрыть меню, если пользователь кликнул вне его области.
function updateMouseUpMenuBehavior() {
	var allStuff = `[bottomBarActive], [sideBarActive], [modalActive], .dropdown, .dropdown-custom`;
	var allStuffi = allStuff.split(", ");
	var active = "bottomBarActive, sideBarActive, modalActive";
	var activei = active.split(", ");
	$(document).mouseup(function (e) {
		if (!$(allStuff).is(e.target) && $(allStuff).has(e.target).length === 0) {
			$("body").removeClass("cropOnMobile");
			for (var i = 0; i < activei.length; i++) {
				$(allStuffi[i]).attr(activei[i], null);
			}
		}
	});
}

// Эта функция используется для управления отображением нижнего меню в интерфейсе.
function updateBottomMenuMove() {
	// селектор для элементов, на которые будет навешан обработчик событий
	const bottomTarget = "[data-bottombar]";
	// селектор для меню
	const bottomMenu = ".bottombar, .bottombar-custom";
	// название атрибута, который используется для указания активного состояния меню.
	const active = "bottomBarActive";

	// На элемент, соответствующий селектору bottomTarget, устанавливается обработчик событий click, который находит все элементы, у которых атрибут data-for равен значению атрибута data-bottombar кликнутого элемента.
	$(document).on("click", bottomTarget, function () {
		const $clicked = $(this);
		$(`[data-for="${$clicked.data("bottombar")}"]`).each(function () {
			// Затем на каждом найденном элементе нижнего меню вызывается метод attr(), который устанавливает значение атрибута, указанного в переменной active, в null. 
			$(bottomMenu).attr(active, null);
			
			// Затем на элементе body добавляется класс cropOnMobile, а на элементе меню устанавливается значение атрибута active в true.
			$("body").addClass("cropOnMobile");
			$(this).attr(active, true);
		});
	});
}

// Этот скрипт предназначен для обновления ссылок кнопок. Когда пользователь нажимает на кнопку, которая имеет атрибут href, скрипт сначала получает значение атрибута href и проверяет, не пустое ли оно или не определено. Если ссылка не определена или пуста, то скрипт просто завершает выполнение. В противном случае, скрипт получает значение атрибута target (целевое окно), если оно есть, иначе устанавливает значение по умолчанию - "_self". Затем скрипт открывает новое окно браузера, используя указанную ссылку и целевое окно, и устанавливает на него фокус.
function updatehrefButtons() {
	$("button[href]").click(function () {
		var link = $(this).attr("href");
		if ((link == "") | (link == undefined)) return;
		var target = $(this).attr("target");
		if (!target) target = "_self";
		window.open(link, target).focus();
	});
}