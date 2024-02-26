const login = async () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const username = usernameInput.value;
  const password = passwordInput.value;

  document.querySelector(".usernameError").textContent = "";
  document.querySelector(".passwordError").textContent = "";

  if (!username) {
    document.querySelector(".usernameError").textContent =
      "Username không được để trống";
    usernameInput.focus();
    return;
  }
  if (!password) {
    document.querySelector(".passwordError").textContent =
      "Password không được để trống";
    passwordInput.focus();
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/users?username=${username}&password=${password}`,
    );
    const data = await response.json();

    if (data.length > 0) {
      localStorage.setItem("currentUser", JSON.stringify(data[0]));
      alert("Login successful!");
      window.location.href = "./index.html";
    } else {
      alert("Tài khoản hoặc mật khẩu không chính xác ");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
