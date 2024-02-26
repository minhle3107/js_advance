const render = async () => {
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
      ({ name, price, id }) => `
      <tr>
        <td>${name}</td>
        <td>${price}</td>
        <td>
          <a href="./edit.html?id=${id}"><button class="btn btn-warning">Update</button></a>
          <button data-id="${id}" class="btn btn-danger btn__delete">Delete</button>
        </td>
      </tr>
    `,
    )
    .join("");

  document.querySelectorAll(".btn__delete").forEach((btn) => {
    btn.addEventListener("click", deleteProduct);
  });
};

const deleteProduct = async (e) => {
  e.preventDefault();
  if (confirm("Bạn chắc chứ ?")) {
    await fetch(`http://localhost:3000/products/${e.target.dataset.id}`, {
      method: "DELETE",
    });
    await render();
  }
};

document.addEventListener("DOMContentLoaded", render);

const logout = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "./login.html";
};
