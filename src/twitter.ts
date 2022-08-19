import { MetadataFlat } from './types';

export { pickTwitterCompatibleMetadata };

const twitterCompatibility: Record<string, string> = {
  'og:description': 'twitter:description',
  'og:title': 'twitter:title',
  'og:image': 'twitter:image',
  'og:image:url': 'twitter:image',
  'og:image:alt': 'twitter:image:alt',
};

function pickTwitterCompatibleMetadata({ existingMeta, twitterMeta }: { existingMeta: MetadataFlat[]; twitterMeta: MetadataFlat[] }): MetadataFlat[] {
  return existingMeta
    .filter(({ key }) => key in twitterCompatibility && twitterMeta.find((tm) => tm.key === twitterCompatibility[key]) === undefined)
    .map(({ key, value }) => ({ key: twitterCompatibility[key] ?? key, value }));
}
