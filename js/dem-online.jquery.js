(function ($) {
  init();

  let $modal;
  let $donateCTA;
  let $donateCTAToggle;
  const COOKIE_KEY_PREFIX = 'wp-dem-online-';
  const SESSION_KEY_PREFIX = 'wp-dem-online-';
  const DONATE_BAR_SESSION_KEY = 'donate-bar-closed';

  function setSessionStorage() {
    const donateBarSessionItem = getSessionItem(DONATE_BAR_SESSION_KEY);

    if (null !== donateBarSessionItem) {
      return;
    }

    setSessionItem(DONATE_BAR_SESSION_KEY, false);
  }

  function prepareUI() {
    const donateBarSessionItem = getSessionItem(DONATE_BAR_SESSION_KEY);

    // "Clicks" should only happen on load for pages without a modal/popup
    if (!donateBarSessionItem) {
      $donateCTAToggle.click();
    }
  }

  function bindEvents() {
    /**
     * Handle when the Modal element has been closed.
     */
    $modal.on('modalClosed', function () {
      setCookie('modal-closed', 'true', 1);
    });

    /**
     * Handle when the DonateBar element has been closed.
     */
    $donateCTA.on('donateBarCTAClosed', function () {
      const donateBarSessionItem = getSessionItem(DONATE_BAR_SESSION_KEY);

      if (donateBarSessionItem) {
        return;
      }

      setSessionItem(DONATE_BAR_SESSION_KEY, true);
    });
  }

  /**
   * Set cookie based on passed in key, value and expiration (in days).
   *
   * @param {string} key
   * @param {string} value
   * @param {number} expiry
   */
  function setCookie(key, value, expiry) {
    const expires = new Date();

    expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);

    document.cookie =
      COOKIE_KEY_PREFIX +
      key +
      '=' +
      value +
      ';expires=' +
      expires.toUTCString() +
      ';path=/';
  }

  /***
   * Retrieve cookie from `document.cookie` based on passed on key.
   *
   * @param {string} key
   * @return {string}
   */
  function getCookie(key) {
    if (0 === document.cookie.length) {
      return '';
    }

    let cookieStartIndex = document.cookie.indexOf(key + '=');

    if (-1 === cookieStartIndex) {
      return '';
    }

    cookieStartIndex = cookieStartIndex + key.length + 1;
    let cookieEndIndex = document.cookie.indexOf(';', cookieStartIndex);

    if (-1 === cookieEndIndex) {
      cookieEndIndex = document.cookie.length;
    }

    return decodeURIComponent(
      document.cookie.substring(cookieStartIndex, cookieEndIndex)
    );
  }

  /**
   * A setter function for setting an item in `sessionStorage`
   *
   * @param {string} key
   * @param {*} value
   */
  function setSessionItem(key, value) {
    sessionStorage.setItem(SESSION_KEY_PREFIX + key, value);
  }

  /**
   * A getter function for retrieving an item from `sessionStorage`
   *
   * @param {string} key
   *
   * @return {*|null}
   */
  function getSessionItem(key) {
    const sessionItem = sessionStorage.getItem(SESSION_KEY_PREFIX + key);

    if ('false' === sessionItem) {
      return false;
    }

    if ('true' === sessionItem) {
      return true;
    }

    return sessionItem;
  }

  function init() {
    $(window).on('load', function () {
      $modal = $('#modal');
      $donateCTA = $('#donateBarBody');
      $donateCTAToggle = $('#collapseDonateBarCTA');

      setSessionStorage();
      prepareUI();
      bindEvents();
    });
  }
})(jQuery);
