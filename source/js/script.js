'use strict';
// header
{
  const header = document.querySelector('.page-header');
  const toggler = header.querySelector('.toggler');
  const pageNav = header.querySelector('.page-nav');

  const toggleActiveState = () => {
    if (!toggler.classList.contains('toggler--active')) {
      toggler.classList.add('toggler--active');
      toggler.setAttribute('aria-expanded', true);
    } else {
      toggler.classList.remove('toggler--active');
      toggler.setAttribute('aria-expanded', false);
    }
  };

  const toggleMenuState = () => {
    pageNav.classList.contains('page-nav--opened') ?
      pageNav.classList.remove('page-nav--opened') :
      pageNav.classList.add('page-nav--opened');
  };

  const onTogglerClickMenuToggle = () => {
    toggleActiveState();
    toggleMenuState();
  };

  const onLinkClickCloseMenu = (evt) => {
    if (evt.target.classList.contains('page-nav__link')) {
      onTogglerClickMenuToggle();
    }
  };

  toggler.addEventListener('click', onTogglerClickMenuToggle);
  pageNav.addEventListener('click', onLinkClickCloseMenu);

  if (header.classList.contains('page-header--nojs')) {
    header.classList.remove('page-header--nojs');
  }

}

// modal
{
  const TEL_INPUT_VALUE = '+7';
  const TEL_LENGTH = 12;

  const buyButtons = document.querySelectorAll('.button--buy');
  const buyModal = document.querySelector('.modal--buy');
  const closeButton = buyModal.querySelector('.modal-close');
  const modalInner = buyModal.querySelector('.modal-inner');

  const form = modalInner.querySelector('.modal-form');
  const telInput = form.querySelector('.modal-input--tel');
  const mailInput = form.querySelector('.modal-input--email');

  const successModal = document.querySelector('.modal--success');

  let errors = {};
  let user = {};


  const onButtonClickModalOpen = (evt) => {
    evt.preventDefault();
    if (!buyModal.classList.contains('modal--show')) {
      buyModal.classList.add('modal--show');
      window.utils.setInputValuesFromLocalStorage(telInput, mailInput);
    }

    document.addEventListener('keydown', onEscModalClose);
  };

  const onEscModalClose = (evt) => {
    window.utils.onEscButtonPressModalClose(evt);
  };

  const onCloseButtonModalClose = () => {
    window.utils.onCloseButtonModalClose(buyModal);
  };

  const onOuterModalClickCloceModal = (evt) => {
    window.utils.onOverLayClickModalClose(buyModal, modalInner, evt);
  };

  // валидация

  const onTelInputFocusSetValue = () => {
    if (telInput.value.length < 2) {
      window.utils.setInputValue(TEL_INPUT_VALUE, telInput);
    }

    window.utils.resetInputError(telInput);
  };

  const onEmailInputFocusResetError = () => {
    window.utils.resetInputError(mailInput);
  };

  const onTelInputChange = () => {
    window.utils.validateTelNumber(telInput, errors, TEL_LENGTH);
  };

  const onEmailInputChange = () => {
    window.utils.validateEmail(mailInput, errors);
  };

  const onFormSubmit = (evt) => {
    if (errors.tel || errors.email) {
      evt.preventDefault();
    } else {
      evt.preventDefault();
      successModal.classList.add('modal--show');
      document.addEventListener('keydown', onEscModalClose);
      closeButton.addEventListener('click', onCloseButtonModalClose);
      window.utils.setLocalStorage('tel', telInput.value, user);
      window.utils.setLocalStorage('email', mailInput.value, user);
      form.reset();
      buyModal.classList.remove('modal--show');
    }
  };

  const onOuterModalClickCloseModal = (evt) => {
    window.utils.onOverLayClickModalClose(successModal, modalInner, evt);
  };

  form.addEventListener('submit', onFormSubmit);
  telInput.addEventListener('change', onTelInputChange);
  telInput.addEventListener('blur', onTelInputChange);
  mailInput.addEventListener('change', onEmailInputChange);
  mailInput.addEventListener('blur', onEmailInputChange);
  telInput.addEventListener('focus', onTelInputFocusSetValue);
  mailInput.addEventListener('focus', onEmailInputFocusResetError);
  successModal.addEventListener('click', onOuterModalClickCloseModal);

  buyModal.addEventListener('click', onOuterModalClickCloceModal);
  buyButtons.forEach((it) => {
    it.addEventListener('click', onButtonClickModalOpen);
  });
  closeButton.addEventListener('click', onCloseButtonModalClose);

}
