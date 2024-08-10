import { useCallback, useEffect, useRef, useState } from "react";

export const useTimer = (sec: number) => {
  const [time, setTime] = useState(sec);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const startCountDown = useCallback(() => {
    console.log("starting countdown");
    intervalRef.current = setInterval(() => {
      setTime(time => time - 1);
    }, 1000);
  }, [setTime]);

  const resetCountdown = useCallback(() => {
    console.log("reset countdown");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(sec);
  }, [sec]);

  useEffect(() => {
    if (!time && intervalRef.current) {
      console.log("clear timer");
      clearInterval(intervalRef.current);
    }
  }, [time, intervalRef]);

  return { time, startCountDown, resetCountdown };
};
