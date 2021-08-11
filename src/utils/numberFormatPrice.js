export default function numberFormatPrice(number) {
  return Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(number);
}
