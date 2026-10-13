import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const ISSUES_DATA_PATH = path.join(__dirname, "..", "data", "issues.json");

export async function readIssues() {
  try {
    const text = await fs.readFile(ISSUES_DATA_PATH, "utf8");
    return JSON.parse(text);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export async function writeIssue(issues) {
  await fs.writeFile(ISSUES_DATA_PATH, JSON.stringify(issues, null, 2));
}

export async function createIssue(input) {
  const issues = await readIssues();
  const issue = {
    id: randomUUID(),
    title: input.title.trim(),
    description: input.description.trim(),
    priority: input.priority,
    status: "Open",
    createdAt: new Date().toISOString(),
  };

  issues.push(issue);
  await writeIssues(issues);
  return issue;
}

export async function updateIssueStatus(id, status) {
  const issues = await readIssues();
  const issue = issues.find((item) => item.id === id);
  if (!issue) return null;

  issue.status = status;
  await writeIssues(issues);
  return issue;
}
