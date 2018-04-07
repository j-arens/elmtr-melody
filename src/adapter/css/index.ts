import MiddlewarePipeline from '../MiddlewarePipeline';
import {
    assembleBorders,
    assembleBoxShadows,
    assemblePaddings,
    assembleQuantities,
    filterRules,
} from './middleware';

export const prepareRules = config => Object.keys(config)
    .reduce((rules, key) => {
        const pipeline = new MiddlewarePipeline();
        pipeline.use(
            filterRules,
            assembleBorders,
            assembleBoxShadows,
            assemblePaddings,
            assembleQuantities,
        );
        return pipeline.process(config, rules, key);
    }, {});
