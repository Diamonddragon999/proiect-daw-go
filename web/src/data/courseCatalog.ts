import courseIndex from "@/content/courses/index.json";
import { isLanguage, type Language } from "@/i18n";

export interface CourseSource {
  id: string;
  label: string;
  owner: string;
  repository: string;
  branch: string;
  path: string;
  folders: Array<{ label: string; path: string }>;
  includeRootFiles: boolean;
}

export type CourseImportance = 1 | 2 | 3 | 4 | 5;

export interface Course {
  slug: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  category: Record<Language, string>;
  importance: CourseImportance;
  academicYear?: string;
  semester?: string;
  sources: CourseSource[];
}

export interface Lesson {
  slug: string;
  courseSlug: string;
  language: Language;
  title: string;
  description: string;
  order: number;
  body: string;
}

const sourceConfigs = import.meta.glob<{ sources: CourseSource[] }>(
  "../content/courses/*.json",
  { eager: true, import: "default" },
);

const sourcesByCourse: Record<string, CourseSource[]> = {};
for (const [filePath, config] of Object.entries(sourceConfigs)) {
  const fileName = filePath.split("/").pop();
  const slug = fileName?.replace(/\.json$/, "");
  if (slug && slug !== "index") sourcesByCourse[slug] = config.sources;
}

export const courses: Course[] = courseIndex.courses
  .map((course) => {
    const sources = sourcesByCourse[course.slug];
    if (!sources) {
      throw new Error(`Missing source configuration for course "${course.slug}".`);
    }
    if (!isCourseImportance(course.importance)) {
      throw new Error(`Invalid importance for course "${course.slug}".`);
    }
    return { ...course, importance: course.importance, sources };
  })
  .sort(
    (left, right) =>
      (left.academicYear ?? "").localeCompare(
        right.academicYear ?? "",
        undefined,
        { numeric: true },
      ) ||
      compareSemester(left.semester, right.semester) ||
      left.title.en.localeCompare(right.title.en) ||
      left.slug.localeCompare(right.slug),
  );

const lessonFiles = import.meta.glob<string>("../content/lessons/**/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const lessons: Lesson[] = Object.entries(lessonFiles)
  .map(([filePath, source]) => parseLesson(filePath, source))
  .filter((lesson): lesson is Lesson => lesson !== null);

export function getGitHubTreeUrl(
  source: CourseSource,
  relativePath = "",
): string {
  const path = [source.path, relativePath]
    .filter(Boolean)
    .join("/")
    .split("/")
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/");

  return `https://github.com/${encodeURIComponent(source.owner)}/${encodeURIComponent(source.repository)}/tree/${encodeURIComponent(source.branch)}/${path}`;
}

function parseLesson(filePath: string, source: string): Lesson | null {
  const fileMatch = filePath.match(
    /content\/lessons\/([^/]+)\/([a-z0-9-]+)\.(en|ro)\.mdx$/,
  );
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!fileMatch || !frontmatter) {
    throw new Error(`Invalid lesson content file: ${filePath}`);
  }

  const [, courseSlug, slug, rawLanguage] = fileMatch;
  if (!isLanguage(rawLanguage)) {
    throw new Error(`Unsupported lesson language in "${filePath}".`);
  }

  const fields: Record<string, string> = {};
  for (const line of frontmatter[1].split(/\r?\n/)) {
    const field = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (field) fields[field[1]] = field[2].replace(/^(['"])(.*)\1$/, "$2");
  }
  if (fields.published !== "true") return null;

  const order = Number(fields.order);
  if (!fields.title || !fields.description || !Number.isFinite(order)) {
    throw new Error(`Invalid lesson metadata in "${filePath}".`);
  }

  return {
    slug,
    courseSlug,
    language: rawLanguage,
    title: fields.title,
    description: fields.description,
    order,
    body: source.slice(frontmatter[0].length).trim(),
  };
}

function compareSemester(left?: string, right?: string): number {
  if (left === right) return 0;
  if (!left) return 1;
  if (!right) return -1;
  if (left === "Optionals") return 1;
  if (right === "Optionals") return -1;
  return left.localeCompare(right, undefined, { numeric: true });
}

function isCourseImportance(value: number): value is CourseImportance {
  return Number.isInteger(value) && value >= 1 && value <= 5;
}
