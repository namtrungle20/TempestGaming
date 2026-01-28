import { useState, useEffect } from "react";
import { brandService } from "../services/brandService";

export const useBrands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBrands = async () => {
        setLoading(true);
        const data = await brandService.getAll();
        setBrands(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchBrands();
    }, []); // Chạy 1 lần duy nhất khi load trang

    return { brands, loading, refresh: fetchBrands };
};