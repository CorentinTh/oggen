import { MetadataFlat, MetadataValue } from './types';

export { buildMetaStrings, Meta };

interface MetaBase {
  content: string;
}
interface MetaProperty extends MetaBase {
  property: string;
}
interface MetaName extends MetaBase {
  name: string;
}

type Meta = MetaName | MetaProperty;

function metaToString({ metaName, metaValue, type }: { metaName: string; metaValue: MetadataValue | MetadataValue[]; type: string }) {
  return [metaValue].flat().map((value) => `<meta ${type.trim()}="${metaName.trim()}" value="${value.toString().trim()}" />`);
}

function buildMetaStrings({ meta, type }: { meta: MetadataFlat; type: string }) {
  return Object.entries(meta).flatMap(([metaName, metaValue]) => metaToString({ metaName, metaValue, type }));
}
