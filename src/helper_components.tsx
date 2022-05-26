import styled from "@emotion/styled";
import { Button, ButtonProps } from "antd";

type GenericProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export function Center({ children, style }: GenericProps) {
  return (
    <div style={{ ...style, display: "flex", justifyContent: "center" }}>
      {children}
    </div>
  );
}

// https://stackoverflow.com/questions/55717479/how-to-pass-props-to-a-styled-component-in-emotion-using-typescript
const ButtonWrapper = styled.div<{ color: string }>`
  .ant-btn-primary {
    background-color: ${(props) => props.color};
    border-color: ${(props) => props.color};
  }
`;

// Antd colors:
// https://ant.design/docs/spec/colors

const RED = "#f5222d";
const GREEN = "#52c41a";

// Note that modifying the color of Antd Buttons is a bit awkward, because it needs to set
// two colors internally, and modifying the class requires a wrapper div:
// https://stackoverflow.com/questions/56718231/is-there-a-way-to-change-antd-internal-buttons-color

export function ButtonRed(props: ButtonProps) {
  return (
    <ButtonWrapper color={RED}>
      <Button type="primary" {...props}>
        {props.children}
      </Button>
    </ButtonWrapper>
  );
}

export function ButtonGreen(props: ButtonProps) {
  return (
    <ButtonWrapper color={GREEN}>
      <Button type="primary" {...props}>
        {props.children}
      </Button>
    </ButtonWrapper>
  );
}
