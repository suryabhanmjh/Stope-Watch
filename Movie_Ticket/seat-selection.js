const seatContainer = document.getElementById("seat-container");
const selectedCount = document.getElementById("selected-count");
const totalAmount = document.getElementById("total-amount");

const seatPrice = 200;
let selectedSeats = [];

const totalSeats = 80;
const bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

for (let i = 1; i <= totalSeats; i++) {
  const seat = document.createElement("div");
  seat.classList.add("seat");
  seat.innerText = i;

  if (bookedSeats.includes(i)) {
    seat.classList.add("booked");
  }

  seat.addEventListener("click", () => {
    if (seat.classList.contains("booked")) return;

    seat.classList.toggle("selected");

    const seatNum = i;
    if (selectedSeats.includes(seatNum)) {
      selectedSeats = selectedSeats.filter((s) => s !== seatNum);
    } else {
      selectedSeats.push(seatNum);
    }

    selectedCount.innerText = selectedSeats.length;
    totalAmount.innerText = selectedSeats.length * seatPrice;
  });

  seatContainer.appendChild(seat);
}

function confirmBooking() {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  const updatedBookings = [...bookedSeats, ...selectedSeats];
  localStorage.setItem("bookedSeats", JSON.stringify(updatedBookings));

  alert(`Booking Confirmed for ${selectedSeats.length} seat(s)!`);
  window.location.href = "bookings.html";
}
