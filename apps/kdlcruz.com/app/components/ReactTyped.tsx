'use client'

import React from 'react'
import Typed, { TypedOptions } from 'typed.js'

export const ReactTyped = (options: TypedOptions) => {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, options);

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy()
    };
  }, [options]);

  return (
    <span ref={el} />
  );
}