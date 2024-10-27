function documentsAreEqual(docA, docB) {
  if (docA?.id?.startsWith("doc_") && docB?.id?.startsWith("doc_")) {
    return true;
  }
  if (docA?.id === "extractionNotes" && docB?.id === "extractionNotes") {
    return true;
  }
  return JSON.stringify(docA) === JSON.stringify(docB);
}

function sideIncludesDocument(document, documents) {
  return documents?.find((d) => documentsAreEqual(document, d)) !== undefined;
}

function getDocumentsIntersection(leftDocuments, rightDocuments) {
  return leftDocuments?.filter((ld) =>
    sideIncludesDocument(ld, rightDocuments)
  );
}

export { documentsAreEqual, sideIncludesDocument, getDocumentsIntersection };
