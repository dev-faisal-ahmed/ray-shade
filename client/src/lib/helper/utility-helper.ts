import { ObjectType, OrderType, ProductType } from '../types/data-types';

export function zodIsNumber(value: string) {
  return !Number.isNaN(parseInt(value, 10));
}

export function zodNumberMinValidator(value: string, target: number) {
  const number = parseInt(value, 10);
  return number >= target;
}

export function colorObjectMaker(colors: string[]) {
  const colorObject = colors.reduce((obj: ObjectType<string>, color) => {
    obj[color] = color;
    return obj;
  }, {});
  return colorObject;
}

export function isAllBulked(
  products: ProductType[],
  bulked: ObjectType<boolean>,
) {
  if (!products.length) return false;
  else if (products.length === Object.keys(bulked).length) return true;
  return false;
}

export function partialSearch(main: string, matcher: string) {
  return main.toLowerCase().includes(matcher.toLowerCase());
}

export function partialSearchForArray(main: string[], matcher: string) {
  const lowerCaseMatcher = matcher.toLowerCase();
  for (const el of main) {
    if (el.toLowerCase().includes(lowerCaseMatcher)) return true;
  }
  return false;
}

export function currencyFormate(value: number) {
  return new Intl.NumberFormat('en-IN').format(value);
}

export function totalRevenue(orders: OrderType[]) {
  return orders.reduce((total, order) => (total += order.price), 0);
}

export function dateFormatter(date: string) {
  return new Date(date).toDateString();
}
