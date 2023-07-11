/** @format */
export default class RegionSelect {
    /**
     * @description: 城市选择器
     * @param {string} trigger - 挂载的元素
     * @param {Array} data - 城市数据
     * @param {number} level - 展示层级，默认 3，可传 2
     * @param {string} title - 弹窗标题
     * @param {object} keyMap - 数据属性对应键名
     * @param {string[]} init - 初始选中数据
     * @param {string[]} include - 只展示的数据，优先级比 exclude 高
     * @param {string[]} exclude - 排除的数据
     * @param {function} onChange - 更改回调
     * @param {function} onConfirm - 确认回调
     * @param {function} onCancel - 取消回调
     * @return {*}
     */
    trigger: string;
    triggerDom: null | Element;
    data: any[];
    level: number;
    title: string;
    keyMap: KeyMap;
    init: string[];
    exclude: string[];
    include: string[];
    regionSelect: null | Element;
    cacelBtn: null | Element;
    confirmBtn: null | Element;
    select: any[];
    onChange: () => void;
    onConfirm: () => void;
    onCancel: () => void;
    constructor({ trigger, data, level, title, keyMap, init, exclude, include, onChange, onConfirm, onCancel, }: {
        trigger?: string | undefined;
        data?: any[] | undefined;
        level?: number | undefined;
        title?: string | undefined;
        keyMap?: {
            id: string;
            value: string;
            children: string;
        } | undefined;
        init?: string[] | undefined;
        exclude?: string[] | undefined;
        include?: string[] | undefined;
        onChange?: (() => void) | undefined;
        onConfirm?: (() => void) | undefined;
        onCancel?: (() => void) | undefined;
    });
    initRegion(): void;
    clickCancel(): void;
    clickConfirm(): void;
    hide(): void;
    show(): void;
    registerEvent(): void;
    buildColumn(): void;
    renderColumn(): void;
    renderComponent(): void;
}
