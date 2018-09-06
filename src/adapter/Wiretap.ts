import { GLOBAL } from './constants';

/**
 * Simple abstraction over elementor's channels pub sub
 */
export default class {
    constructor() {
        const { elementor: { channels } } = GLOBAL;
        this.channels = channels;
    }

    protected channels;

    on(channelName: string, event: string, callback: (args: any) => any) {
        const channel = this.channels[channelName];
        if (!channel) {
            return;
        }
        return channel.listenTo(channel, event, callback);
    }

    off(channelName: string, event: string, callback: (args: any) => any) {
        const channel = this.channels[channelName];
        if (!channel) {
            return;
        }
        return channel.stopListening(channel, event, callback);
    }
}
