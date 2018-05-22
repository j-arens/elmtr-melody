import { View } from '@redux/type';
import SimpleToolbar from '@views/SimpleToolbar/SimpleToolbar';
import Slider from '@views/Slider/Slider';
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
        default: {
            return <Slider />;
        }
    }
};
