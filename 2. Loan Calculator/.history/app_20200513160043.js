// Calculate event
document.getElementById("loan-form").addEventListener("submit", calculate);

function calculate(e) {
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    showError("Please, check your numbers");
  }

  e.preventDefault();
}

function showError(msg) {
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Create alert
  const error = document.createElement("div");

  // Add class
  error.className = "alert alert-danger";

  error.appendChild(document.createTextNode(msg));

  card.insertBefore(error, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
