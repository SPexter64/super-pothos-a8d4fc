// SIDEBAR TOGGLE
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}

// PAGE NAVIGATION
const menuItems = document.querySelectorAll(".menu li");
const pages = document.querySelectorAll(".page");
const title = document.getElementById("current-page-title");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.hasAttribute("data-page")) {
      // Remove active class from current menu and add to clicked one
      document.querySelector(".menu li.active").classList.remove("active");
      item.classList.add("active");

      const target = item.getAttribute("data-page");

      // Hide all pages
      pages.forEach((p) => {
        p.classList.remove("active");
        p.style.display = "none";
      });

      // Show target page
      const activePage = document.getElementById(target);
      if (activePage) {
        activePage.classList.add("active");
        activePage.style.display = "block";
        title.innerText = item.querySelector(".nav-text").innerText;
      }
    }
  });
});

// PROFILE MANAGEMENT
function saveProfile() {
  const newName = document.getElementById("inputName").value;
  if (newName.trim() !== "") {
    localStorage.setItem("userFullName", newName);
    loadProfile();
    alert("Profile saved successfully!");
  }
}

function loadProfile() {
  let savedName = localStorage.getItem("userFullName");

  if (!savedName || savedName === "None" || savedName === "null") {
    savedName = "Emil John";
  }

  // Mag update lahat ng text elements sa UI
  document
    .querySelectorAll(".userNameSpan")
    .forEach((el) => (el.innerText = savedName));

  const headerName = document.getElementById("headerNameDisplay");
  if (headerName) headerName.innerText = savedName;

  const inputNameField = document.getElementById("inputName");
  if (inputNameField) inputNameField.value = savedName;

  // udo ang Avatar Initials (e.g., "Emil John" -> "EJ")
  const avatar = document.getElementById("avatarDisplay");
  if (avatar) {
    const initials = savedName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
    avatar.innerText = initials;
  }
}

// ACCOUNTS LOGIC
const tuition = 10800;
const payments = [3000]; // Sample payment array

function updateBalance() {
  const totalPaidDisplay = document.getElementById("totalPaidDisplay");
  const balanceDisplay = document.getElementById("balanceDisplay");

  if (totalPaidDisplay && balanceDisplay) {
    let totalPaid = payments.reduce((a, b) => a + b, 0);
    totalPaidDisplay.innerText = "₱" + totalPaid.toLocaleString() + ".00";
    balanceDisplay.innerText =
      "₱" + (tuition - totalPaid).toLocaleString() + ".00";
  }
}

function viewReceipt(ref, amt, date) {
  document.getElementById("r-ref").innerText = ref;
  document.getElementById("r-amt").innerText = "₱" + amt;
  document.getElementById("r-date").innerText = date;
  document.getElementById("receiptModal").style.display = "block";
}

function closeModal() {
  document.getElementById("receiptModal").style.display = "none";
}

// SEARCH FILTER
document.addEventListener("input", (e) => {
  if (e.target.id === "subjectSearch") {
    let filter = e.target.value.toUpperCase();
    let list = document.getElementById("subjectList");
    if (list) {
      let rows = list.getElementsByTagName("tr");
      for (let i = 0; i < rows.length; i++) {
        let rowText = rows[i].textContent || rows[i].innerText;
        rows[i].style.display =
          rowText.toUpperCase().indexOf(filter) > -1 ? "" : "none";
      }
    }
  }
});

// INITIALIZE (TYPING EFFECT)
const typingText = "Greetings Fellow GRCian!!";
let charIdx = 0;

function type() {
  const typingElement = document.getElementById("typing-text");
  if (typingElement && charIdx < typingText.length) {
    typingElement.innerHTML += typingText.charAt(charIdx);
    charIdx++;
    setTimeout(type, 100);
  }
}

// ON LOAD
window.onload = () => {
  type();
  loadProfile();
  updateBalance();
};
