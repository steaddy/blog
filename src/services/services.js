
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const getUIDate = date => {
    const dateInMS = new Date(Date.parse(date));
    const month = monthNames[dateInMS.getMonth()];
    const day = dateInMS.getDate();
    const fullYear = dateInMS.getFullYear();
    return `${month} ${day}, ${fullYear}`;
};