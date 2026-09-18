import { useMemo, useRef, useState, type CSSProperties } from "react";
import { Grid, Inline, Stack } from "@rain-next/layouts";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableScrollArea,
} from "@rain-next/ui";
import "./page.css";

type StudentStatus = "done" | "unfinished" | "attention";
type StudentRow = {
  id: number;
  name: string;
  completed: number;
  total: number;
  accuracy: number | null;
  graded: number;
  gradeTotal: number;
  status: StudentStatus;
};

type SummaryData = {
  totalStudents: number;
  completedStudents: number;
  lateStudents: number;
  completionRate: number;
  accuracy: number;
  answered: number;
  answerTotal: number;
  graded: number;
  gradeTotal: number;
  students: StudentRow[];
};

const summaries: Record<string, SummaryData> = {
  all: {
    totalStudents: 62,
    completedStudents: 54,
    lateStudents: 3,
    completionRate: 87,
    accuracy: 76,
    answered: 678,
    answerTotal: 744,
    graded: 196,
    gradeTotal: 224,
    students: [
      { id: 1, name: "陈思远", completed: 12, total: 12, accuracy: 92, graded: 4, gradeTotal: 4, status: "done" },
      { id: 2, name: "李安然", completed: 12, total: 12, accuracy: 83, graded: 4, gradeTotal: 4, status: "done" },
      { id: 3, name: "周亦辰", completed: 11, total: 12, accuracy: 64, graded: 3, gradeTotal: 4, status: "attention" },
      { id: 4, name: "王语桐", completed: 8, total: 12, accuracy: 71, graded: 2, gradeTotal: 4, status: "unfinished" },
      { id: 5, name: "赵子墨", completed: 5, total: 12, accuracy: 58, graded: 1, gradeTotal: 4, status: "attention" },
    ],
  },
  class1: {
    totalStudents: 31,
    completedStudents: 29,
    lateStudents: 1,
    completionRate: 94,
    accuracy: 81,
    answered: 354,
    answerTotal: 372,
    graded: 103,
    gradeTotal: 112,
    students: [
      { id: 1, name: "陈思远", completed: 12, total: 12, accuracy: 92, graded: 4, gradeTotal: 4, status: "done" },
      { id: 2, name: "李安然", completed: 12, total: 12, accuracy: 83, graded: 4, gradeTotal: 4, status: "done" },
      { id: 3, name: "周亦辰", completed: 11, total: 12, accuracy: 64, graded: 3, gradeTotal: 4, status: "attention" },
    ],
  },
  class2: {
    totalStudents: 31,
    completedStudents: 25,
    lateStudents: 2,
    completionRate: 81,
    accuracy: 71,
    answered: 324,
    answerTotal: 372,
    graded: 93,
    gradeTotal: 112,
    students: [
      { id: 4, name: "王语桐", completed: 8, total: 12, accuracy: 71, graded: 2, gradeTotal: 4, status: "unfinished" },
      { id: 5, name: "赵子墨", completed: 5, total: 12, accuracy: 58, graded: 1, gradeTotal: 4, status: "attention" },
      { id: 6, name: "孙知夏", completed: 12, total: 12, accuracy: 86, graded: 4, gradeTotal: 4, status: "done" },
    ],
  },
};

const statusLabel: Record<StudentStatus, string> = {
  done: "已完成",
  unfinished: "未完成",
  attention: "需关注",
};

function ProgressRing({ value }: { value: number }) {
  const circumference = 2 * Math.PI * 48;
  const offset = circumference * (1 - value / 100);
  return (
    <div className="hw-summary-ring" aria-label={`完成率 ${value}%`} role="img">
      <svg viewBox="0 0 112 112" aria-hidden="true">
        <circle className="hw-summary-ring-track" cx="56" cy="56" r="48" />
        <circle
          className="hw-summary-ring-value"
          cx="56"
          cy="56"
          r="48"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="hw-summary-ring-label">
        <strong className="rain-type-data">{value}%</strong>
        <small>完成率</small>
      </span>
    </div>
  );
}

function Meter({ value, label, detail }: { value: number; label: string; detail: string }) {
  return (
    <div className="hw-summary-meter">
      <div className="hw-summary-meter-heading">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="hw-summary-meter-track" aria-hidden="true">
        <span style={{ "--hw-meter-value": `${value}%` } as CSSProperties} />
      </div>
      <p>{detail}</p>
    </div>
  );
}

function Metric({
  label,
  value,
  suffix,
  note,
}: {
  label: string;
  value: string;
  suffix?: string;
  note: string;
}) {
  return (
    <div className="hw-summary-metric">
      <span>{label}</span>
      <div>
        <strong className="rain-type-data">{value}</strong>
        {suffix ? <em>{suffix}</em> : null}
      </div>
      <p>{note}</p>
    </div>
  );
}

export function TeacherHomeworkSummaryPage() {
  const [classId, setClassId] = useState("all");
  const [studentFilter, setStudentFilter] = useState("all");
  const detailsRef = useRef<HTMLElement>(null);
  const data = summaries[classId] ?? summaries.all;

  const filteredStudents = useMemo(() => {
    if (studentFilter === "all") return data.students;
    return data.students.filter((student) => student.status === studentFilter);
  }, [data.students, studentFilter]);

  const unfinished = data.totalStudents - data.completedStudents;
  const answeredRate = Math.round((data.answered / data.answerTotal) * 100);
  const gradedRate = Math.round((data.graded / data.gradeTotal) * 100);

  return (
    <main
      className="hw-summary"
      data-rain-id="prototype-teacher-homework-summary"
      data-asset-identity="local-experiment"
    >
      <header className="hw-summary-topbar">
        <div className="hw-summary-topbar-inner">
          <div>
            <p className="hw-summary-breadcrumb">大学物理 · 2026 秋</p>
            <h1>第一次课后作业 · 作业小结</h1>
            <p className="hw-summary-subtitle">截止 09 月 18 日 18:00 · 共 12 题 · 满分 100 分</p>
          </div>
          <Inline gap={12} align="center">
            <div className="hw-summary-class-select">
              <Select
                aria-label="选择班级"
                clearable={false}
                value={classId}
                onValueChange={(value) => {
                  if (typeof value === "string") {
                    setClassId(value);
                    setStudentFilter("all");
                  }
                }}
                options={[
                  { value: "all", label: "全部班级" },
                  { value: "class1", label: "大学物理 1 班" },
                  { value: "class2", label: "大学物理 2 班" },
                ]}
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              查看学生明细
            </Button>
          </Inline>
        </div>
      </header>

      <div className="hw-summary-content">
        <Stack gap={24}>
          <section aria-labelledby="hw-completion-title">
            <Card className="hw-summary-primary-card">
              <CardHeader>
                <div>
                  <CardTitle as="h2" id="hw-completion-title">完成情况</CardTitle>
                  <CardDescription>先看整体完成规模，再处理未完成与需要提醒的学生。</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="hw-summary-completion-layout">
                  <ProgressRing value={data.completionRate} />
                  <div className="hw-summary-completion-main">
                    <div className="hw-summary-completion-copy">
                      <p><strong>{data.completedStudents}</strong> / {data.totalStudents} 人已完成</p>
                      <span>{unfinished} 人尚未完成，其中 {data.lateStudents} 人已超过建议完成时间。</span>
                    </div>
                    <div className="hw-summary-progress-row">
                      <Meter value={data.completionRate} label="学生完成" detail={`已完成 ${data.completedStudents} 人 · 未完成 ${unfinished} 人`} />
                      <Meter value={answeredRate} label="题目作答" detail={`已产生 ${data.answered} / ${data.answerTotal} 份题目作答`} />
                    </div>
                  </div>
                  <aside className="hw-summary-attention">
                    <span>优先关注</span>
                    <strong>{Math.max(data.lateStudents, 1)} 人</strong>
                    <p>存在明显未完成或作答进度偏低，建议先定向提醒。</p>
                    <Button
                      variant="text"
                      onClick={() => {
                        setStudentFilter("attention");
                        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      查看需关注学生
                    </Button>
                  </aside>
                </div>
              </CardContent>
            </Card>
          </section>

          <section aria-labelledby="hw-answer-title">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle as="h2" id="hw-answer-title">作答统计</CardTitle>
                  <CardDescription>正确率仅统计已作答内容；批改进度按需要教师批改的题目份数计算。</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Grid columns={3} minColumnWidth={220} gap={0} className="hw-summary-metrics">
                  <Metric label="整体正确率" value={String(data.accuracy)} suffix="%" note="仅统计已作答的可判分题目" />
                  <Metric label="题目作答" value={String(data.answered)} suffix={` / ${data.answerTotal}`} note={`当前覆盖率 ${answeredRate}%`} />
                  <Metric label="已批改" value={String(data.graded)} suffix={` / ${data.gradeTotal}`} note={`教师批改进度 ${gradedRate}%`} />
                </Grid>
                <div className="hw-summary-answer-bars">
                  <Meter value={81} label="客观题正确率" detail="选择、判断、客观填空及材料客观小题" />
                  <Meter value={68} label="主观题得分率" detail="主观题与材料主观小题按当前已批改结果统计" />
                </div>
              </CardContent>
            </Card>
          </section>

          <section aria-labelledby="hw-structure-title">
            <Card className="hw-summary-secondary-card">
              <CardHeader>
                <div>
                  <CardTitle as="h2" id="hw-structure-title">习题构成</CardTitle>
                  <CardDescription>用于解释统计口径，不与完成情况争夺视觉注意力。</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="hw-summary-question-structure">
                  <div className="hw-summary-question-total">
                    <strong className="rain-type-data">12</strong>
                    <span>题</span>
                    <p>本次作业</p>
                  </div>
                  <div className="hw-summary-question-groups">
                    <div>
                      <span className="hw-summary-structure-dot" data-tone="auto" />
                      <p><strong>自动判分 8 题</strong><small>客观习题 5 · 材料客观小题 3</small></p>
                    </div>
                    <div>
                      <span className="hw-summary-structure-dot" data-tone="manual" />
                      <p><strong>教师批改 4 题</strong><small>主观习题 3 · 材料主观小题 1</small></p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section ref={detailsRef} className="hw-summary-students" aria-labelledby="hw-students-title">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle as="h2" id="hw-students-title">学生明细</CardTitle>
                  <CardDescription>快速定位未完成、低完成度和需要继续批改的学生。</CardDescription>
                </div>
                <div className="hw-summary-student-filter">
                  <Select
                    aria-label="筛选学生状态"
                    clearable={false}
                    value={studentFilter}
                    onValueChange={(value) => {
                      if (typeof value === "string") setStudentFilter(value);
                    }}
                    options={[
                      { value: "all", label: "全部状态" },
                      { value: "done", label: "已完成" },
                      { value: "unfinished", label: "未完成" },
                      { value: "attention", label: "需关注" },
                    ]}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <TableScrollArea aria-label="学生作业情况">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>学生</TableHead>
                        <TableHead>完成进度</TableHead>
                        <TableHead>正确率</TableHead>
                        <TableHead>批改进度</TableHead>
                        <TableHead>状态</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell><strong className="hw-summary-student-name">{student.name}</strong></TableCell>
                          <TableCell>{student.completed} / {student.total} 题</TableCell>
                          <TableCell>{student.accuracy === null ? "—" : `${student.accuracy}%`}</TableCell>
                          <TableCell>{student.graded} / {student.gradeTotal} 份</TableCell>
                          <TableCell>
                            <span className="hw-summary-status" data-status={student.status}>
                              {statusLabel[student.status]}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableScrollArea>
                {filteredStudents.length === 0 ? <p className="hw-summary-empty">当前筛选下没有学生。</p> : null}
              </CardContent>
            </Card>
          </section>

          <footer className="hw-summary-footer">
            <p>页面使用虚构教学数据，仅用于 Rain Next 高保真原型验证。</p>
          </footer>
        </Stack>
      </div>
    </main>
  );
}
