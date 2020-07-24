
import format from "date-fns/format";

export default function fbDateToHtmlStr(fbDate) {
    const jsDate = fbDate.toDate();
    const dateStr = format(jsDate, 'yyyy-MM-dd')
    return dateStr;
}