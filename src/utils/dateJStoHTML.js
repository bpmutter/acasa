import format from "date-fns/format";

export default function fbDateToHtmlStr(dateObj) {
  if (dateObj) {
    
    const dateStr = format(dateObj, "yyyy-MM-dd");
    return dateStr;
  }
  return "";
}
