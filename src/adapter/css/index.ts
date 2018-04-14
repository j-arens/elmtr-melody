import MiddlewarePipeline from '../MiddlewarePipeline';
import {
    assembleBorders,
    assembleBoxShadows,
    assemblePaddings,
    // assembleTextShadows,
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
            // assembleTextShadows,
            assemblePaddings,
            assembleQuantities,
        );
        return pipeline.process(config, rules, key);
    }, {});
