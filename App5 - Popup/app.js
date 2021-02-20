const openModalButton = document.querySelector('[data-modal-target]');
const closeModalButton = document.querySelector('[data-close-button]');
const overlay = document.getElementById('overlay');



openModalButton.addEventListener('click', function () {
    const modal = document.querySelector(this.dataset.modalTarget);

    openModal(modal);
});

closeModalButton.addEventListener('click', function () {
    const modal = this.closest('.modal');
    closeModal(modal);
});


overlay.addEventListener('click', () => {
    closeModal(modal);
});

function openModal(modal) {
    if (modal == null)
        return;

    modal.classList.add('active');
    overlay.classList.add('active');
}


function closeModal(modal) {
    if (modal == null)
        return;

    modal.classList.remove('active');
    overlay.classList.remove('active');
}


window.addEventListener('load', () => {
    modal.style.transition = 'transform 300ms';
    overlay.style.transition = 'opacity 300ms';
});