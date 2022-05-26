import { Button } from "antd";
import { Card } from "antd";
import { useRef, useState } from "react";
import {
  ButtonGreen,
  ButtonRed,
  Center,
  MainContainer,
} from "./helper_components";
import { Question } from "../question";

type QuestionState = "question" | "answer";

export type QuestionProps = {
  question: Question;
  questionNumber: number;
  questionNumberMax: number;
  onDone: (correct: boolean, time: number) => void;
};

const paddingFooter = 20;

export function QuestionView(props: QuestionProps) {
  const startTime = useRef(new Date());
  const endTime = useRef(new Date());
  console.log(startTime.current);

  const [state, setState] = useState<QuestionState>("question");

  const switchMode = () => {
    endTime.current = new Date();
    setState("answer");
  };

  const reportDone = (correct: boolean) => {
    const timeElapsed =
      (endTime.current.valueOf() - startTime.current.valueOf()) / 1000;
    props.onDone(correct, timeElapsed);
  };

  return (
    <MainContainer>
      <Center style={{ marginTop: 30, fontSize: 10 }}>
        Question {props.questionNumber} / {props.questionNumberMax}
      </Center>
      <Center style={{ marginTop: 5 }}>
        <Card style={{ maxWidth: 500, maxHeight: 300, flexGrow: 1 }}>
          <Center style={{ fontSize: 20 }}>{props.question.question}</Center>
        </Card>
      </Center>
      <Center style={{ marginTop: 10 }}>
        <Card style={{ maxWidth: 500, maxHeight: 300, flexGrow: 1 }}>
          <Center style={{ fontSize: 20 }}>
            {state === "question" ? "?" : props.question.answer}
          </Center>
        </Card>
      </Center>
      <Center style={{ marginTop: paddingFooter, columnGap: 20 }}>
        {state === "question" ? (
          <Button type="primary" onClick={switchMode}>
            Got it
          </Button>
        ) : (
          <>
            <ButtonRed onClick={() => reportDone(false)}>Wrong</ButtonRed>
            <ButtonGreen onClick={() => reportDone(true)}>Correct</ButtonGreen>
          </>
        )}
      </Center>
    </MainContainer>
  );
}
