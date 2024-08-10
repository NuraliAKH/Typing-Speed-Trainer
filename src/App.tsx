import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { GenerateWords } from "./components/GenerateWords";
import { Timer } from "./components/Timer";
import { RestartButton } from "./components/RestartButton";
import { Result } from "./components/Result";
import { UserTypings } from "./components/UserTypings";
import { WordsContainer } from "./containers/WordsContainer";
import { useEngine } from "./hooks/useEngine";
import { calculateAccurancePercentage, calculateWRM } from "./utils/helpers";
import { TimeSelector } from "./components/TimeSelector";

const words = faker.random.words(10);

function App() {
  const [time, setTime] = useState(30);
  const { state, words, typed, errors, restart, totalTyped } = useEngine();

  const handleTimeSelect = (selectedTime: number) => {
    setTime(selectedTime);
    restart();
  };

  return (
    <div className="p-8">
      <TimeSelector className="mx-auto mt-4" selectedTime={time} onTimeSelect={handleTimeSelect} />
      <Timer timeLeft={time} />
      <WordsContainer>
        <GenerateWords words={words} />
        <UserTypings className="absolute inset-0" words={words} userInput={typed} />
      </WordsContainer>
      <RestartButton className="mx-auto mt-10 text-white" onRestart={restart} />
      <Result
        state={state}
        className="mt-10"
        errors={errors}
        total={totalTyped}
        wrm={calculateWRM(totalTyped, errors, time)}
      />
    </div>
  );
}

export default App;
