export { MetadataValue, MetadataFlat, MetadataConfig };

type MetadataValue = boolean | string | Date | number;

interface MetadataConfig {
  [key: string]: MetadataValue | MetadataValue[] | MetadataConfig;
}

interface MetadataFlat {
  key: string;
  value: string;
}
