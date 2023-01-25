import {getPersonById} from "./relationships-diff/RelationshipsDiff";

export const generateLocalId = () => Math.random().toString(36).substring(2, 9);

export const relationshipCompareFunction = (rA, rB, persons) => {
  const rAType = rA.type;
  const rBType = rB.type;
  const typeComparisonResult = rAType.localeCompare(rBType);
  if (typeComparisonResult !== 0) {
    return typeComparisonResult;
  }
  const rAp1Name = getPersonById(rA.person1.resourceId, persons)?.names[0]?.nameForms[0]?.fullText;
  const rBp1Name = getPersonById(rB.person1.resourceId, persons)?.names[0]?.nameForms[0]?.fullText;
  const person1NameComparisonResult = rAp1Name.localeCompare(rBp1Name);
  if (person1NameComparisonResult !== 0) {
    return person1NameComparisonResult;
  }
  const rAp2Name = getPersonById(rA.person2.resourceId, persons)?.names[0]?.nameForms[0]?.fullText;
  const rBp2Name = getPersonById(rB.person2.resourceId, persons)?.names[0]?.nameForms[0]?.fullText;
  return rAp2Name.localeCompare(rBp2Name);
};
