import { Button, Space } from "antd";
import { Card } from "antd";
import { ButtonGreen, ButtonRed, Center } from "./helper_components";

function App() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Center style={{ marginTop: 30 }}>
        <Card style={{ width: 300, height: 300 }}></Card>
      </Center>
      <Center style={{ marginTop: 30 }}>
        <Space>
          <ButtonRed>Wrong</ButtonRed>
          <ButtonGreen>Correct</ButtonGreen>
        </Space>
      </Center>
      <Center style={{ marginTop: 30 }}>
        <Button type="primary">Got it</Button>
      </Center>
    </div>
  );
}

export default App;
