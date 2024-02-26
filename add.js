const add = document.querySelector("#add");

add.addEventListener("submit", async (e) => {
  e.preventDefault();
  const pdNameInput = document.querySelector("#pdName");
  const pdPriceInput = document.querySelector("#pdPrice");
  const pdName = pdNameInput.value.trim();
  const pdPrice = pdPriceInput.value.trim();
  const errors = {};

  document.querySelector(".nameError").textContent = "";
  document.querySelector(".priceError").textContent = "";

  if (!pdName) {
    errors.nameError = "Bạn không được để trống tên sản phẩm";
    pdNameInput.focus();
  }
  if (!pdPrice) {
    errors.priceError = "Bạn không được để trống tiền sản phẩm";
    if (!errors.nameError) pdPriceInput.focus();
  }
  if (pdPrice && parseFloat(pdPrice) <= 0) {
    errors.priceError = "Giá sản phẩm phải là số dương";
    if (!errors.nameError) pdPriceInput.focus();
  }

  if (Object.keys(errors).length) {
    for (const key in errors) {
      document.querySelector(`.${key}`).textContent = errors[key];
    }
    return;
  }

  const userData = { name: pdName, price: pdPrice };
  await fetch(`http://localhost:3000/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  location.reload();
  location.href = "./index.html";
  alert("Add thành công");
});
