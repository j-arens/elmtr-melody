import { unmountComponent } from 'preact/src/vdom/component';
import * as InstanceManager from '../InstanceManager';

describe('InstanceManager', () => {
    it('adds instances', () => {
        InstanceManager.add('123', 'lol');
        expect(InstanceManager.repo.has('123')).toBe(true);
        expect(InstanceManager.repo.get('123')).toBe('lol');
    });

    it('removes instances', () => {
        InstanceManager.add('456', 'lol');
        InstanceManager.autoRemove('456');
        expect(InstanceManager.repo.has('456')).toBe(false);
        expect(unmountComponent).toHaveBeenCalledWith('lol');
    });
});
