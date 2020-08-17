import { useLayoutEffect, useState } from 'react';

/**
 * A hook for getting a subscription to the listener for the width of the window.
 */
function useWindowWidth() {
    // init size state hook
    const [size, setSize] = useState(0);

    // renders on page load (after paint)
    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }

        // bind listener to the resize and call function when triggered
        window.addEventListener('resize', updateSize);

        // update size on run of hook
        updateSize();

        // cleanup function. remove listener
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
}

export default useWindowWidth;
