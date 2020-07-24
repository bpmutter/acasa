
import format from "date-fns/format";

export default function fbDateToHtmlStr(fbDate) {
    if(fbDate){
        const jsDate = fbDate.toDate();
        const dateStr = format(jsDate, "yyyy-MM-dd");
        return dateStr;
    } 
    return "";
    
}