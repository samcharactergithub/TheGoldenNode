(function() {
    "use strict";

    const donateBarBody = document.getElementById("donateBarBody"),
          collapseDonateBarCTA = document.getElementById("collapseDonateBarCTA"),
          donateButtonWrap = document.getElementsByClassName("donate__button-body-wrap"),
          modalBody = document.getElementById("modal"),
          closeModal = document.getElementById("closeModal"),
          bodyFreezeClass = "dem__body--freeze";

    collapseDonateBar();
    modal();

    window.onscroll = function() {
        collapseDonateBar();
    };

    function collapseDonateBar() {
        if (!collapseDonateBarCTA) return;
        collapseDonateBarCTA.onclick = function() {
            if(collapseDonateBarCTA.classList.contains("donate__toggle--closed")) {
                collapseDonateBarCTA.classList.remove("donate__toggle--closed");
                donateBarBody.classList.remove("donate__body-wrap--hidden");
            } else {
                collapseDonateBarCTA.classList.add("donate__toggle--closed");
                donateBarBody.classList.add("donate__body-wrap--hidden");

                // Create custom event to know when Donate Bar has been closed.
                const event = new CustomEvent('donateBarCTAClosed');

                // Dispatch the event.
                donateBarBody.dispatchEvent(event);
            }
        }

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            collapseDonateBarCTA.classList.add("donate__toggle--closed");
            donateBarBody.classList.add("donate__body-wrap--hidden");
        }
    }

    function modal() {
        if (modalBody) {
            document.body.classList.add(bodyFreezeClass);
            closeModal.onclick = function() {
                document.body.classList.remove(bodyFreezeClass);
                modalBody.style.display = "none";

                // Create custom event to know when the Modal has been closed.
                const event = new CustomEvent('modalClosed');

                // Dispatch the event.
                modalBody.dispatchEvent(event);
            }

            window.onkeydown = function( event ) {
                if ( event.keyCode == 27 ) {
                    document.body.classList.remove(bodyFreezeClass);
                    modalBody.style.display = "none";

                    // Create custom event to know when the Modal has been closed.
                    const event = new CustomEvent('modalClosed');

                    // Dispatch the event.
                    modalBody.dispatchEvent(event);
                }
            };
        }
    }
})();
