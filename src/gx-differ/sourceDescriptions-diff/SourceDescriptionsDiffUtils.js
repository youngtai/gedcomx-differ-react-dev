function updateSourceDescriptionsData(recordsData) {
  const sourceDescriptions = recordsData.gx.sourceDescriptions;
  const intersection = getRecordDataIntersection(
    sourceDescriptions,
    recordsData.comparingToGx.sourceDescriptions
  );
  const finalGx = recordsData.finalGx;
  finalGx.sourceDescriptions = intersection;
  recordsData.setFinalGx(structuredClone(finalGx));

  const gx = recordsData.gx;
  gx.sourceDescriptions = sourceDescriptions;
  recordsData.setGx(structuredClone(gx));
}

function coverageElementsAreEqual(coverage1, coverage2) {
  const equalSpatial = coverage1.spatial?.original === coverage2.spatial?.original;
  const equalTemporal = coverage1.temporal?.original === coverage2.temporal?.original;
  const equalRecordType = coverage1.recordType === coverage2.recordType;
  return equalSpatial && equalTemporal && equalRecordType;
}

// Note that `coverage` is an array
function recordCoverageAreEqual(coverage1, coverage2) {
  if ((!coverage1 && coverage2) || (coverage1 && !coverage2)) {
    return false;
  }
  if (coverage1.length !== coverage2.length) {
    return false;
  }
  return coverage1.every((c, index) => coverageElementsAreEqual(c, coverage2[index])
  );
}

function getRecordDataIntersection(left, right) {
  return left?.filter((leftSD) => {
    if (leftSD.resourceType === "http://gedcomx.org/Record") {
      return (
        right?.find((rightSD) => recordCoverageAreEqual(rightSD.coverage, leftSD.coverage)
        ) !== undefined
      );
    } else if (leftSD.resourceType === "http://gedcomx.org/DigitalArtifact") {
      return right
        ?.map((rightSD) => JSON.stringify(rightSD))
        ?.includes(JSON.stringify(leftSD));
    } else {
      return false;
    }
  });
}

export {updateSourceDescriptionsData, getRecordDataIntersection}
export function hasMatchingCoverageDataItem(coverageItem, label, comparingTo) {
  if (label === 'Spatial') {
    return (
      comparingTo
        .filter((sd) => sd.resourceType === 'http://gedcomx.org/Record')
        .map((sd) => sd.coverage)
        .flatMap((coverages) => coverages)
        .find(
          (coverage) => coverage.spatial &&
            coverage.spatial.original === coverageItem.original
        ) !== undefined
    )
  } else if (label === 'Temporal') {
    return (
      comparingTo
        .filter((sd) => sd.resourceType === 'http://gedcomx.org/Record')
        .map((sd) => sd.coverage)
        .flatMap((coverages) => coverages)
        .find(
          (coverage) => coverage.temporal &&
            coverage.temporal.original === coverageItem.original
        ) !== undefined
    )
  } else if (label === 'Record Type') {
    return (
      comparingTo
        .filter((sd) => sd.resourceType === 'http://gedcomx.org/Record')
        .map((sd) => sd.coverage)
        .flatMap((coverages) => coverages)
        .find(
          (coverage) => coverage.recordType && coverage.recordType === coverageItem
        ) !== undefined
    )
  }
}
