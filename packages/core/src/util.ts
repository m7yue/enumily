import { SourceType } from '.'

export function getAllEnumerableEntities(obj: SourceType) {
  const selfEntities = [];
  const protoEntities = []

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      selfEntities.push([key, obj[key]])
    }
    else {
      protoEntities.push([key, obj[key]]);
    }
  }

  return [...protoEntities, ...selfEntities];
}