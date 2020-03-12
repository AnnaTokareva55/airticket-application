import { format } from "date-fns";

/**
 * Преобразование формата даты.
 * @param {string} str - строка даты для преобразования.
 * @param {string} type - формат, к которому необходимо преобразовать исходную строку.
 * @returns {string}
 */
export function formatDate(str, type) {
  const date = new Date(str);
  return format(date, type);
}
