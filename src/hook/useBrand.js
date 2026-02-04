import { useState, useEffect } from "react";
import { brandService } from "../services/brandService";

export const useBrands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadBrands = async () => {
        setLoading(true);
        try {
            const res = await brandService.getAll();
            setBrands(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { loadBrands(); }, []);

    return { brands, loading, refresh: loadBrands, deleteBrand: brandService.delete };
};