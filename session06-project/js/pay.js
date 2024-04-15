const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const UserLoginElement = document.getElementById("userLogin");
const signElement = document.getElementById("sign");
const accElement = document.getElementById("acc");
const deleteElement = document.getElementById("out");
const users = JSON.parse(localStorage.getItem("users"));
let products = JSON.parse(localStorage.getItem("products"));

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
let sum = 0;
let totalPaymentAll = 0;

if (userLogin) {
    signElement.style.display = "none";
    accElement.style.display = "block";
    UserLoginElement.innerHTML = userLogin.userAcc;
} else {
    accElement.style.display = "none";
}
deleteElement.addEventListener('click', function(){
    localStorage.removeItem("userLogin");
});

function renderbuy(){
    const selectedProducts = JSON.parse(localStorage.getItem("selectedProducts"));
    let elements = "";
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == userLogin.id) {
                elements +=
                        `
                    <div id="buy_all">
                        <div>Tổng thanh toán:</div>
                        <div>${VND.format(selectedProducts.totalPaymentAll)}</div>
                        <button onclick="pay()">Đặt hàng</button>
                    </div>
                        `
            }
        }
        document.getElementById("totalPayment").innerHTML=elements;   
}
renderbuy();

function pay() {
    const sdt = document.getElementById("sdt");
    const addressInput = document.getElementById("addressInput");

    if (sdt.value && addressInput.value ) {
        Swal.fire({
            icon: 'success',
            title: 'Đặt hàng thành công',
            showConfirmButton: false,
            timer: 1500 
        }).then(() => {
            window.location.href = "/index.html";
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Hãy điền đầy đủ thông tin',
            text: 'Vui lòng nhập địa chỉ giao hàng và thông tin hóa đơn'
        });
    }
}
