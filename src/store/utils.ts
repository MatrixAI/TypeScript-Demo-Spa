const makeIdentifiers: any = (moduleName: string, identifierNames: string[]) => {
  const identifiersInternal = {};
  const identifiersExternal = {};
  for (let identifierName of identifierNames) {
    identifiersInternal[identifierName] = identifierName;
    identifiersExternal[identifierName] = `${moduleName}/${identifierName}`;
  }
  return [identifiersInternal, identifiersExternal];
};

export {
  makeIdentifiers,
};
