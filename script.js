const form = document.getElementById('converter-form');
const tempInput = document.getElementById('temperature');
const unitSelect = document.getElementById('input-unit');
const errorMessage = document.getElementById('error-message');
const celsiusOutput = document.getElementById('celsius-output');
const fahrenheitOutput = document.getElementById('fahrenheit-output');
const kelvinOutput = document.getElementById('kelvin-output');

const ABSOLUTE_ZERO_C = -273.15;
const ABSOLUTE_ZERO_F = -459.67;
const ABSOLUTE_ZERO_K = 0;

function toCelsius(value, unit) {
  switch (unit) {
    case 'c':
      return value;
    case 'f':
      return (value - 32) * (5 / 9);
    case 'k':
      return value - 273.15;
    default:
      return value;
  }
}

function convertTemperature(value, unit) {
  const celsius = toCelsius(value, unit);
  const fahrenheit = (celsius * 9) / 5 + 32;
  const kelvin = celsius + 273.15;

  return {
    celsius,
    fahrenheit,
    kelvin,
  };
}

function formatNumber(value) {
  return Number(value).toFixed(2);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const rawValue = tempInput.value.trim();
  const unit = unitSelect.value;

  if (rawValue === '' || Number.isNaN(Number(rawValue))) {
    errorMessage.textContent = 'Please enter a valid numeric temperature.';
    celsiusOutput.textContent = '—';
    fahrenheitOutput.textContent = '—';
    kelvinOutput.textContent = '—';
    return;
  }

  const value = Number(rawValue);
  const converted = convertTemperature(value, unit);

  if (unit === 'c' && value < ABSOLUTE_ZERO_C) {
    errorMessage.textContent = 'That value is below absolute zero. Please enter a temperature above -273.15°C.';
    celsiusOutput.textContent = '—';
    fahrenheitOutput.textContent = '—';
    kelvinOutput.textContent = '—';
    return;
  }

  if (unit === 'f' && value < ABSOLUTE_ZERO_F) {
    errorMessage.textContent = 'That value is below absolute zero. Please enter a temperature above -459.67°F.';
    celsiusOutput.textContent = '—';
    fahrenheitOutput.textContent = '—';
    kelvinOutput.textContent = '—';
    return;
  }

  if (unit === 'k' && value < ABSOLUTE_ZERO_K) {
    errorMessage.textContent = 'That value is below absolute zero. Please enter a temperature above 0 K.';
    celsiusOutput.textContent = '—';
    fahrenheitOutput.textContent = '—';
    kelvinOutput.textContent = '—';
    return;
  }

  errorMessage.textContent = '';
  celsiusOutput.textContent = `${formatNumber(converted.celsius)} °C`;
  fahrenheitOutput.textContent = `${formatNumber(converted.fahrenheit)} °F`;
  kelvinOutput.textContent = `${formatNumber(converted.kelvin)} K`;
});
