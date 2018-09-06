import * as audioActions from '@redux/modules/audio/actions';
import * as uiActions from '@redux/modules/ui/actions';
import { compose } from 'redux';
import { prepareTracks } from './tracks/';
import { TrackMiddlewareParams } from './type';

/**
 * Dispatch action to load component style view
 */
export const view = (
    { dispatch, config }: TrackMiddlewareParams,
): TrackMiddlewareParams => {
    const { melody_component_style, wrapper_id } = config;
    dispatch(uiActions.setWrapperId(wrapper_id));
    dispatch(uiActions.changeView(melody_component_style));
    return { dispatch, config };
};

/**
 * Dispatch action to load the audio tracks
 */
export const tracks = (
    { dispatch, config }: TrackMiddlewareParams,
): TrackMiddlewareParams => {
    const { melody_audio_tracks } = config;
    const prepared = prepareTracks(melody_audio_tracks);
    dispatch(audioActions.setTracks(prepared));
    return { dispatch, config };
};

/**
 * Intialization composition
 */
export default compose(
    view,
    tracks,
);
