export const formatPrice = (num) => {
    const newNum = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "USD"
    }).format(num / 100);
    return newNum;
}

export const getUniqueValues = (data, type) => {
    //Getting only unique values from an array
    let uniqueData = data.map(item => item[type]);

    //Flattening Colors Array
    (type === 'colors') && (uniqueData = uniqueData.flat());

    return ['all', ...new Set(uniqueData)]
}
