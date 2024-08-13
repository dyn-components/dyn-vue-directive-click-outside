import { DirectiveBinding, VNode } from 'vue';

const DynDirective = {
	// 在绑定元素的 attribute 或事件监听器被应用之前调用
	// created(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVnode: VNode | null) {
	// },

	// 在绑定元素插入到 DOM 前调用
	// beforeMount(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVnode: VNode | null) {
	// },

	// 在绑定元素插入到 DOM 时调用
	mounted(el: HTMLElement, binding: DirectiveBinding, _vnode: VNode, _prevVnode: VNode | null) {
		const onClickOutsideEvent = function (event: MouseEvent | TouchEvent) {
			const target = event.target as HTMLElement;
			if (!(el == event.target || el.contains(target))) {
				binding.value(event, el);
			}
		};
		document.addEventListener('click', onClickOutsideEvent);

		// Store event handlers on the element for cleanup
		(el as any).__longpressHandlers = { onClickOutsideEvent };
	},

	// 在包含组件的 VNode 更新之前调用
	// beforeUpdate(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVnode: VNode | null) {
	// },

	// 在包含组件的 VNode 及其子 VNode 更新之后调用
	// updated(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVnode: VNode | null) {
	// },

	// 在绑定元素的父组件卸载之前调用
	// beforeUnmount(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVnode: VNode | null) {
	// },

	// 在绑定元素的父组件卸载之后调用
	unmounted(el: HTMLElement, _binding: DirectiveBinding, _vnode: VNode, _prevVnode: VNode | null) {
		const handlers = (el as any).__longpressHandlers;
		document.removeEventListener('click', handlers.onClickOutsideEvent);

		// Clean up stored handlers
		delete (el as any).__longpressHandlers;
	},
}

export default DynDirective