(()=>{const e=document.querySelector(".modalOverlay"),o=document.querySelector("#modalContent");window.modalOpen=(t,s)=>{e.classList.add("active"),o.classList.add(s),o.innerHTML=t},window.alertOpen=(t,s,l)=>{e.classList.add("active"),o.classList.add(s),o.innerHTML=`\n    <h3>${t}</h3>\n    <div class="buttons">\n        <button onclick="alertClose()">Ok</button>\n    </div>`,document.querySelector(".closeModal").classList.add("hide"),window.scrollTo(0,document.querySelector(l).scrollHeight)},window.modalClose=()=>{e.classList.remove("active"),o.removeAttribute("class"),document.querySelector(".closeModal").classList.remove("hide"),o.innerHTML="",loadFixedCart()},window.alertClose=()=>{e.classList.remove("active"),o.removeAttribute("class"),document.querySelector(".closeModal").classList.remove("hide"),o.innerHTML=""}})();
//# sourceMappingURL=modal.bundle.js.map