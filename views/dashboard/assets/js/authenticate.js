window.onload = () => {
  const path = window.location.pathname;
  const token = localStorage.getItem("auth_token");
  const auth_loader = document.getElementById("auth_loader");
  auth_loader.style.display = "block";

  if (!token && !path.includes("/auth/login")) {
    window.location.href = "/auth/login";
  }

  if (token) {
    axios({
      method: "get",
      url: "/auth/authenticate",
      headers: { Authorization: token },
    })
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("admin", JSON.stringify(res.data));
        axios.defaults.headers.common["authorization"] = token;
        if (path.includes("/auth/login"))
          window.location.href = "/";
        else {
          auth_loader.style.display = "none";
          // demo.showNotification("top", "right", "session validated", 2);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (!path.includes("/auth/login")) {
          demo.showNotification("top", "right", "session expired", 4);
          setTimeout(() => (window.location.href = "/auth/login"), 1500);
        } else auth_loader.style.display = "none";
      });
  } else auth_loader.style.display = "none";
};
