window.onload = function() {

	/**
	 * Динамичный паддинг для body
	 */
	bodyPTInit()
	function bodyPTInit() {
		let headerHeight = document.getElementById('js-header').offsetHeight
		document.getElementsByTagName('body')[0].style.cssText = `padding-top: ${ headerHeight }px`
	}
	window.addEventListener('resize', bodyPTInit)

	/**
	 * Скрывание хэдера при скроле вниз и раскрытие при скроле верх
	 */
	let scrollPosition = 0

	window.onscroll = function() {
		let sTop = window.scrollY

		if (sTop > scrollPosition) {
			document.getElementById('js-header').style.cssText = `top: -100%`
		} else {
			document.getElementById('js-header').style.cssText = `top: 0`
		}

		scrollPosition = sTop
	}

	/**
	 * Якори
	 */
	for (item of document.getElementsByClassName('anchor_item')) {
		item.addEventListener('click', function(e) {
			e.preventDefault()
			let id = e.target.getAttribute('href').substring(1)

			if (document.getElementById(id)) {
				document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
			}
		})
	}

	/**
	 * Swiper
	 */
	let thumbsSwiper = new Swiper('#js-swiperThumbs', {
		slidesPerView: 1,
		navigation: {
			prevEl: document.getElementById('js-swiperThumbsNavigationPrev'),
			nextEl: document.getElementById('js-swiperThumbsNavigationNext')
		},
		on: {
			init: function() {
				document.getElementById('js-swiperInfoCounter').innerText = `${ this.activeIndex + 1 }/${ this.slides.length }`
			},
			slideChange: function() {
				document.getElementById('js-swiperInfoCounter').innerText = `${ this.activeIndex + 1 }/${ this.slides.length }`
			},
			transitionStart: function() {
				if (mainSwiper) mainSwiper.slideTo(this.activeIndex)
			}
		}
	})

	let mainSwiper = new Swiper('#js-swiperMain', {
		slidesPerView: 1,
		thumbs: {
			swiper: thumbsSwiper
		},
		pagination: {
			el: '#js-swiperMainPagination',
			type: 'bullets',
		},
	})

	/**
	 * Promo блоки, открытие/закрытие
	 */
	for (let item of document.getElementsByClassName('promo')) {
		let parent = item
		let promoItems = item.querySelectorAll('.promo_item')

		for (let pItem of promoItems) {
			pItem.addEventListener('click', function(e) {
				if (document.documentElement.clientWidth >= 688) {
					if (!e.target.classList.contains('active')) {
						for (let deactItem of parent.querySelectorAll('.promo_item')) {
							deactItem.classList.remove('active')
						}
	
						parent.children[0].classList.add('collapsed')
						e.target.classList.add('active')
					} else {
						parent.children[0].classList.remove('collapsed')
						e.target.classList.remove('active')
					}
				}
			})
		}

		window.addEventListener('resize', function() {
			if (document.documentElement.clientWidth < 688) {
				item.querySelector('.promo_list').classList.remove('collapsed')
				for (let i of item.querySelectorAll('.promo_item')) {
					i.classList.remove('active')
				}
			}
		})
	}

	/**
	 * Swiper Промо блок с брейкпоинтом 688
	 */
	( function() {
		let promoSwiper = null

		if (document.documentElement.clientWidth < 688) {
			initPromoSwiper()
		}

		window.addEventListener('resize', function() {
			if (!document.documentElement.clientWidth <= 688) {

				if (promoSwiper || !promoSwiper.destroyed) {
					promoSwiper.destroy(true, true)
				} else if (promoSwiper ) {
					initPromoSwiper()
				}

			}
		})

		function initPromoSwiper() {
			promoSwiper = new Swiper('#js-promoSwiper', {
				slidesPerView: 1,
				pagination: {
					el: '#js-promoSwiperPagination',
					type: 'bullets'
				}
			})
		}
	})()
}