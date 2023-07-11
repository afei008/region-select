declare var addr: {
    code: string;
    level: number;
    name: string;
    areaList: {
        code: string;
        level: number;
        name: string;
        areaList: {
            code: string;
            level: number;
            name: string;
        }[];
    }[];
}[];
export default addr;
