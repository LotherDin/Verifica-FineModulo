document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
  });
  
  function login() {
    const usernameInput = document.getElementById("usernameInput").value;
    if (usernameInput.trim() === "") {
      alert("Inserisci un username valido");
      return;
    }
  
    const loginTime = new Date();
    const loginData = { username: usernameInput, time: loginTime.toString() };
  
    const loginHistory = JSON.parse(localStorage.getItem("loginHistory")) || [];
  
    const existingUserIndex = loginHistory.findIndex(entry => entry.username === usernameInput);
  
    let updatedLoginHistory;
  
    if (existingUserIndex !== -1) {
      const existingUser = loginHistory[existingUserIndex];
      updatedLoginHistory = [
        ...loginHistory.slice(0, existingUserIndex),
        {
          ...existingUser,
          count: (existingUser.count || 0) + 1,
          time: loginTime.toString()
        },
        ...loginHistory.slice(existingUserIndex + 1)
      ];
    } else {
      updatedLoginHistory = [
        ...loginHistory,
        { ...loginData, count: 1 }
      ];
    }
  
    localStorage.setItem("loginHistory", JSON.stringify(updatedLoginHistory));
  
    showLoginList(updatedLoginHistory);
  
    document.getElementById("login-container").style.display = "none";
    document.getElementById("logout-container").style.display = "block";
  }
  
  function showLoginList(loginHistory) {
    const loginList = document.getElementById("login-list");
    loginList.innerHTML = "";
  
    loginHistory.forEach((loginData) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${loginData.username} (Login #${loginData.count}) - ${loginData.time}`;
      loginList.appendChild(listItem);
    });
  }
  
  function checkLoginStatus() {
    const loginHistory = JSON.parse(localStorage.getItem("loginHistory")) || [];
  
    if (loginHistory.length > 0) {
      showLoginList(loginHistory);
      document.getElementById("login-container").style.display = "none";
      document.getElementById("logout-container").style.display = "block";
    }
  }
  
  function logout() {
    document.getElementById("logout-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
  }
  