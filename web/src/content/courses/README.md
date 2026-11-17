# Adding repository materials to a course

Course configuration is split into a shared registry and a config file for each
course:

- `index.json` lists the courses shown on the website, including their localized
  category labels.
- `<course-slug>.json` defines where that course's materials come from.

Each registry entry must define `category` as English and Romanian labels. Courses
with the same category value in the selected language appear under the same heading.
Categories are explicit: they are not inferred from descriptions, year, or semester.
Course slugs are concise stable identifiers used for the registry, config filenames,
lesson directories, and public URLs. Keep academic year and semester in their
dedicated metadata fields and category labels, not in the slug. When course names
repeat, add a numeric suffix, such as `engleza-1` and `engleza-2`.

## Add a repository to an existing course

1. Open the repository on GitHub and confirm it is public. The sync script
   fetches repository tree metadata and the website links to the original files;
   it does not clone or copy repository contents.
2. Open the course's config file, for example
   `programarea-algorimilor.json`.
3. Add a source object to its `sources` array. Use the repository owner, repository
   name, branch, and course folder path. Set `folders` to the folder paths to show
   to students. These paths are relative to the course `path`.
4. Save the JSON and run `npm run refresh:content`. This updates the local
   snapshot and builds the site.
5. Open `/en/courses/<public-course-slug>` or `/ro/courses/<public-course-slug>` and check that
   the source appears, the configured folders open, and files link to the expected
   GitHub content.

When a course has multiple sources, they are shown as peer resources. The source
choices stay available while browsing one repository so students can switch
between them without returning to the course overview.

For example, to add a second repository with lectures and labs to a course, append
another item to the existing `sources` array:

```json
{
  "id": "extra-materials",
  "label": "Additional lectures and labs",
  "owner": "example-org",
  "repository": "course-materials",
  "branch": "main",
  "path": "computer-science/course",
  "folders": [
    { "label": "Lectures", "path": "Lectures" },
    { "label": "Labs", "path": "Labs" }
  ],
  "includeRootFiles": false
}
```

The complete course config would then look like:

```json
{
  "sources": [
    {
      "id": "main",
      "label": "FMI-Materials/FMI-Bachelor-Materials",
      "owner": "FMI-Materials",
      "repository": "FMI-Bachelor-Materials",
      "branch": "main",
      "path": "Year I/Semester I/Programarea Algorimilor",
      "folders": [
        { "label": "Materiale", "path": "Materiale" },
        { "label": "Tutoriate", "path": "Tutoriate" }
      ],
      "includeRootFiles": true
    },
    {
      "id": "extra-materials",
      "label": "Additional lectures and labs",
      "owner": "example-org",
      "repository": "course-materials",
      "branch": "main",
      "path": "computer-science/course",
      "folders": [
        { "label": "Lectures", "path": "Lectures" },
        { "label": "Labs", "path": "Labs" }
      ],
      "includeRootFiles": false
    }
  ]
}
```

### Source field reference

- `id`: unique identifier within this course; use lowercase letters, numbers, and
  hyphens. It is included in the materials URL.
- `label`: heading displayed for this source on the course page.
- `owner`, `repository`, `branch`: GitHub organization/user, repository name, and
  branch to read.
- `path`: directory in the repository for this course. Use the path as shown in
  GitHub, without URL-encoding spaces.
- `folders`: allow-list of folders that appear on the course page. Each `path` is
  relative to the source `path`; nested paths such as `Materiale/Cursuri` work.
  Only listed folders and their descendants can be browsed.
- `includeRootFiles`: show files located directly in the source `path`. This does
  not make unlisted folders visible.

Use a separate source entry when materials are split across repositories, branches,
or unrelated directories. A repository must be public for the current integration.
The website reads from `content/github-materials.json`; it makes no GitHub
requests at runtime. Run `npm run refresh:content` after source config changes or
when you want to update upstream metadata, then commit the updated snapshot. The
sync script fetches Git tree metadata and records only file paths and sizes for
configured source paths. GitHub may truncate recursive trees for large
repositories, so the script splits those into requests for configured subtrees.
For repositories with many configured roots, set `GITHUB_TOKEN` in the
environment to avoid the low unauthenticated API limit. Never expose the token
through a `NEXT_PUBLIC_` variable.

## Add a new course

1. Choose a concise, stable lowercase, hyphenated slug, such as `example`.
2. Add an entry with that slug, English and Romanian title and description, a
   localized `category`, an `importance` value from 1 to 5, and optional
   `academicYear` and `semester` fields to `index.json`. Reuse category labels
   to group courses together. Importance biases the course toward larger card
   sizes; it changes the odds, not a fixed size assignment.
3. Create `<slug>.json` next to `index.json`, with a `sources` array. Use
   `"sources": []` if the course is not ready to show materials yet.
4. Add the course's lesson directory under `../lessons/<slug>/` if it will have
   website-authored MDX lessons.
5. Run `npm run refresh:content` and check the resulting course and source folders.

Course configuration is data-driven: sources can point to different repositories
and branches, so a course does not need to live in the existing FMI materials
repository.

Example registry entry:

```json
{
  "slug": "example",
  "title": {
    "en": "Example Course",
    "ro": "Curs Exemplu"
  },
  "description": {
    "en": "Example description.",
    "ro": "Descriere de exemplu."
  },
  "importance": 3,
  "category": {
    "en": "Year I · Semester I",
    "ro": "Anul I · Semestrul I"
  },
  "academicYear": "Year I",
  "semester": "Semester I"
}
```
