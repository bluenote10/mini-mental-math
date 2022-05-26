import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Statistic, Table } from "antd";
import { ColumnsType } from "antd/lib/table/Table";
import { tuple } from "../utils";
import { GREEN, RED } from "./colors";
import { Center, MainContainer } from "./helper_components";

export type QuestionResult = {
  correct: boolean;
  time: number;
  type: string;
};

export type SummaryTableViewProps = {
  questionResults: Array<QuestionResult>;
  onDone: () => void;
};

export function SummaryTableView(props: SummaryTableViewProps) {
  const [dataSource, columns] = buildDataSourceAndColumns(
    props.questionResults
  );

  const percentCorrect =
    (100 * props.questionResults.filter((result) => result.correct).length) /
    props.questionResults.length;
  const averageTime =
    props.questionResults.map((result) => result.time).reduce((a, b) => a + b) /
    props.questionResults.length;

  return (
    <MainContainer>
      <Center style={{ marginTop: 20, columnGap: 50 }}>
        <Statistic title="Correct" value={percentCorrect} suffix="%" />
        <Statistic
          title="Average time"
          value={averageTime}
          precision={1}
          suffix="s"
        />
      </Center>
      <Center style={{ marginTop: 30, columnGap: 20 }}>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </Center>
      <Center style={{ marginTop: 30, columnGap: 20 }}>
        <Button type="primary" onClick={props.onDone}>
          Done
        </Button>
      </Center>
    </MainContainer>
  );
}

function buildDataSourceAndColumns(questionResults: Array<QuestionResult>) {
  const dataSource = questionResults.map((result, i) => ({
    key: i + 1,
    type: result.type,
    correct: result.correct ? (
      <CheckCircleOutlined style={{ color: GREEN }} />
    ) : (
      <ExclamationCircleOutlined style={{ color: RED }} />
    ),
    time: result.time.toFixed(1) + " s",
  }));

  const columns: ColumnsType<typeof dataSource[0]> = [
    {
      title: "Question",
      dataIndex: "key",
      key: "key",
      align: "right",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "left",
    },
    {
      title: "Correct",
      dataIndex: "correct",
      key: "correct",
      align: "center",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "right",
    },
  ];

  return tuple(dataSource, columns);
}
