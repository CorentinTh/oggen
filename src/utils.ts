export { isObject, toSnakeCase };

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && !Array.isArray(v) && v !== null && !(v instanceof Date);

const toSnakeCase = (s: string) => s.split(':').map(toSnakeCaseStrict).join(':');

const toSnakeCaseStrict = (s: string) =>
  s
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x: string) => x.toLowerCase())
    .join('_') ?? '';
