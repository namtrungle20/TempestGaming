const promiseCache = new Map();

/**
 * Ngăn chặn việc gọi trùng API trong cùng một thời điểm.
 * @param {string} key - Mã định danh duy nhất cho request.
 * @param {function} fetcher - Hàm thực hiện call API (trả về Promise).
 */
export const requestWithCache = (key, fetcher) => {
    if (!promiseCache.has(key)) {
        // Thực thi request
        const promise = fetcher().finally(() => {
            // Dọn dẹp cache ngay khi xong để tránh giữ data cũ.
            // Dùng microtask thay vì setTimeout để triệt tiêu Violation.
            promiseCache.delete(key);
        });
        promiseCache.set(key, promise);
    }
    return promiseCache.get(key);
};