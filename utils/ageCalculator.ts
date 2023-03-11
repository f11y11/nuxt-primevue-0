export default function age(b: Date) {
    const t = new Date();
    return today.getFullYear() - birthdate.getFullYear() - (t.getMonth() < b.getMonth() | (t.getMonth() === b.getMonth() && t.getDate() < b.getDate()));
}