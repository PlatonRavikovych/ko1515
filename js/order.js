'use strict';
/**
 * Місія 05 — учнівський файл. Це НЕ готове рішення.
 * Місія 04 (фільтри) вже працює у js/app.js.
 * TODO-A: зв'язок картки страви з формою (частково підготовлений).
 * TODO-Б: самостійна перевірка кількості; без готового розв'язку.
 * TODO-В: валідація, підсумок і стани форми.
 */
const orderForm = document.getElementById('orderForm');
const selectedDishInput = document.getElementById('selectedDish');
const orderPrice = document.getElementById('orderPrice');
const orderSummary = document.getElementById('orderSummary');
let selectedDish = null;
function isValidQuantity(value) {
    if (String(value).trim() === '')
        return false;
    const quantity = Number(value);
    return Number.isInteger(quantity) && quantity >= 1 && quantity <= 5;
}
function selectDish(dish) {
    // Інкремент А: кнопка вже передає сюди об'єкт страви.
    // TODO: збережіть dish, відобразіть назву, оновіть вартість.
    selectedDish = dish;
    selectedDishInput.value = dish.name;
    orderPrice.textContent = `Ціна за порцію: ${dish.price} грн`;
    setFieldError('selectedDish', '');
    orderSummary.hidden = true;
    document.getElementById('order').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function setFieldError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(({ studentName: 'nameError', studentClass: 'classError', selectedDish: 'dishError', quantity: 'quantityError' })[fieldId]);
    input.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
}
function validateOrder() {
    const name = document.getElementById('studentName').value.trim();
    const studentClass = document.getElementById('studentClass').value;
    const quantity = document.getElementById('quantity').value;

    setFieldError('studentName', !name ? "Введіть ім'я." : name.length < 2 ? 'Введіть щонайменше два символи.' : '');
    setFieldError('studentClass', studentClass ? '' : 'Оберіть клас.');
    setFieldError('selectedDish', selectedDish ? '' : 'Оберіть страву в меню.');
    setFieldError('quantity', isValidQuantity(quantity) ? '' : 'Вкажіть ціле число від 1 до 5.');

    return Boolean(name.length >= 2 && studentClass && selectedDish && isValidQuantity(quantity));
}
function calculateTotal() {
    return selectedDish.price * Number(document.getElementById('quantity').value);
}
function resetConfirmation() {
    // TODO-В: після зміни даних сховайте попередній успішний підсумок.
    orderSummary.hidden = true;
}
orderForm.addEventListener('input', resetConfirmation);
orderForm.addEventListener('change', resetConfirmation);
orderForm.addEventListener('submit', event => {
    event.preventDefault();
    orderSummary.hidden = true;
    if (!validateOrder())
        return;
    const name = document.getElementById('studentName').value.trim();
    const studentClass = document.getElementById('studentClass').value;
    const quantity = Number(document.getElementById('quantity').value);
    const total = calculateTotal();
    orderSummary.textContent = `Дані перевірено. Навчальне замовлення сформовано. Замовлення не надіслано. Учень: ${name} (${studentClass}); страва: ${selectedDish.name}; порцій: ${quantity}; разом: ${total} грн.`;
    orderSummary.hidden = false;
});
window.CanteenOrder = { selectDish, isValidQuantity };
