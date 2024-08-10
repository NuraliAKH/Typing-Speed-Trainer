import { useCallback, useEffect, useState } from "react";
import { useWords } from "./useWords";
import { useTimer } from "./useTimer";
import { useTypings } from "./useTypings";
import { countsErrors } from "../utils/helpers";

export type State = "start" | "run" | "finish";
const number = 12;
export const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords(number);
  const { time, startCountDown, resetCountdown } = useTimer(number);
  const { clearTyped, cursor, resetTotalTyped, totalTyped, typed } = useTypings(state !== "finish");
  const [errors, setErrors] = useState(0);
  const isStarting = state === "start" && cursor > 0;
  const summErrors = useCallback(() => {
    const worsReached = words.substring(0, cursor);
    setErrors(prev => prev + countsErrors(typed, worsReached));
  }, [typed, words, cursor]);
  const wordsFinished = cursor === words.length;

  const restart = useCallback(() => {
    console.log("restarting");
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);
  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountDown();
    }
  }, [isStarting, startCountDown, cursor]);
  useEffect(() => {
    if (!time) {
      console.log("time");

      setState("finish");
      summErrors();
    }
  }, [time, summErrors]);
  useEffect(() => {
    if (wordsFinished) {
      console.log("words");
      clearTyped();
      updateWords();
      summErrors();
    }
  }, [cursor, words, clearTyped, typed, wordsFinished, updateWords, setErrors]);
  return { state, words, time, typed, errors, totalTyped, restart };
};
