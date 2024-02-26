const add = document.querySelector("#add");

add.addEventListener("submit", async (e) => {
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
  await fetch(`http://localhost:3000/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  location.reload();
  location.href = "./index.html";
  alert("Add thành công");
});
