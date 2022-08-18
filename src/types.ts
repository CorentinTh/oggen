export { MetadataValue, MetadataFlat, MetadataConfig };

type MetadataValue = boolean | string | Date | number;

interface MetadataConfig {
  [key: string]: MetadataValue | MetadataConfig;
}

interface MetadataFlat {
  [key: string]: MetadataValue;
}
