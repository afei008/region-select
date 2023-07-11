/** @format */
import RegionSelect from '.';
declare function scrollEvent(): void;
declare function registerEvent({ onCancel, onConfirm, }: {
    onCancel: () => void;
    onConfirm: () => void;
}): void;
declare function clickItem({ dom, props, item, }: {
    dom: Element;
    props: RegionSelect;
    item: any;
}): void;
export { scrollEvent, registerEvent, clickItem };
