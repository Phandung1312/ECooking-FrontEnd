const utils = {

    formatTimestampToDateString(timestampInMilliseconds) {
        const dateObject = new Date(timestampInMilliseconds);
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${year}-${month}-${day}`;
    },

    formatCurrencyVND(amount) {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
};

export default utils;
