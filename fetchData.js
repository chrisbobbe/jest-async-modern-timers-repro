
const sleep = (ms = 0) => {
    const promise = new Promise(resolve => setTimeout(resolve, ms));
    return promise;
};

const fetchData = () => {
    return sleep(1000).then(() => 'peanut butter');
};

const fetchDataError = () => {
    return sleep(1000).then(() => {
        throw new Error('error');
    });
};

module.exports = {
    fetchData,
    fetchDataError,
};