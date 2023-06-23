// Инициировать каждую функцию после загрузки DOM контента
document.addEventListener("DOMContentLoaded", function () {
	updatehrefButtons();
	updateBottomMenuMove();
	updateMouseUpMenuBehavior();
	updateGiftAnimation();
	updateHeaderBehavior();
});

function updateHeaderBehavior() {
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