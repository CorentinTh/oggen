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

function metaToString({ metaName, metaValue, type }: { metaName: string; metaValue: MetadataValue; type: string }) {
  return `<meta ${type.trim()}="${metaName.trim()}" value="${metaValue.toString().trim()}" />`;
}

function buildMetaStrings({ meta, type }: { meta: MetadataFlat; type: string }) {
  return Object.entries(meta).map(([metaName, metaValue]) => metaToString({ metaName, metaValue, type }));
}
