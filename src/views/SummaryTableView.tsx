import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table/Table";
import { tuple } from "../utils";
import { GREEN, RED } from "./colors";
import { Center, MainContainer } from "./helper_components";

export type QuestionResult = {
  correct: boolean;
  time: number;
};

export type SummaryTableViewProps = {
  questionResults: Array<QuestionResult>;
  onDone: () => void;
};

const paddingFooter = 20;

export function SummaryTableView(props: SummaryTableViewProps) {
  const [dataSource, columns] = buildDataSourceAndColumns(
    props.questionResults
  );

  return (
    <MainContainer>
      <Center style={{ marginTop: paddingFooter, columnGap: 20 }}>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </Center>
      <Center style={{ marginTop: paddingFooter, columnGap: 20 }}>
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
