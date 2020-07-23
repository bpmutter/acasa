import dateParse from "date-fns/parse";

export default function dateStringToObj(dateStr){
    return dateParse(dateStr, "yyyy-MM-dd", new Date());
}