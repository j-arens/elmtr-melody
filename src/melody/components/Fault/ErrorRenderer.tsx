import { isEditMode } from '@melody/utils/';
import { h } from 'preact';
import BadSource from './BadSource';
import { ErrorCodes } from './codes';
import DefaultError from './DefaultError';
import FaultContainer from './FaultContainer';
import NoTracksEditor from './NoTracksEditor';
import NoTracksFront from './NoTracksFront';

interface Props {
    errors: Set<ErrorCodes>;
}

export default ({ errors }: Props) => {
    // this check needs to be before the bad source check
    if (errors.has(ErrorCodes.MELODY_NO_TRACKS)) {
        if (isEditMode()) {
            return (
                <FaultContainer allowReload={false}>
                    <NoTracksEditor />
                </FaultContainer>
            );
        }
        return (
            <FaultContainer allowReload={false}>
                <NoTracksFront />
            </FaultContainer>
        );
    }
    if (errors.has(ErrorCodes.MELODY_BAD_SOURCE)) {
        return (
            <FaultContainer allowReload>
                <BadSource />
            </FaultContainer>
        );
    }
    return (
        <FaultContainer allowReload>
            <DefaultError />
        </FaultContainer>
    );
};
