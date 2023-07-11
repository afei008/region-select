/** @format */
import RegionSelect from './index';
declare function setActive(props: RegionSelect, dom: Element, item: any): void;
declare function buildColumn({ data, props }: {
    data: any[];
    props: RegionSelect;
}): void;
declare function scrollColumn(): void;
export { buildColumn, scrollColumn, setActive };
