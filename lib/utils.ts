import moment from "moment";

function buildUrl(baseUrl: string, queryParams: Record<string, string | Date | undefined | null>): string {
    let url = baseUrl;
    let firstQueryParam = true;

    for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
            if (firstQueryParam) {
                url += `?${key}=${queryParams[key]}`;
                firstQueryParam = false;
            } else {
                url += `&${key}=${queryParams[key]}`;
            }
        }
    }

    return url;
}

const cleanDate = (date: Date | string | null | undefined): string => {
    return moment(date).format("YYYY-MM-DD")
}

const startOfMonth = (): string => {
    const currentDate = new Date();
    currentDate.setDate(1)
    return currentDate.toString();
}

const sleep = (ms: number): Promise<null> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}


export { buildUrl, cleanDate, startOfMonth, sleep }