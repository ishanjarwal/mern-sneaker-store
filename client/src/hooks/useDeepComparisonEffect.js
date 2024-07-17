import { isEqual } from 'lodash';
import { useEffect, useRef } from 'react';

const useDeepComparisonEffect = (callback, dependencies) => {
    const currentDependenciesRef = useRef();

    if (!isEqual(currentDependenciesRef.current, dependencies)) {
        currentDependenciesRef.current = dependencies;
    }

    useEffect(callback, [currentDependenciesRef.current]);
};
export default useDeepComparisonEffect;