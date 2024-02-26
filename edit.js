const edit = document.querySelector("#edit");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function fetchDataAndUpdateForm() {
  const response = await fetch(`http://localhost:3000/products/${id}`);
  const data = await response.json();
  document.querySelector("#pdName").value = data.name;
  document.querySelector("#pdPrice").value = data.price;
}

async function updateProduct(e) {
  e.preventDefault();
  const pdName = document.querySelector("#pdName").value.trim();
  const pdPrice = document.querySelector("#pdPrice").value.trim();
  const errors = {};

  if (!pdName) errors.nameError = "Bạn không được để trống tên sản phẩm";
  if (!pdPrice) errors.priceError = "Bạn không được để trống tiền sản phẩm";

  if (Object.keys(errors).length) {
    for (const key in errors) {
      document.querySelector(`.${key}`).textContent = errors[key];
    }
    return;
  }

  const userData = { name: pdName, price: pdPrice };
  await fetch(`http://localhost:3000/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  location.reload();
  location.href = "./index.html";
  alert("Cập nhật thành công");
}

edit.addEventListener("submit", updateProduct);
fetchDataAndUpdateForm().then((r) => r);
