/** @format */

function hideRegionSelect(regionSelect: Element | null) {
    /**
     * @description: 隐藏选择器
     * @return {*}
     */
    document.body.classList.remove('no-scroll-body');
    document.documentElement.classList.remove('no-scroll-body');
    document.querySelector('.region-mask')?.classList.remove('show');
    document.querySelector('.region-content')?.classList.remove('show');
    setTimeout(() => {
        if (regionSelect) {
            regionSelect?.classList.remove('show');
        }
    }, 300);
}

function showRegionSelect(regionSelect: Element | null) {
    /**
     * @description: 显示选择器
     * @return {*}
     */
    regionSelect?.classList.add('show');
    setTimeout(function () {
        document.body.classList.add('no-scroll-body');
        document.documentElement.classList.add('no-scroll-body');
        document.querySelector('.region-mask')?.classList.add('show');
        document.querySelector('.region-content')?.classList.add('show');
    }, 100);
}

export { showRegionSelect, hideRegionSelect };
