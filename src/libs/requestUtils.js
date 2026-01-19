const promiseCache = new Map();

/**
 * Ngăn chặn việc gọi trùng API trong cùng một thời điểm.
 * @param {string} key - Mã định danh duy nhất cho request.
 * @param {function} fetcher - Hàm thực hiện call API (trả về Promise).
 */
export const requestWithCache = (key, fetcher) => {
    if (!promiseCache.has(key)) {
        // Log để debug xem nó có chặn đúng không
        console.log(`[Cache] New request for: ${key}`);
        
        const promise = fetcher().finally(() => {
            // Dọn dẹp cache ngay khi xong (thành công hoặc thất bại)
            // queueMicrotask giúp đảm bảo dọn dẹp sau khi promise hoàn tất hoàn toàn
            queueMicrotask(() => {
                promiseCache.delete(key);
                console.log(`[Cache] Cleared: ${key}`);
            });
        });
        
        promiseCache.set(key, promise);
    } else {
        console.log(`[Cache] Deduplicated: ${key}`);
    }
    
    return promiseCache.get(key);
};