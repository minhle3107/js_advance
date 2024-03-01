const url = "http://localhost:3000/products";

const fetchProducts = async () => {
  const response = await fetch(url);
  return response.json();
};

// (async () => {
//   const data = await fetchProducts();
//   console.log(data);
// })();

const deleteProduct = async (id) => {
  await fetch(`${url}/${id}`, { method: "DELETE" });
  alert("Bạn đã xóa thành công");
  await render();
};

const render = async () => {
  const showProduct = document.querySelector(".show__product");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "./login.html";
  }

  const data = await fetchProducts();
  // console.log(data);
  showProduct.innerHTML = data
    .map(
      (pro) => `<tr>
        <td>${pro.id}</td>
        <td>${pro.name}</td>
        <td>${pro.price}</td>
        <td>
          <a href="./edit.html?id=${pro.id}"><button class="btn btn-warning">Update</button></a>
          <button data-id="${pro.id}" class="btn btn-danger btn__delete">Delete</button>
        </td>
      </tr>`,
    )
    .join("");
  document.querySelectorAll(".btn__delete").forEach((btnDel) => {
    btnDel.addEventListener("click", () => {
      const id = btnDel.dataset.id;
      confirm("Bạn có muốn xóa vĩnh viễn sản phẩm này không?") &&
        deleteProduct(id);
    });
  });
};

document.addEventListener("DOMContentLoaded", render);
const logout = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "./login.html";
};
