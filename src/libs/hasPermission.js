const hasPermission = {
    install (Vue, options) {
        Vue.directive('has', {
            inserted (el, binding, vnode) {
                let permTypes = vnode.context.$route.meta.permTypes;
                if (permTypes&&!permTypes.includes(binding.value)) {
                    el.parentNode.removeChild(el);
                }
            }
        });
    }
};

export default hasPermission;
