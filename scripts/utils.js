export function parseTimestamp(input) {
  const date = new Date(input);

  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const offset = input.match(/([+-]\d{2}):?(\d{2})$/);
  const tzString = offset ? `GMT${offset[1]}` : '';

  const result = `${day} ${month} ${year}, ${hours}:${minutes} (${tzString})`;

  return result;
}
