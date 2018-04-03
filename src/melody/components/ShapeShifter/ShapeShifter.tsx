import { View } from '@redux/type';
import Slider from '@views/Slider/Slider';
import SimpleToolbar from '@views/SimpleToolbar/SimpleToolbar';
import { h } from 'preact';

interface Props {
    view: View;
}

export default ({ view }: Props) => {
    switch (view) {
        case 'simple-toolbar': {
            return (
                <SimpleToolbar />
            );
        }
        case 'slider': {
            return <Slider />;
        }
        case 'track-list': {
            return (
                <div>lol tracklist</div>
            );
        }
        default: {
            return <Slider />;
        }
    }
};
