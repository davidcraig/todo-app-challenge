export default function ObjectSortByKeys(
  obj: Record<string, any>,
): Record<string, any> {
  return Object.keys(obj)
    .sort()
    .reduce(
      (acc, key) => {
        acc[key] = obj[key];
        return acc;
      },
      {} as Record<string, any>,
    );
}
