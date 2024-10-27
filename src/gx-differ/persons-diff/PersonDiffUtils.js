import { FACT_KEYS, IGNORED_FACT_KEYS, NAME_PART_TYPE } from "../constants";
import { updateRelationshipsData } from "../relationships-diff/RelationshipsDiffUtils";
import { generateLocalId } from "../Utils";

function valuesAreEqual(valueA, valueB) {
  const sameType = valueA?.type === valueB?.type;
  const sameText = valueA?.text === valueB?.text;
  const sameLabelId = valueA?.labelId === valueB?.labelId;
  return sameType && sameText && sameLabelId;
}

function valueIsInValues(value, values) {
  return values.find((v) => valuesAreEqual(value, v)) !== undefined;
}

function fieldValuesAreEqual(valuesA, valuesB) {
  // console.log(valuesA, valuesB)
  if (valuesA?.length !== valuesB?.length) {
    return false;
  }
  if (!valuesA && !valuesB) {
    return true;
  }
  return valuesA?.every((valueA) => valueIsInValues(valueA, valuesB));
}

function fieldsAreEqual(fieldA, fieldB) {
  const sameType = fieldA?.type === fieldB?.type;
  const sameValue = fieldValuesAreEqual(fieldA?.values, fieldB?.values);
  return sameType && sameValue;
}

function fieldIsInFields(field, fields) {
  return fields.find((f) => fieldsAreEqual(field, f)) !== undefined;
}

function haveSamePersonFields(fieldsA, fieldsB) {
  if (fieldsA?.length !== fieldsB?.length) {
    return false;
  }
  if (!fieldsA && !fieldsB) {
    return true;
  }
  return fieldsA?.every((fieldA) => fieldIsInFields(fieldA, fieldsB));
}

function qualifiersAreEqual(qualifierA, qualifierB) {
  const sameName = qualifierA?.name === qualifierB?.name;
  const sameValue = qualifierA?.value === qualifierB?.value;
  return sameName && sameValue;
}

function factsAreEqual(factA, factB) {
  const factAKeys = Object.keys(factA)
    .filter((key) => factA[key] !== null)
    .filter((key) => !IGNORED_FACT_KEYS.includes(key));
  const factBKeys = Object.keys(factB)
    .filter((key) => factB[key] !== null)
    .filter((key) => !IGNORED_FACT_KEYS.includes(key));

  // console.log(factAKeys, factBKeys);
  // console.log(`Same number of keys: ${factAKeys.length === factBKeys.length}`);
  if (factAKeys.length !== factBKeys.length) {
    return false;
  }

  return factAKeys
    .map((factAKey) => {
      if (factAKey === FACT_KEYS.type || factAKey === FACT_KEYS.primary) {
        // if (factAKey === FACT_KEYS.type) {
        //   console.log(`Same type: ${factA[factAKey] === factB[factAKey]}`);
        // }
        // if (factAKey === FACT_KEYS.primary) {
        //   console.log(`Both primary: ${factA[factAKey] === factB[factAKey]}`);
        // }
        return factA[factAKey] === factB[factAKey];
      } else if (factAKey === FACT_KEYS.value) {
        // console.log(`Same value: ${factA[factAKey]?.toLowerCase() === factB[factAKey]?.toLowerCase()}`);
        return (
          factA[factAKey]?.toLowerCase() === factB[factAKey]?.toLowerCase()
        );
      } else if (factAKey === FACT_KEYS.date || factAKey === FACT_KEYS.place) {
        // if (factAKey === FACT_KEYS.date) {
        //   console.log(`Same date: ${factA[factAKey].original === factB[factAKey]?.original}`);
        // }
        // if (factAKey === FACT_KEYS.place) {
        //   console.log(`Same place: ${factA[factAKey].original === factB[factAKey]?.original}`);
        // }
        return factA[factAKey].original === factB[factAKey]?.original;
      } else if (factAKey === FACT_KEYS.qualifiers) {
        if (factA.qualifiers && factB.qualifiers) {
          // console.log(`Same qualifiers: ${factA.qualifiers.every(qA => factB.qualifiers.find(qB => qualifiersAreEqual(qA, qB)) !== undefined)}`);
          return factA.qualifiers.every(
            (qA) =>
              factB.qualifiers.find((qB) => qualifiersAreEqual(qA, qB)) !==
              undefined
          );
        }
        return !factA.qualifiers && !factB.qualifiers;
      } else if (IGNORED_FACT_KEYS.includes(factAKey)) {
        //ids can be different because this tool is for diffing independently created GedcomX
        // console.log(`Key was ignored: ${factAKey}`);
        return true;
      } else {
        console.error(`Unexpected fact key ${factAKey}`);
        return false;
      }
    })
    .every((result) => result === true);
}

function factIsInFacts(fact, facts) {
  return facts.find((f) => factsAreEqual(fact, f)) !== undefined;
}

function haveSameFacts(factsA, factsB) {
  if (factsA?.length !== factsB?.length) {
    return false;
  }
  if (!factsA && !factsB) {
    return true;
  }
  return factsA?.every((factA) => factIsInFacts(factA, factsB));
}

function getPartByType(parts, type) {
  return parts?.find((part) => part.type === type);
}

function haveSameNameParts(partsA, partsB) {
  return Object.keys(NAME_PART_TYPE)
    .map((key) => {
      const type = NAME_PART_TYPE[key];
      return (
        getPartByType(partsA, type)?.value ===
        getPartByType(partsB, type)?.value
      );
    })
    .every((result) => result);
}

function namesAreEqual(nameA, nameB, assertions) {
  // We'll assume persons have a single nameForm for now
  const personANameForm = nameA?.nameForms[0];
  const personBNameForm = nameB?.nameForms[0];
  const fullTextEqual = personANameForm?.fullText === personBNameForm?.fullText;
  const partsEqual = haveSameNameParts(
    personANameForm?.parts,
    personBNameForm?.parts
  );
  const typesEqual = assertions?.nameType ? nameA?.type === nameB?.type : true;

  return fullTextEqual && partsEqual && typesEqual;
}

function nameIsInNames(name, names, assertions) {
  return names?.find((n) => namesAreEqual(name, n, assertions)) !== undefined;
}

function haveSameNames(personA, personB, assertions) {
  const namesA = personA?.names;
  const namesB = personB?.names;
  if (namesA?.length !== namesB?.length) {
    return false;
  }
  if (!namesA && !namesB) {
    return true;
  }
  return namesA?.every((nameA) => nameIsInNames(nameA, namesB, assertions));
}

function isMatchingPerson(personA, personB) {
  return (
    haveSameNames(personA, personB) &&
    haveSameFacts(personA.facts, personB.facts) &&
    haveSamePersonFields(personA.fields, personB.fields)
  );
}

function personsAreEqual(personA, personB, assertions) {
  if (personA?.names?.length !== personB?.names?.length) {
    return false;
  }
  const namesAreEqual = haveSameNames(personA, personB, assertions);
  const sameFacts = haveSameFacts(personA?.facts, personB?.facts);
  const sameFields = haveSamePersonFields(personA?.fields, personB?.fields);
  const samePrincipalStatus = personA?.principal === personB?.principal;
  const sameGender = personA?.gender?.type === personB?.gender?.type;
  // const nameA = personA?.names[0]?.nameForms[0]?.fullText;
  // const nameB = personB?.names[0]?.nameForms[0]?.fullText;
  // console.log(`Person: ${nameA}`, `Person: ${nameB}`);
  // console.log(`Names are equal: ${namesAreEqual}`, `Same facts: ${sameFacts}`, `Same fields: ${sameFields}`, `Same principal status: ${samePrincipalStatus}`, `Same gender: ${sameGender}`);
  return (
    namesAreEqual &&
    sameFacts &&
    sameFields &&
    samePrincipalStatus &&
    sameGender
  );
}

function getPersonsIntersection(leftPersons, rightPersons, assertions) {
  return leftPersons.filter(
    (lp) =>
      rightPersons.find((rp) => personsAreEqual(lp, rp, assertions)) !==
      undefined
  );
}

function hasMatchingPerson(person, comparingTo, assertions) {
  return (
    comparingTo.find((p) => personsAreEqual(person, p, assertions)) !==
    undefined
  );
}

function getNamePartByType(parts, type) {
  return parts.find((part) => part.type === type);
}

function getFullTextName(nameParts) {
  return [
    nameParts?.prefix?.value,
    nameParts?.given?.value,
    nameParts?.surname?.value,
    nameParts?.suffix?.value,
  ]
    .join(" ")
    .trim();
}

function getNamePartsObject(parts) {
  return {
    prefix: getNamePartByType(parts, NAME_PART_TYPE.prefix),
    given: getNamePartByType(parts, NAME_PART_TYPE.given),
    surname: getNamePartByType(parts, NAME_PART_TYPE.surname),
    suffix: getNamePartByType(parts, NAME_PART_TYPE.suffix),
  };
}

function hasMatchingField(person, comparingToPersons) {
  const matchingPerson = comparingToPersons.find((comparingToPerson) =>
    isMatchingPerson(person, comparingToPerson)
  );
  if (matchingPerson) {
    return haveSamePersonFields(person?.fields, matchingPerson?.fields);
  }
}

function updateRecordsData(recordsData) {
  const persons = recordsData.gx.persons;
  const comparingTo = recordsData.comparingToGx.persons;

  recordsData.finalGx.persons = getPersonsIntersection(persons, comparingTo);
  recordsData.setFinalGx(structuredClone(recordsData.finalGx));

  recordsData.gx.persons = persons;
  recordsData.setGx(structuredClone(recordsData.gx));
}

function updatePersonsData(person, personIndex, recordsData, assertions) {
  recordsData.gx.persons.splice(personIndex, 1, person);
  updateRecordsData(recordsData);
  updateRelationshipsData(recordsData, assertions);
}

function hasMatchingQualifier(attributeData, parentObject, comparingTo) {
  if (parentObject?.person1 && parentObject?.person2) {
    //TODO implement this if needed (may not see qualifiers on relationships) - it can be hard to tell what is wrong
    return true;
  }
  const matchingPersonsByName = personsWithMatchingNames(
    parentObject,
    comparingTo
  );
  if (matchingPersonsByName.length > 0) {
    for (const matchingPersonByName of matchingPersonsByName) {
      const factsWithMatchingKey = matchingPersonByName.facts?.filter(
        (comparingFact) => comparingFact[attributeData.key]
      );
      if (
        factsWithMatchingKey
          ?.flatMap((comparingFact) => comparingFact[attributeData.key])
          ?.find(
            (qualifier) =>
              JSON.stringify(qualifier) ===
              JSON.stringify(attributeData.qualifier)
          ) !== undefined
      ) {
        return true;
      }
    }
  }
  return false;
}

function createPerson(nameParts, isPrincipal, gender, type) {
  return {
    id: `p_${generateLocalId()}`,
    extracted: true,
    principal: isPrincipal,
    gender: { type: gender },
    names: [
      {
        id: generateLocalId(),
        type: !type ? null : type,
        nameForms: [
          {
            fullText: nameParts
              .map((part) => part.value)
              .join(" ")
              .trim(),
            parts: nameParts,
          },
        ],
      },
    ],
  };
}

function personsWithMatchingNames(person, comparingTo, assertions) {
  return comparingTo.filter((p) => haveSameNames(p, person, assertions));
}

export {
  getPersonsIntersection,
  personsAreEqual,
  isMatchingPerson,
  haveSameNames,
  haveSameFacts,
  haveSamePersonFields,
  hasMatchingPerson,
  getFullTextName,
  getNamePartsObject,
  hasMatchingField,
  updatePersonsData,
  hasMatchingQualifier,
  createPerson,
  personsWithMatchingNames,
  updateRecordsData,
};
