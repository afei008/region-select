/** @format */

import { buildColumn, scrollColumn } from './build';
import { registerEvent } from './event';
import { excludeData, includeData } from './format';
import { hideRegionSelect, showRegionSelect } from './visible';

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
    triggerDom: null | Element = null;
    data: any[];
    level: number;
    title: string;
    keyMap: KeyMap;
    init: string[];
    exclude: string[];
    include: string[];
    regionSelect: null | Element = null;
    cacelBtn: null | Element = null;
    confirmBtn: null | Element = null;
    select: any[] = [];
    onChange: () => void;
    onConfirm: () => void;
    onCancel: () => void;
    constructor({
        trigger = '',
        data = [] as any[],
        level = 3,
        title = '请选择地区',
        keyMap = {
            id: 'id',
            value: 'value',
            children: 'children',
        },
        init = [] as string[],
        exclude = [] as string[],
        include = [] as string[],
        onChange = () => console.log('onChange'),
        onConfirm = () => console.log('onConfirm'),
        onCancel = () => console.log('onCancel'),
    }) {
        this.onChange = onChange;
        this.onConfirm = onConfirm;
        this.onCancel = onCancel;
        this.trigger = trigger;
        this.data = data;
        this.level = level;
        this.title = title;
        this.keyMap = keyMap;
        this.init = init;
        this.exclude = exclude;
        this.include = include;

        this.initRegion();
    }

    initRegion() {
        const dom = document.querySelector(this.trigger);
        if (dom) {
            this.triggerDom = dom;
            excludeData(this);
            includeData(this);
            this.triggerDom.addEventListener('click', () => {
                this.renderComponent();
            });
        } else {
            console.log('挂载元素不存在');
        }
    }

    clickCancel() {
        this.onCancel();
        this.hide();
    }
    clickConfirm() {
        this.onConfirm();
        this.hide();
    }

    hide() {
        /**
         * @description: 隐藏选择器
         * @return {*}
         */
        hideRegionSelect(this.regionSelect);
    }

    show() {
        /**
         * @description: 显示选择器
         * @return {*}
         */
        showRegionSelect(this.regionSelect);
    }

    registerEvent() {
        /**
         * @description: 注册事件
         * @return {*}
         */
        registerEvent({
            onCancel: () => {
                this.clickCancel();
            },
            onConfirm: () => {
                this.clickConfirm();
            },
        });
    }

    buildColumn() {
        /**
         * @description: 构建列
         * @return {Element} 返回 DOM 元素
         */
        buildColumn({ data: this.data, props: this });
        this.init = [];
    }

    renderColumn() {
        /**
         * @description: 渲染列
         * @return {*}
         */
        setTimeout(() => {
            this.buildColumn();
            this.registerEvent();
            scrollColumn();
        });
    }

    renderComponent() {
        /**
         * @description: 渲染数据
         * @return {*}
         */
        if (!document.querySelector('.region-select')) {
            const wrap = document.createElement('div');
            this.regionSelect = wrap;
            wrap.className = 'region-select show';
            wrap.innerHTML = `
            <div class="region-mask"></div>
            <div class="region-content">
                <div class="region-head">
                    <div class="region-btn cancel-btn">取消</div>
                    <div class="region-title">${this.title}</div>
                    <div class="region-btn confirm-btn">确认</div>
                </div>
                <div class="region-body"></div>
            </div>
        `;
            this.renderColumn();
            document.body.appendChild(wrap);
        }
        this.show();
    }
}
