
export const buildResponse = (success, data, statusCode) => {
    const urlSplitArr = window.location.href.toString().split("/");
    if (
        statusCode &&
        statusCode === 401 &&
        urlSplitArr.length >= 4 &&
        urlSplitArr[3] !== "auth"
    ) {
        window.location.replace("/");
    } else {
        return { success: success, data: data, status: statusCode };
    }
};
