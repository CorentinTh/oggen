import { pickTwitterCompatibleMetadata } from './twitter';
import { MetadataConfig, MetadataFlat } from './types';
import { isObject, toSnakeCase } from './utils';

export { generateMeta, flattenMetadata, buildMetaStrings };

function generateMetaForType({ title, flatMetadata, type }: { title: string; flatMetadata: MetadataFlat[]; type: string }) {
  if (flatMetadata.length === 0) return [];

  return [`<!-- ${title} -->`, ...buildMetaStrings({ flatMetadata, type })];
}

function generateMeta(
  { twitter: twitterMetadataRaw, ...ogMetadataRaw }: MetadataConfig,
  { indentation = 0, indentWith = '  ', generateTwitterCompatibleMeta = false }: { indentation?: number; indentWith?: string; generateTwitterCompatibleMeta?: boolean } = {},
) {
  const ogMetadataFlat = flattenMetadata(ogMetadataRaw, { basePrefix: 'og' });
  const twitterMetadataFlat = flattenMetadata(twitterMetadataRaw, { basePrefix: 'twitter' });
  const metaStringGroups = [
    generateMetaForType({
      title: 'og meta',
      flatMetadata: ogMetadataFlat,
      type: 'property',
    }),

    generateMetaForType({
      title: 'twitter meta',
      flatMetadata: [
        ...twitterMetadataFlat,
        ...(generateTwitterCompatibleMeta ? pickTwitterCompatibleMetadata({ existingMeta: ogMetadataFlat, twitterMeta: twitterMetadataFlat }) : []),
      ],
      type: 'name',
    }),
  ];

  const metaGroups = metaStringGroups
    .filter((group) => group && group.length > 0)
    .map((group) => (group as string[]).map((str) => indentWith.repeat(indentation) + str).join('\n'));

  return metaGroups.join('\n\n');
}

function stringifyValue(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}

function flattenMetadata(metadata: unknown, { separator = ':', basePrefix = '' }: { separator?: string; basePrefix?: string } = {}): MetadataFlat[] {
  const acc: MetadataFlat[] = [];

  const walk = (node: unknown, prefix = '') => {
    if (node === undefined || node === '') return;

    if (isObject(node)) {
      for (const [key, value] of Object.entries(node)) {
        const prefixedKey = [prefix, toSnakeCase(key)].filter(Boolean).join(separator);
        walk(value as MetadataConfig, prefixedKey);
      }
    } else if (Array.isArray(node)) {
      for (const value of node) {
        walk(value, prefix);
      }
    } else {
      acc.push({ key: prefix, value: stringifyValue(node) });
    }
  };

  walk(metadata, basePrefix);

  return acc;
}

function metaToString({ flatMetadata: { key, value }, type }: { flatMetadata: MetadataFlat; type: string }) {
  return `<meta ${type.trim()}="${key.trim()}" value="${value.trim()}" />`;
}

function buildMetaStrings({ flatMetadata, type }: { flatMetadata: MetadataFlat[]; type: string }) {
  return flatMetadata.map((flatMetadata) => metaToString({ flatMetadata, type }));
}
