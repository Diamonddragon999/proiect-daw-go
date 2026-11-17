import CourseCard from "@/components/CourseCard";
import type { Course } from "@/data/courseCatalog";
import type { Language } from "@/i18n";
import { Link } from "react-router-dom";
import { useState } from "react";

interface CoursePlacement {
  course: Course;
  column: number;
  row: number;
  columnSpan: number;
  rowSpan: number;
}

export default function CourseSearch({
  courses,
  language,
  layoutSeed,
  placeholder,
  emptyMessage,
  noResultsMessage,
}: {
  courses: Course[];
  language: Language;
  layoutSeed: string;
  placeholder: string;
  emptyMessage: string;
  noResultsMessage: string;
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeSearchText(query.trim());
  const filteredCourses = courses.filter((course) => {
    if (!normalizedQuery) return true;

    return [
      course.title[language],
      course.description[language],
      course.category[language],
      course.slug,
    ].some((value) => normalizeSearchText(value).includes(normalizedQuery));
  });

  const courseGroups = new Map<string, Course[]>();
  for (const course of filteredCourses) {
    const group = course.category[language];
    courseGroups.set(group, [...(courseGroups.get(group) ?? []), course]);
  }

  return (
    <>
      <div className="relative w-[50vw] min-w-70">
        <label className="sr-only" htmlFor="course-search">
          {placeholder}
        </label>
        <span className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500">
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          autoComplete="off"
          className="border border-(--navbar-gray) rounded-3xl w-full h-12 pl-14 pr-6 bg-(--fmi-accent) shadow-md focus:outline-none focus:ring-0 focus:border-(--navbar-gray)"
          id="course-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          type="search"
          value={query}
        />
      </div>

      <div aria-live="polite" className="w-full p-4 flex flex-col gap-4">
        {courses.length === 0 ? (
          <p className="text-(--text-600)">{emptyMessage}</p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-(--text-600)">{noResultsMessage}</p>
        ) : (
          [...courseGroups].map(([group, groupedCourses]) => (
            <section className="flex flex-col gap-4" key={group}>
              <h2 className="text-xl font-bold text-(--text-900)">{group}</h2>
              <div
                className="flex w-full flex-col gap-4 font-normal lg:grid lg:grid-cols-4 lg:gap-4"
                style={{
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gridTemplateRows: `repeat(${getMosaicRowCount(groupedCourses)}, minmax(0, 10rem))`,
                }}
              >
                {getCoursePlacements(groupedCourses, layoutSeed, language).map(
                  ({ course, column, row, columnSpan, rowSpan }, index) => (
                    <Link
                      className="block h-48 w-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 lg:h-full lg:rounded-3xl"
                      to={`/${language}/courses/${course.slug}`}
                      key={course.slug}
                      style={{
                        gridColumn: `${column + 1} / span ${columnSpan}`,
                        gridRow: `${row + 1} / span ${rowSpan}`,
                      }}
                    >
                      <CourseCard
                        description={course.description[language]}
                        mosaic
                        name={course.title[language]}
                        patternIndex={index}
                      />
                    </Link>
                  ),
                )}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  );
}

function getMosaicRowCount(
  courses: Course[],
): number {
  const columnCount = 4;
  return Math.ceil((courses.length * 2) / columnCount);
}

function getCoursePlacements(
  courses: Course[],
  layoutSeed: string,
  language: Language,
): CoursePlacement[] {
  const random = createRandomGenerator(
    `${layoutSeed}:${courses.map((course) => course.slug).join("|")}`,
  );

  const courseWeights = new Map<string, number>(
    courses.map((course) => [
      course.slug,
      getCourseAreaWeight(course, language),
    ]),
  );
  const getCourseWeight = (course: Course) => {
    const weight = courseWeights.get(course.slug);
    if (weight === undefined) {
      throw new Error(`Missing mosaic area weight for "${course.slug}".`);
    }
    return weight;
  };
  const shuffledCourses = [...courses];
  for (let index = shuffledCourses.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffledCourses[index], shuffledCourses[swapIndex]] = [
      shuffledCourses[swapIndex],
      shuffledCourses[index],
    ];
  }
  shuffledCourses.sort(
    (left, right) => getCourseWeight(right) - getCourseWeight(left),
  );

  const placements: CoursePlacement[] = [];
  const columnCount = 4;
  const rowCount = getMosaicRowCount(courses);

  function split(
    remaining: Course[],
    column: number,
    row: number,
    columnSpan: number,
    rowSpan: number,
  ) {
    if (remaining.length === 1) {
      placements.push({
        course: remaining[0],
        column,
        row,
        columnSpan,
        rowSpan,
      });
      return;
    }

    const splitColumns =
      columnSpan > rowSpan ||
      (columnSpan === rowSpan && random() < 0.5);
    const axisLength = splitColumns ? columnSpan : rowSpan;
    const crossLength = splitColumns ? rowSpan : columnSpan;
    const totalWeight = remaining.reduce(
      (sum, course) => sum + getCourseWeight(course),
      0,
    );
    const validSplits: Array<{
      itemCount: number;
      axisLength: number;
      score: number;
    }> = [];
    let firstWeight = 0;

    for (let itemCount = 1; itemCount < remaining.length; itemCount++) {
      firstWeight += getCourseWeight(remaining[itemCount - 1]);
      const minimumAxisLength = Math.ceil(itemCount / crossLength);
      const maximumAxisLength =
        axisLength -
        Math.ceil((remaining.length - itemCount) / crossLength);

      if (minimumAxisLength > maximumAxisLength) continue;

      const targetAxisLength =
        (axisLength * firstWeight) / totalWeight;
      for (
        let candidateAxisLength = minimumAxisLength;
        candidateAxisLength <= maximumAxisLength;
        candidateAxisLength++
      ) {
        validSplits.push({
          itemCount,
          axisLength: candidateAxisLength,
          score:
            Math.abs(candidateAxisLength - targetAxisLength) + random() * 0.8,
        });
      }
    }

    if (validSplits.length === 0) {
      throw new Error("Unable to split the course mosaic without overflow.");
    }

    const selectedSplit = validSplits.reduce((best, candidate) =>
      candidate.score < best.score ? candidate : best,
    );
    const first = remaining.slice(0, selectedSplit.itemCount);
    const second = remaining.slice(selectedSplit.itemCount);
    const firstColumnSpan = splitColumns
      ? selectedSplit.axisLength
      : columnSpan;
    const firstRowSpan = splitColumns
      ? rowSpan
      : selectedSplit.axisLength;
    const secondColumn = splitColumns
      ? column + selectedSplit.axisLength
      : column;
    const secondRow = splitColumns
      ? row
      : row + selectedSplit.axisLength;
    const secondColumnSpan = splitColumns
      ? columnSpan - selectedSplit.axisLength
      : columnSpan;
    const secondRowSpan = splitColumns
      ? rowSpan
      : rowSpan - selectedSplit.axisLength;

    split(first, column, row, firstColumnSpan, firstRowSpan);
    split(second, secondColumn, secondRow, secondColumnSpan, secondRowSpan);
  }

  split(shuffledCourses, 0, 0, columnCount, rowCount);
  return placements.sort(
    (left, right) =>
      courses.indexOf(left.course) - courses.indexOf(right.course),
  );
}

function getCourseAreaWeight(
  course: Course,
  language: Language,
): number {
  const titleLines = estimateLineCount(course.title[language], 12);
  const descriptionLines = course.description[language]
    ? Math.min(2, estimateLineCount(course.description[language], 24))
    : 0;
  const estimatedContentHeight =
    48 + titleLines * 29 + descriptionLines * 24;
  const textWeight = Math.max(1, estimatedContentHeight / 164) ** 1.35;
  const importanceWeight = 0.8 + course.importance * 0.12;

  return textWeight * importanceWeight;
}

function estimateLineCount(text: string, charactersPerLine: number): number {
  let lineCount = 1;
  let lineLength = 0;

  for (const word of text.trim().split(/\s+/)) {
    if (word.length > charactersPerLine) {
      if (lineLength > 0) lineCount++;
      lineCount += Math.floor((word.length - 1) / charactersPerLine);
      lineLength = word.length % charactersPerLine;
      continue;
    }

    const nextLength = lineLength === 0 ? word.length : lineLength + word.length + 1;
    if (nextLength > charactersPerLine) {
      lineCount++;
      lineLength = word.length;
    } else {
      lineLength = nextLength;
    }
  }

  return lineCount;
}

function createRandomGenerator(seedText: string): () => number {
  let seed = 2166136261;
  for (const character of seedText) {
    seed = Math.imul(seed ^ character.charCodeAt(0), 16777619);
  }

  return () => {
    seed += 0x6d2b79f5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}
