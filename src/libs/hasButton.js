const hasButton = {
    install (Vue, options) {
        Vue.directive('hasButton', {
            bind (el, binding, vnode) {
                let buttonTypes = vnode.context.$route.meta.buttonTypes;
                if (buttonTypes && buttonTypes.length && !buttonTypes.includes(binding.value)) {
                    el.parentNode.removeChild(el);
                }
            }
        });
    }
};

export default hasButton;
