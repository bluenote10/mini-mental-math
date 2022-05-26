import { Button } from "antd";
import { Card } from "antd";
import { useState } from "react";
import { ButtonGreen, ButtonRed, Center } from "./helper_components";

type QuestionState = "waiting" | "result";

type QuestionProps = {
  question: string;
};

const paddingFooter = 20;

export function Question(props: QuestionProps) {
  let [state, setState] = useState<QuestionState>("waiting");

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Center style={{ marginTop: 30 }}>
        <Card style={{ maxWidth: 500, maxHeight: 300, flexGrow: 1 }}>
          <Center style={{ fontSize: 20 }}>{props.question}</Center>
        </Card>
      </Center>
      <Center style={{ marginTop: paddingFooter, columnGap: 20 }}>
        {state === "waiting" ? (
          <Button type="primary" onClick={() => setState("result")}>
            Got it
          </Button>
        ) : (
          <>
            <ButtonRed>Wrong</ButtonRed>
            <ButtonGreen>Correct</ButtonGreen>
          </>
        )}
      </Center>
    </div>
  );
}
