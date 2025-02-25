type Filter = {
  field: string;
  operation: string;
  value: any;
};

export const validateFilters = (filters: Filter[]): boolean => {
  const supportedOperations = [
    "equals",
    "exists",
    "doesNotExist",
    "notEquals",
    "greaterThan",
    "lessThan",
    "in",
    "notIn",
  ];

  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];

    if (!filter.field || typeof filter.field !== "string") {
      alert(`Filter at index ${i} is missing a valid "field".`);
    }

    if (!filter.operation || !supportedOperations.includes(filter.operation)) {
      alert(
        `Filter at index ${i} has an unsupported or missing "operation". Supported operations are: ${supportedOperations.join(
          ", "
        )}.`
      );
    }

    if (filter.operation === "exists" || filter.operation === "doesNotExist") {
      if (typeof filter.value !== "boolean") {
        alert(
          `Filter at index ${i} with "operation" "${filter.operation}" must have a boolean "value".`
        );
      }
    } else if (filter.operation === "in" || filter.operation === "notIn") {
      if (!Array.isArray(filter.value)) {
        alert(
          `Filter at index ${i} with "operation" "${filter.operation}" must have an array "value".`
        );
      }
    } else {
      if (filter.value === undefined || filter.value === null) {
        alert(
          `Filter at index ${i} with "operation" "${filter.operation}" must have a valid "value".`
        );
      }
    }
  }

  return true;
};
