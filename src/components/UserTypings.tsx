import { Caret } from "./Caret";

export const UserTypings = ({
  userInput,
  className,
  words,
}: {
  userInput: string;
  className: string;
  words: string;
}) => {
  const typedCharacters = userInput.split("");
  return (
    <div className={`text-4xl ${className}`}>
      {typedCharacters.map((char, i) => {
        return <Character actual={char} expected={words[i]} key={i} />;
      })}
      <Caret />
    </div>
  );
};
const cn = (classes: { [key: string]: boolean }) =>
  Object.entries(classes)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(" ");

const Character = ({ actual, expected }: { actual: string; expected: string }) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";
  return (
    <span
      className={cn({
        "text-red-500": !isCorrect && !isWhiteSpace,
        "text-primary-400": isCorrect && !isWhiteSpace,
        "bg-red-500/50": !isCorrect && isWhiteSpace,
      })}
    >
      {expected}
    </span>
  );
};
