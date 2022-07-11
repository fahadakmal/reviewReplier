



const login = () => {
  auth_loader.style.display = "block";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);

  axios
    .post("/auth/login", { email, password })
    .then((res) => {
      if (res.data.success == true) {
        localStorage.setItem("auth_token", res.data.token);
        demo.showNotification("top", "right", "LOGIN SUCCESS", 2);
        setTimeout(() => (window.location.href = ""), 1000);
      } else {
        auth_loader.style.display = "none";
        demo.showNotification("top", "right", "Some Error Occured", 4);
      }
    })
    .catch((err) => {
      console.log();
      if (err.response.status >= 400 && err.response.status < 500) {
        auth_loader.style.display = "none";
        demo.showNotification("top", "right", build_error_message(err.response.data), 4);
        // alert(build_error_message(err.response.data));
      }
    });
};
