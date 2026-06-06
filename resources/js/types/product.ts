export type Product = {
    id: number;
    sku: string;
    name: string;
    description: string | null;
    price: number;
    unit: string;
    min_stock: number;
    stocks: number;
    created_at: string;
    updated_at: string;
};

export type ProductPagination = {
    current_page: number;
    path: string;
    data: Product[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    per_page: number;
    to: number;
    total: number;
};