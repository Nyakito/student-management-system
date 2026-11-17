import { useState } from "react";
import {
  report,
  stats,
  totalNumber,
  averageMarks,
  PASS_MARK,
  hasRepeater,
  allAboveZero,
  findStudent,
} from "./app.js";

const FILTERS = {
  all: { label: "Everyone", test: () => true },
  top: { label: "70 and above", test: (s) => s.marks >= 70 },
  failed: { label: "Below pass mark", test: (s) => s.marks < PASS_MARK },
  fees: { label: "Fees pending", test: (s) => !s.feesPaid },
};

export default function App() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const searchId = Number(query);
  const searched = query.trim() !== "" ? findStudent(searchId) : null;
  const searching = query.trim() !== "";

  const visible = searching
    ? report.filter((s) => s.id === searchId)
    : report.filter(FILTERS[filter].test);

  return (
    <main className="board">
      <header className="masthead">
        <h1>Results board</h1>
        <p className="lede">
          {totalNumber} students. Class average {averageMarks.toFixed(1)}, pass mark {PASS_MARK}.
        </p>
      </header>

      <section className="tally" aria-label="Class summary">
        <div className="tally-item pass"><strong>{stats.passed}</strong> passed</div>
        <div className="tally-item fail"><strong>{stats.failed}</strong> failed</div>
        <div className="tally-item"><strong>{stats.feesPaidCount}</strong> fees paid</div>
        <div className="tally-item warn"><strong>{stats.feesNotPaid}</strong> fees pending</div>
      </section>

      {hasRepeater && (
        <p className="note">At least one student scored below 40 and needs to repeat.</p>
      )}
      {!allAboveZero && <p className="note">Some students have a mark of zero. Check the records.</p>}

      <section className="controls">
        <label className="search">
          <span>Find by student ID</span>
          <input
            type="number"
            min="1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 4"
          />
        </label>

        <div className="chips" role="group" aria-label="Filter students">
          {Object.entries(FILTERS).map(([key, { label }]) => (
            <button
              key={key}
              type="button"
              className={!searching && filter === key ? "chip on" : "chip"}
              onClick={() => {
                setQuery("");
                setFilter(key);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {searching && !searched && (
        <p className="empty">No student found with ID {query}. Try a number from 1 to {totalNumber}.</p>
      )}
      {!searching && visible.length === 0 && (
        <p className="empty">No students match this filter.</p>
      )}

      <ul className="slips">
        {visible.map((s) => (
          <li key={s.id} className={`slip grade-${s.grade}`}>
            <div className="grade" aria-label={`Grade ${s.grade}`}>{s.grade}</div>
            <div className="info">
              <h2>{s.name}</h2>
              <p className="course">{s.course}</p>
              <div className="meter" role="img" aria-label={`${s.marks} marks`}>
                <span className="fill" style={{ width: `${s.marks}%` }} />
                <span className="avg" style={{ left: `${averageMarks}%` }} title="Class average" />
                <span className="pass-line" style={{ left: `${PASS_MARK}%` }} title="Pass mark" />
              </div>
              <p className="meta">
                <b>{s.marks}</b> marks, age {s.age}
              </p>
              <p className="tags">
                <span className={s.status === "Passed!" ? "tag ok" : "tag bad"}>{s.status}</span>
                <span className={s.feesPaid ? "tag ok" : "tag bad"}>
                  {s.feesPaid ? "Fees paid" : "Fees pending"}
                </span>
                <span className="tag">{s.aboveAverage ? "Above average" : "Below average"}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
