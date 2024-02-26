async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Username và password không đuộc để trống");
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
}
