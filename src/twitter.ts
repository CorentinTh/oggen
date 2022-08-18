import { MetadataFlat } from './types';

export { pickTwitterCompatibleMetadata };

const twitterCompatibility = {
  'og:description': 'twitter:description',
  'og:title': 'twitter:title',
  'og:image': 'twitter:image',
  'og:image:url': 'twitter:image',
  'og:image:alt': 'twitter:image:alt',
};

function pickTwitterCompatibleMetadata({ meta }: { meta: MetadataFlat }): MetadataFlat {
  return {
    ...Object.fromEntries(
      Object.entries(meta)
        .map(([k, v]) => [twitterCompatibility[k as keyof typeof twitterCompatibility], v])
        .filter(([k]) => k),
    ),
  };
}
