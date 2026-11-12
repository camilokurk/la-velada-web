
const ticketType = document.getElementById("ticket-type");
const quantity = document.getElementById("quantity");
const total = document.getElementById("total");
const form = document.getElementById("ticket-form");

function calculateTotal() {
    const price = Number(ticketType.value);
    const amount = Number(quantity.value);

    const result = price * amount;

    total.textContent = result.toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR"
    });
}

ticketType.addEventListener("change", calculateTotal);
quantity.addEventListener("input", calculateTotal);

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!form.reportValidity()) {
        return;
    }

    const confirmation = confirm(
        "¿Confirmas tu selección de entradas por " +
        total.textContent + "?"
    );

    if (confirmation) {
        document.getElementById("confirmation-message").textContent =
            "¡Solicitud confirmada! Gracias por elegir Night Clash 2027.";
    }
});