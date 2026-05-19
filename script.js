const input = document.querySelector("#nameInput");
const nameSlots = document.querySelectorAll("[data-name]");

function syncName() {
  const value = input.value.trim() || "〇〇";
  nameSlots.forEach((slot) => {
    slot.textContent = value;
  });
}

input.addEventListener("input", syncName);
syncName();
