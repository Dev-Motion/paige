import useStore from "@store";
import { useRef, useEffect } from "react";

function useCachedEffect(effect: () => void, expires: number, deps: unknown[]) {
  const time = useStore((state) => state.time);
  const prevDeps = useRef(deps);
  const prevExpires = useRef<Date | number>();

  useEffect(() => {
    const depsChanged = !areDepsEqual(prevDeps.current, deps);
    const expired = time >= expires && expires !== prevExpires.current;

    if (depsChanged || expired) {
      prevDeps.current = deps;
      prevExpires.current = expires;
      return effect();
    }
  }, [...deps, expires, time]);
}

function areDepsEqual(prevDeps: unknown[], nextDeps: unknown[]) {
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (Object.is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}

export default useCachedEffect;
