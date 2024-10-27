function getFieldsIntersection(leftFields, rightFields) {
  if (!leftFields || !rightFields) {
    return [];
  }
  return leftFields.filter((field) =>
    rightFields.map((f) => JSON.stringify(f)).includes(JSON.stringify(field))
  );
}

export { getFieldsIntersection };export function hasMatchingField(field, comparingTo) {
    const fieldString = JSON.stringify(field)
    return (
      comparingTo?.find((f) => JSON.stringify(f) === fieldString) !== undefined
    )
  }

  export function updateFieldsData(recordsData) {
    recordsData.finalGx.fields = getFieldsIntersection(
      recordsData.gx.fields,
      recordsData.comparingToGx.fields
    )
    recordsData.setFinalGx(structuredClone(recordsData.finalGx))

    recordsData.setGx(structuredClone(recordsData.gx))
  }

