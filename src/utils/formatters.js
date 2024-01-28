export const formatMoney = (money) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "USD" }).format(
    money,
  );
