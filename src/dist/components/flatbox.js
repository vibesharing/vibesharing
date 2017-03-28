var FlatBox = (function() {
  'use strict';
  var FlatBox = function(selector, options) {
    console.log(selector)

    this.selector = selector;
    this.changeSlideSpeed = options.changeSlideSpeed;

    this.init();
  }

  FlatBox.prototype.init = function() {
    var rootElement = this.getRootElement(this.selector);
    console.log(rootElement);
    this.images = this.getImages(rootElement);
    this.currentSlideIndex = 0;

    this.checkKey = this.checkKey.bind(this);
    this.checkSwipe = this.checkSwipe.bind(this);

    this.createLightboxElements();
    this.prepareLightboxElements();
    this.appendLightbox();
    this.hide();
    this.prepareImages();

    window.onresize = this.windowResize.bind(this);
  }

  FlatBox.prototype.setNextSlide = function() {
    var tempPrevSlideElement      = this.prevSlideElement,
        tempCurrentSlideElement   = this.currentSlideElement,
        tempNextSlideElement      = this.nextSlideElement;

    this.currentSlideIndex = this.getNextSlideIndex();
    this.setSlidesIndexes();

    var nextSlideIndex = this.getNextSlideIndex();
    tempPrevSlideElement.src = this.getImage(nextSlideIndex).src;

    this.addClass(tempPrevSlideElement, 'flatbox-next-slide flatbox-slide');
    this.addClass(tempCurrentSlideElement, 'flatbox-prev-slide flatbox-slide');
    this.addClass(tempNextSlideElement, 'flatbox-current-slide flatbox-slide');

    this.prevSlideElement = tempCurrentSlideElement;
    this.currentSlideElement = tempNextSlideElement;
    this.nextSlideElement = tempPrevSlideElement;

    this.setClosePosition();
    this.setArrowsPosition();
    this.bindSwipe();
  }

  FlatBox.prototype.setPrevSlide = function() {
    var tempPrevSlideElement = this.prevSlideElement,
        tempCurrentSlideElement = this.currentSlideElement,
        tempNextSlideElement = this.nextSlideElement;

    this.currentSlideIndex = this.getPrevSlideIndex();
    this.setSlidesIndexes();

    var prevSlideIndex = this.getPrevSlideIndex();
    tempNextSlideElement.src = this.getImage(prevSlideIndex).src;

    this.addClass(tempPrevSlideElement, 'flatbox-current-slide flatbox-slide');
    this.addClass(tempCurrentSlideElement, 'flatbox-next-slide flatbox-slide');
    this.addClass(tempNextSlideElement, 'flatbox-prev-slide flatbox-slide');

    this.prevSlideElement = tempNextSlideElement;
    this.currentSlideElement = tempPrevSlideElement;
    this.nextSlideElement = tempCurrentSlideElement;

    this.setClosePosition();
    this.setArrowsPosition();
    this.bindSwipe();
  }

  FlatBox.prototype.getImage = function(index) {
    return this.images[index];
  }

  FlatBox.prototype.createLightboxElements = function() {
    this.lightboxContainerElement = this.createElement('div');
    this.currentSlideElement = this.createElement('img');
    this.nextSlideElement = this.createElement('img');
    this.prevSlideElement = this.createElement('img');
    this.backgroundOverlayElement = this.createElement('div');
    this.closeButtonElement = this.createElement('i');
    this.nextArrowElement = this.createElement('i');
    this.prevArrowElement = this.createElement('i');

    this.appendChilds(this.lightboxContainerElement,
                      [
                        this.prevSlideElement,
                        this.currentSlideElement,
                        this.nextSlideElement,
                        this.closeButtonElement,
                        this.prevArrowElement,
                        this.nextArrowElement,
                        this.backgroundOverlayElement
                      ]);
  }

  FlatBox.prototype.prepareLightboxElements = function() {
    this.addClass(this.lightboxContainerElement, 'flatbox-container');

    this.addClass(this.prevSlideElement, 'flatbox-prev-slide flatbox-slide');
    this.addClass(this.currentSlideElement, 'flatbox-current-slide flatbox-slide');
    this.addClass(this.nextSlideElement, 'flatbox-next-slide flatbox-slide');

    this.addClass(this.backgroundOverlayElement, 'flatbox-overlay');

    this.addClass(this.closeButtonElement, 'flatbox-close icon-close fa fa-times');
    this.addClass(this.nextArrowElement, 'flatbox-next flatbox-arrow fa fa-chevron-right');
    this.addClass(this.prevArrowElement, 'flatbox-prev flatbox-arrow  fa fa-chevron-left');

    this.bindClick(this.prevArrowElement, this.setPrevSlide);
    this.bindClick(this.nextArrowElement, this.setNextSlide);
    this.bindClick(this.backgroundOverlayElement, this.hide);
    this.bindClick(this.closeButtonElement, this.hide);
  }

  FlatBox.prototype.appendLightbox = function() {
    this.appendToBody(this.lightboxContainerElement);
  }

  FlatBox.prototype.prepareImages = function() {
    var length = this.images.length;

    for(var i = 0; i < length; i++) {
      var image = this.images[i];
      image.setAttribute('data-flatbox', i);
      this.bindClick(image, this.imageClick);
    }
  }

  FlatBox.prototype.imageClick = function(event) {
    var image = event.target;

    this.currentSlideIndex = parseInt(image.getAttribute('data-flatbox'), 10);
    this.setSlidesSources();

    this.show();
  }

  FlatBox.prototype.setSlidesSources = function() {
    var prevSlideIndex = this.getPrevSlideIndex();
    var nextSlideIndex = this.getNextSlideIndex();

    this.addEventListenerOnce(this.currentSlideElement, 'load', function () {
      this.prevSlideElement.src = this.getImage(prevSlideIndex).src;
      this.nextSlideElement.src = this.getImage(nextSlideIndex).src;

      this.setSlidesIndexes();
      this.setClosePosition();
      this.setArrowsPosition();
    }.bind(this));

    this.currentSlideElement.src = this.getImage(this.currentSlideIndex).src;
  }

  FlatBox.prototype.setSlidesIndexes = function() {
    var prevSlideIndex = this.getPrevSlideIndex();
    var nextSlideIndex = this.getNextSlideIndex();

    this.prevSlideElement.setAttribute('data-flatbox', prevSlideIndex);
    this.currentSlideElement.setAttribute('data-flatbox', this.currentSlideIndex);
    this.nextSlideElement.setAttribute('data-flatbox', nextSlideIndex);
  }

  FlatBox.prototype.getNextSlideIndex = function() {
    if (this.isLastSlide(this.currentSlideIndex)) {
      return 0;
    }

    return this.currentSlideIndex + 1;
  }

  FlatBox.prototype.getPrevSlideIndex = function() {
    if (this.isFirstSlide(this.currentSlideIndex)) {
      return this.images.length - 1;
    }

    return this.currentSlideIndex - 1;
  }

  FlatBox.prototype.isLastSlide = function(slide) {
    return slide === this.images.length - 1;
  }

  FlatBox.prototype.isFirstSlide = function(slide) {
    return slide === 0;
  }

  FlatBox.prototype.getImages = function(rootElement) {
    return rootElement.getElementsByTagName('img');
  }

  FlatBox.prototype.getRootElement = function(selector) {
    var element = document.querySelectorAll(selector);

    if (element.length > 1) {throw 'Use an unique selector.'};

    return element[0];
  }

  FlatBox.prototype.createElement = function(tagName) {
    return document.createElement(tagName);
  }

  FlatBox.prototype.appendChilds = function(parent, childs) {
    var length = childs.length;

    for(var i = 0; i < length; i++) {
      parent.appendChild(childs[i]);
    }
  }

  FlatBox.prototype.appendToBody = function(element) {
    document.body.appendChild(element);
  }

  FlatBox.prototype.bindKeydownOnce = function() {
    document.addEventListener('keydown', this.checkKey);
  }

  FlatBox.prototype.unbindKeydown = function() {
    document.removeEventListener('keydown', this.checkKey);
  }

  FlatBox.prototype.windowResize = function() {
    this.setClosePosition();
    this.setArrowsPosition();
  }

  FlatBox.prototype.checkKey = function(e) {
    document.removeEventListener('keydown', this.checkKey);

    var e = e || window.event;

    switch(e.keyCode) {
      case 27:
        this.hide();
        break;
      case 37:
        this.setPrevSlide();
        break;
      case 39:
        this.setNextSlide();
        break;
    }

    setTimeout(function() {
      this.bindKeydownOnce();
    }.bind(this), this.changeSlideSpeed);
  }

  FlatBox.prototype.bindSwipe = function() {
    var currentSlide = this.getCurrentSlide();
    currentSlide.addEventListener('touchstart', this.checkSwipe);
  }

  FlatBox.prototype.unbindSwipe = function() {
    var currentSlide = this.getCurrentSlide();
    currentSlide.removeEventListener('touchstart', this.checkSwipe);
  }

  FlatBox.prototype.checkSwipe = function(event) {
    var startPosition = event.touches[0].clientX,
        endPosition,
        offset;

    this.addEventListenerOnce(document, 'touchmove', function(event) {
      endPosition = event.touches[0].clientX;
      offset = startPosition - endPosition;

      if (offset > 0) this.setNextSlide();
      else if (offset < 0) this.setPrevSlide();
    }.bind(this));
  }

  FlatBox.prototype.setClosePosition = function() {
    var currentSlide = this.getCurrentSlide();
    var slideProperties = this.getSlideProperties(currentSlide);
    var windowProperties = this.getWindowProperties();

    this.closeButtonElement.style.bottom = ((windowProperties.height + slideProperties.height) / 2) + 'px'
    this.closeButtonElement.style.right = ((windowProperties.width - slideProperties.width) / 2) + 'px'
  }

  FlatBox.prototype.setArrowsPosition = function() {
    var currentSlide = this.getCurrentSlide();
    var slideProperties = this.getSlideProperties(currentSlide);
    var windowProperties = this.getWindowProperties();
    var leftArrowWidth = this.prevArrowElement.getBoundingClientRect().width;
    var rightArrowWidth = this.nextArrowElement.getBoundingClientRect().width;

    this.prevArrowElement.style.left = ((((windowProperties.width - slideProperties.width) / 2) - leftArrowWidth) / 2) + 'px'
    this.nextArrowElement.style.right = ((((windowProperties.width - slideProperties.width) / 2) - rightArrowWidth) / 2) + 'px'
  }

  FlatBox.prototype.getSlideProperties = function(slide) {
    return {
      width: slide.getBoundingClientRect().width,
      height: slide.getBoundingClientRect().height,
      src: slide.src
    }
  }

  FlatBox.prototype.getWindowProperties = function() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  FlatBox.prototype.getCurrentSlide = function() {
    return document.querySelector('.flatbox-current-slide');
  }

  FlatBox.prototype.bindClick = function(target, listener) {
    target.addEventListener('click', listener.bind(this));
  }

  FlatBox.prototype.addClass = function(element, className) {
    element.className = className;
  }

  FlatBox.prototype.insertHTML = function(element, text) {
    element.innerHTML = text;
  }

  FlatBox.prototype.addEventListenerOnce = function(target, type, listener) {
    target.addEventListener(type, function fn(event) {
      target.removeEventListener(type, fn);
      listener(event);
    });
  }

  FlatBox.prototype.hide = function() {
    this.addClass(this.lightboxContainerElement, 'flatbox-container hidden');
    this.unbindKeydown();
    this.unbindSwipe();
  }

  FlatBox.prototype.show = function() {
    this.addClass(this.lightboxContainerElement, 'flatbox-container');
    this.bindKeydownOnce();
    this.bindSwipe();
  }

  return FlatBox;
}());
