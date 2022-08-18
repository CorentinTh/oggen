import { buildMetaStrings } from './meta';
import { pickTwitterCompatibleMetadata } from './twitter';
import { MetadataConfig, MetadataFlat } from './types';
import { isObject, toSnakeCase } from './utils';

export { getMetaTagsAndValue, generateMeta };

function generateMetaForType({ title, flatMetadata, type }: { title: string; flatMetadata: MetadataFlat | undefined; type: string }) {
  if (!flatMetadata || Object.keys(flatMetadata).length === 0) return [];

  return [`<!-- ${title} -->`, ...buildMetaStrings({ meta: flatMetadata, type })];
}

function generateMeta(
  { twitter: twitterMetadataRaw, ...ogMetadataRaw }: MetadataConfig,
  { indentation = 0, indentWith = '  ', generateTwitterCompatibleMeta = false }: { indentation?: number; indentWith?: string; generateTwitterCompatibleMeta?: boolean } = {},
) {
  const ogMetadataFlat = getMetaTagsAndValue({ rawMetadata: ogMetadataRaw, prefix: 'og' });

  const metaStringGroups = [
    generateMetaForType({
      title: 'og meta',
      flatMetadata: ogMetadataFlat,
      type: 'property',
    }),

    generateMetaForType({
      title: 'twitter meta',
      flatMetadata: {
        ...(generateTwitterCompatibleMeta ? pickTwitterCompatibleMetadata({ meta: ogMetadataFlat }) : {}),
        ...getMetaTagsAndValue({ rawMetadata: twitterMetadataRaw as MetadataConfig, prefix: 'twitter' }),
      },
      type: 'name',
    }),
  ];

  const metaGroups = metaStringGroups
    .filter((group) => group && group.length > 0)
    .map((group) => (group as string[]).map((str) => indentWith.repeat(indentation) + str).join('\n'));

  return metaGroups.join('\n\n');
}

function getMetaTagsAndValue({
  rawMetadata,
  prefix = '',
  prefixSeparator = ':',
}: {
  rawMetadata: MetadataConfig | undefined;
  prefix?: string;
  prefixSeparator?: string;
}): MetadataFlat {
  if (!rawMetadata) return {};

  let collector = {};

  for (const [key, value] of Object.entries(rawMetadata)) {
    const prefixedKey = [prefix, toSnakeCase(key)].filter(Boolean).join(prefixSeparator);

    if (isObject(value)) {
      collector = { ...collector, ...getMetaTagsAndValue({ rawMetadata: value as MetadataConfig, prefix: prefixedKey, prefixSeparator }) };
    } else {
      collector = { ...collector, [prefixedKey]: value };
    }
  }

  return collector;
}
