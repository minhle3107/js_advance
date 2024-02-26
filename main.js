document.addEventListener("DOMContentLoaded", render);

async function render() {
  const showProduct = document.querySelector(".show__product");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const logoutBtn = document.getElementById("logoutBtn");

  if (!currentUser) {
    logoutBtn.style.display = "none";
    window.location.href = "./login.html";
    return;
  }

  logoutBtn.style.display = "block";

  const response = await fetch(`http://localhost:3000/products`);
  const data = await response.json();

  showProduct.innerHTML = data
    .map(
      (item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <a href="./edit.html?id=${item.id}"><button class="btn btn-warning">Update</button></a>
          <button data-id="${item.id}" class="btn btn-danger btn__delete">Delete</button>
        </td>
      </tr>
    `,
    )
    .join("");

  document.querySelectorAll(".btn__delete").forEach((item) => {
    item.addEventListener("click", async (e) => {
      e.preventDefault();
      if (confirm("Bạn chắc chứ ?")) {
        await fetch(`http://localhost:3000/products/${item.dataset.id}`, {
          method: "DELETE",
        });
        await render();
      }
    });
  });
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "./login.html";
}
