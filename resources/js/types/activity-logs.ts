export interface ActivityLog {
    id: number;
    date: string;
    user: string;
    action: string;
    item: string | null;
    sku: number;
}

export interface ActivityLogCollection {
    data: ActivityLog[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}