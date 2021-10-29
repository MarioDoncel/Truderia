const modalOverlay = document.querySelector('.modalOverlay')
const modalContent = document.querySelector('#modalContent')

function modalOpen(content, contentClass) {
    modalOverlay.classList.add('active')
    modalContent.classList.add(contentClass)
    modalContent.innerHTML = content
}
function alertOpen(content, contentClass, pageHeight) {
    modalOverlay.classList.add('active')
    modalContent.classList.add(contentClass)
    modalContent.innerHTML = `
    <h3>${content}</h3>
    <div class="buttons">
        <button onclick="alertClose()">Ok</button>
    </div>`
    document.querySelector('.closeModal').classList.add('hide')
    window.scrollTo(0,document.querySelector(pageHeight).scrollHeight)
}
function modalClose() {
    modalOverlay.classList.remove('active')
    modalContent.removeAttribute("class")
    document.querySelector('.closeModal').classList.remove('hide')
    modalContent.innerHTML = ""
    loadFixedCart()
}
function alertClose() {
    modalOverlay.classList.remove('active')
    modalContent.removeAttribute("class")
    document.querySelector('.closeModal').classList.remove('hide')
    modalContent.innerHTML = ""
}

