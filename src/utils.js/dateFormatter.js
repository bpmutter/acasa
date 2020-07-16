
export default function dateFormatter(fbDateObj){
    const dateObj = fbDateObj.toDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[dateObj.getMonth()];
    const dateStr = `${month} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    return dateStr;
}