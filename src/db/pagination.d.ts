
export type TableListPagination = {
	total: number;
	pageSize: number;
	current: number;
};

export type TableListData<T> = {
	list: T[];
	pagination: Partial<TableListPagination>;
};

export type TableListParams<T> = {
	params?: T;
	pageSize?: number;
	current?: number;
	filter?: Record<string, any[] | null>;
	sorter?: Record<string, any>;
}
