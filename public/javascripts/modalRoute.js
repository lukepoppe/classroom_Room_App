console.log('modalRoutes.js is loaded');

function loadModal() {
    $('.helpModal').load('helpModal.html', function () {
        console.log('helpModal.html is loaded');
        helpModal();
    });
}