import { unmountComponent } from 'preact/src/vdom/component';

/**
 * Map of Melody instances
 */
export const repo: Map<string, Element> = new Map();

/**
 * Add an instance to the repo
 */
export const add = (id: string, instance: Element) => repo.set(id, instance);

/**
 * Remove instances from the repo and force unmount them
 */
export const autoRemove = (...ids: string[]) => ids.forEach(id => {
    if (repo.has(id)) {
        unmountComponent(repo.get(id));
        repo.delete(id);
    }
});
