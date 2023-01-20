export const formatPrice = (num) => {
    const newNum = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "USD"
    }).format(num / 100);
    return newNum;
}

export const getUniqueValues = () => { }
