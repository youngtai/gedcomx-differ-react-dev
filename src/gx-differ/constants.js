import {generateLocalId} from "./Utils";

export const NAME_PART_TYPE = {
  prefix: 'http://gedcomx.org/Prefix',
  given: 'http://gedcomx.org/Given',
  surname: 'http://gedcomx.org/Surname',
  suffix: 'http://gedcomx.org/Suffix'
}

export const KEY_TO_LABEL_MAP = {
  'type': 'Type',
  'date': 'Date',
  'place': 'Place',
  'value': 'Value',
  'primary': 'Primary'
};

export const GENDER = {
  Male: 'http://gedcomx.org/Male',
  Female: 'http://gedcomx.org/Female',
  Unknown: 'http://gedcomx.org/Unknown'
};

export const FACT_KEYS = {
  type: 'type',
  date: 'date',
  place: 'place',
  value: 'value',
  primary: 'primary',
  qualifiers: 'qualifiers',
  id: 'id',
  fields: 'fields',
  confidence: 'confidence',
  formal: 'formal',
  description: 'description',
};

export const IGNORED_FACT_KEYS = [
  FACT_KEYS.id,
  FACT_KEYS.fields,
  FACT_KEYS.confidence,
  FACT_KEYS.formal,
  FACT_KEYS.description
];

export const COVERAGE_ATTRIBUTES = {
  spatial: 'spatial',
  temporal: 'temporal',
  recordType: 'recordType'
}

export const GEDCOMX_ORG_PREFIX = `http://gedcomx.org/`;

export const FACT_QUALIFIER = {
  Age: `${GEDCOMX_ORG_PREFIX}Age`,
  Cause: `${GEDCOMX_ORG_PREFIX}Cause`
}

export const PERSON_NAME_TYPE = {
  BirthName: `${GEDCOMX_ORG_PREFIX}BirthName`,
  MarriedName: `${GEDCOMX_ORG_PREFIX}MarriedName`,
  AlsoKnownAs: `${GEDCOMX_ORG_PREFIX}AlsoKnownAs`,
  Nickname: `${GEDCOMX_ORG_PREFIX}Nickname`,
  FormalName: `${GEDCOMX_ORG_PREFIX}FormalName`,
  ReligiousName: `${GEDCOMX_ORG_PREFIX}ReligiousName`
}

const FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX = 'http://familysearch.org/types/relationships/';

export const RELATIONSHIP = {
  Couple: `${GEDCOMX_ORG_PREFIX}Couple`,
  ParentChild: `${GEDCOMX_ORG_PREFIX}ParentChild`,
  DivorcedCouple: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}DivorcedCouple`,
  Fiance: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}Fiance`,
  DomesticPartnership: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}DomesticPartnership`,
  Sibling: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}Sibling`,
  Grandparent: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}Grandparent`,
  GreatGrandparent: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}GreatGrandparent`,
  SiblingInLaw: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}SiblingInLaw`,
  StepSibling: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}StepSibling`,
  ParentChildInLaw: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}ParentChildInLaw`,
  StepParentChild: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}StepParentChild`,
  GuardianParentChild: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}GuardianParentChild`,
  SurrogateParentChild: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}SurrogateParentChild`,
  AuntOrUncle: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}AuntOrUncle`,
  Cousin: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}Cousin`,
  Godparent: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}Godparent`,
  Descendant: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}Descendant`,
  Relative: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}Relative`,
  NonRelative: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}NonRelative`,
  Unknown: `${FAMILYSEARCH_TYPES_RELATIONSHIPS_PREFIX}Unknown`
}

const FAMILYSEARCH_TYPES_FIELDS_PREFIX = 'http://familysearch.org/types/fields/';

export const RECORD_FIELD_TYPE = {
  DigitalFilmNbr: `${FAMILYSEARCH_TYPES_FIELDS_PREFIX}DigitalFilmNbr`,
  ImageNumber: `${FAMILYSEARCH_TYPES_FIELDS_PREFIX}ImageNumber`,
  RecordStyle: `${FAMILYSEARCH_TYPES_FIELDS_PREFIX}RecordStyle`,
  CrossType: `${FAMILYSEARCH_TYPES_FIELDS_PREFIX}CrossType`
};

export const PERSON_FIELD_TYPE = {
  Age: `${GEDCOMX_ORG_PREFIX}Age`,
  Role: `${GEDCOMX_ORG_PREFIX}Role`
};

export const FACT_TYPE = {
  Adoption: `${GEDCOMX_ORG_PREFIX}Adoption`,
  AdultChristening: `${GEDCOMX_ORG_PREFIX}AdultChristening`,
  Amnesty: `${GEDCOMX_ORG_PREFIX}Amnesty`,
  Apprenticeship: `${GEDCOMX_ORG_PREFIX}Apprenticeship`,
  Arrest: `${GEDCOMX_ORG_PREFIX}Arrest`,
  Award: `${GEDCOMX_ORG_PREFIX}Award`,
  Baptism: `${GEDCOMX_ORG_PREFIX}Baptism`,
  BarMitzvah: `${GEDCOMX_ORG_PREFIX}BarMitzvah`,
  BatMitzvah: `${GEDCOMX_ORG_PREFIX}BatMitzvah`,
  Birth: `${GEDCOMX_ORG_PREFIX}Birth`,
  BirthNotice: `${GEDCOMX_ORG_PREFIX}BirthNotice`,
  Blessing: `${GEDCOMX_ORG_PREFIX}Blessing`,
  Burial: `${GEDCOMX_ORG_PREFIX}Burial`,
  Caste: `${GEDCOMX_ORG_PREFIX}Caste`,
  Census: `${GEDCOMX_ORG_PREFIX}Census`,
  Christening: `${GEDCOMX_ORG_PREFIX}Christening`,
  Circumcision: `${GEDCOMX_ORG_PREFIX}Circumcision`,
  Clan: `${GEDCOMX_ORG_PREFIX}Clan`,
  Confirmation: `${GEDCOMX_ORG_PREFIX}Confirmation`,
  Court: `${GEDCOMX_ORG_PREFIX}Court`,
  Cremation: `${GEDCOMX_ORG_PREFIX}Cremation`,
  Death: `${GEDCOMX_ORG_PREFIX}Death`,
  Education: `${GEDCOMX_ORG_PREFIX}Education`,
  EducationEnrollment: `${GEDCOMX_ORG_PREFIX}EducationEnrollment`,
  Emigration: `${GEDCOMX_ORG_PREFIX}Emigration`,
  Ethnicity: `${GEDCOMX_ORG_PREFIX}Ethnicity`,
  Excommunication: `${GEDCOMX_ORG_PREFIX}Excommunication`,
  FirstCommunion: `${GEDCOMX_ORG_PREFIX}FirstCommunion`,
  Funeral: `${GEDCOMX_ORG_PREFIX}Funeral`,
  GenderChange: `${GEDCOMX_ORG_PREFIX}GenderChange`,
  Graduation: `${GEDCOMX_ORG_PREFIX}Graduation`,
  Heimat: `${GEDCOMX_ORG_PREFIX}Heimat`,
  Immigration: `${GEDCOMX_ORG_PREFIX}Immigration`,
  Imprisonment: `${GEDCOMX_ORG_PREFIX}Imprisonment`,
  Inquest: `${GEDCOMX_ORG_PREFIX}Inquest`,
  LandTransaction: `${GEDCOMX_ORG_PREFIX}LandTransaction`,
  Language: `${GEDCOMX_ORG_PREFIX}Language`,
  Living: `${GEDCOMX_ORG_PREFIX}Living`,
  MaritalStatus: `${GEDCOMX_ORG_PREFIX}MaritalStatus`,
  Medical: `${GEDCOMX_ORG_PREFIX}Medical`,
  MilitaryAward: `${GEDCOMX_ORG_PREFIX}MilitaryAward`,
  MilitaryDischarge: `${GEDCOMX_ORG_PREFIX}MilitaryDischarge`,
  MilitaryDraftRegistration: `${GEDCOMX_ORG_PREFIX}MilitaryDraftRegistration`,
  MilitaryInduction: `${GEDCOMX_ORG_PREFIX}MilitaryInduction`,
  MilitaryService: `${GEDCOMX_ORG_PREFIX}MilitaryService`,
  Mission: `${GEDCOMX_ORG_PREFIX}Mission`,
  MoveFrom: `${GEDCOMX_ORG_PREFIX}MoveFrom`,
  MoveTo: `${GEDCOMX_ORG_PREFIX}MoveTo`,
  MultipleBirth: `${GEDCOMX_ORG_PREFIX}MultipleBirth`,
  NationalId: `${GEDCOMX_ORG_PREFIX}NationalId`,
  Nationality: `${GEDCOMX_ORG_PREFIX}Nationality`,
  Naturalization: `${GEDCOMX_ORG_PREFIX}Naturalization`,
  NumberOfChildren: `${GEDCOMX_ORG_PREFIX}NumberOfChildren`,
  NumberOfMarriages: `${GEDCOMX_ORG_PREFIX}NumberOfMarriages`,
  Obituary: `${GEDCOMX_ORG_PREFIX}Obituary`,
  Occupation: `${GEDCOMX_ORG_PREFIX}Occupation`,
  Ordination: `${GEDCOMX_ORG_PREFIX}Ordination`,
  Pardon: `${GEDCOMX_ORG_PREFIX}Pardon`,
  PhysicalDescription: `${GEDCOMX_ORG_PREFIX}PhysicalDescription`,
  Probate: `${GEDCOMX_ORG_PREFIX}Probate`,
  Property: `${GEDCOMX_ORG_PREFIX}Property`,
  Race: `${GEDCOMX_ORG_PREFIX}Race`,
  Religion: `${GEDCOMX_ORG_PREFIX}Religion`,
  Residence: `${GEDCOMX_ORG_PREFIX}Residence`,
  Retirement: `${GEDCOMX_ORG_PREFIX}Retirement`,
  Stillbirth: `${GEDCOMX_ORG_PREFIX}Stillbirth`,
  TaxAssessment: `${GEDCOMX_ORG_PREFIX}TaxAssessment`,
  Tribe: `${GEDCOMX_ORG_PREFIX}Tribe`,
  Will: `${GEDCOMX_ORG_PREFIX}Will`,
  Visit: `${GEDCOMX_ORG_PREFIX}Visit`,
  Yahrzeit: `${GEDCOMX_ORG_PREFIX}Yahrzeit`
};

export const RELATIONSHIP_FACT_TYPE = {
  Annulment: `${GEDCOMX_ORG_PREFIX}Annulment`,
  CommonLawMarriage: `${GEDCOMX_ORG_PREFIX}CommonLawMarriage`,
  CivilUnion: `${GEDCOMX_ORG_PREFIX}CivilUnion`,
  Divorce: `${GEDCOMX_ORG_PREFIX}Divorce`,
  DivorceFiling: `${GEDCOMX_ORG_PREFIX}DivorceFiling`,
  DomesticPartnership: `${GEDCOMX_ORG_PREFIX}DomesticPartnership`,
  Engagement: `${GEDCOMX_ORG_PREFIX}Engagement`,
  Marriage: `${GEDCOMX_ORG_PREFIX}Marriage`,
  MarriageBanns: `${GEDCOMX_ORG_PREFIX}MarriageBanns`,
  MarriageContract: `${GEDCOMX_ORG_PREFIX}MarriageContract`,
  MarriageLicense: `${GEDCOMX_ORG_PREFIX}MarriageLicense`,
  MarriageNotice: `${GEDCOMX_ORG_PREFIX}MarriageNotice`,
  NumberOfChildren: `${GEDCOMX_ORG_PREFIX}NumberOfChildren`,
  Separation: `${GEDCOMX_ORG_PREFIX}Separation`,
  AdoptiveParent: `${GEDCOMX_ORG_PREFIX}AdoptiveParent`,
  BiologicalParent: `${GEDCOMX_ORG_PREFIX}BiologicalParent`,
  FosterParent: `${GEDCOMX_ORG_PREFIX}FosterParent`,
  GuardianParent: `${GEDCOMX_ORG_PREFIX}GuardianParent`,
  StepParent: `${GEDCOMX_ORG_PREFIX}StepParent`,
  SociologicalParent: `${GEDCOMX_ORG_PREFIX}SociologicalParent`,
  SurrogateParent: `${GEDCOMX_ORG_PREFIX}SurrogateParent`
};

export const GEDCOMX_ORIGINAL = `${GEDCOMX_ORG_PREFIX}Original`;

export const PERSON_FACT_BACKGROUND_COLOR = '#eeeeee';
export const DIFF_BACKGROUND_COLOR = '#ffe9e9';

export const EMPTY_GEDCOMX = {
  id: generateLocalId(),
  attribution: {},
  description: '',
  persons: [],
  relationships: [],
  sourceDescriptions: [],
  documents: [],
  fields: []
};