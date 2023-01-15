import { logger } from '@c2m/c2m-logger';
import { TableListParams } from "../pagination";

export const filterSortData = async <T>(data: T[], reqQuery?: any, doFilter:boolean = false): Promise<T[]> => {
	const params = reqQuery as unknown as TableListParams<T>;

	if (params?.sorter) {
		const sorter = JSON.parse((params.sorter === undefined || params.sorter === null ? '{}' : params.sorter) as any);

		if (sorter) {
			data = data.sort((prev, next) => {
				let sortNumber = 0;

				Object.keys(sorter).forEach((key) => {
					prev[key] = prev[key] === undefined ? null : prev[key];
					next[key] = next[key] === undefined ? null : next[key];
					if (sorter[key] === 'descend') {
                       
						if (typeof (prev[key]) === 'number') {
							if (prev[key] - next[key] > 0) {
								sortNumber += -1;
							}
							else {
								sortNumber += 1;
							}
						}
						else if (typeof prev[key]?.getTime === 'function' || typeof next[key]?.getTime === 'function') {
							sortNumber += (next[key]?.getTime()??0) - (prev[key]?.getTime()??0) > 0 ? 1 : -1;
						}
						else {
							sortNumber += next[key]?.localeCompare(prev[key]);

						}

						return;
					}

					if (typeof (prev[key]) === 'number') {
						if (prev[key] - next[key] > 0) {
							sortNumber += 1;
						}
						else {
							sortNumber += -1;
						}
					}
					else if (typeof prev[key]?.getTime === 'function' || typeof next[key]?.getTime === 'function') {
						sortNumber += (next[key]?.getTime()??0) - (prev[key]?.getTime()??0) > 0 ? -1 : 1;
					}
					else {
						sortNumber += prev[key]?.localeCompare(next[key]);
					}

				});
				return sortNumber;
			});
		}
	}

	if (doFilter && params?.filter) {
		const filter = JSON.parse(params.filter as any) as {
			[key: string]: string[];
		};

		logger.info('params.filter:', filter);
		if (Object.keys(filter).length > 0) {
			data = data.filter((item) => {
				return Object.keys(filter).every((key) => {
					if (!filter[key]) {
						logger.info(`no key true`);
						return true;
					}

					let key2 = key;

					if (item[key] === undefined) {
						key2 = Object.keys(item)
							.filter(k => key.includes(k) && 
                        (key.length - k.length) <= 2 &&
                         (key?.slice(-(key.length - k.length)) === 's' ||
                          key?.slice(-(key.length - k.length)) === 'es'))[0];
						logger.info(`key to key2 fix: ${key2}`);
					}

					logger.info(`key2: ${key2} key: ${key} ${filter[key] }.includes(${item[key2 ?? key]})`);
					if (filter[key].length > 0 && typeof (filter[key][0]) === 'number') {
						logger.info(`number set as string`);
						filter[key] = filter[key].map(s => `${s}`);
					}

					if (filter[key].includes(`${item[key2 ?? key]}`)) {
						logger.info(`${key} true`);
						return true;
					}
                    
					if (`${item[key2 ?? key]}`.indexOf(filter[key] as unknown as string) > -1) {
						logger.info(`string ${key} true`);
						return true;
					}

					logger.info(`${key} false`);
					return false;
				});
			});
		}
	}

	return data;
};

export const paginationData =
 async <T>(data: T[], reqQuery: any, doFilter:boolean = false):
 Promise<{ dataSource: T[], total: number, pageSize: number, current: number }> => {
 	const { current = 1, pageSize = 10 } = reqQuery;
 	const newData = await filterSortData<T>(data, reqQuery, doFilter);
 	const dataSource = newData?.slice(
 		((current as number) - 1) * (pageSize as number),
 		(current as number) * (pageSize as number),
 	);

 	//console.dir(dataSource, { depth: null, colors: true })
 	return {
 		dataSource: dataSource,
 		total: newData.length,
 		pageSize,
 		current 
 	};
 };