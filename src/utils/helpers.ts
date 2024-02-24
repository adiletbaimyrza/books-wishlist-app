const truncateDescription = (
  description: string | undefined,
  maxLength: number
) => {
  if (!description || description.length <= maxLength) {
    return description
  }

  const lastSpaceIndex = description.lastIndexOf(' ', maxLength)

  if (lastSpaceIndex === -1) {
    return description.slice(0, maxLength).concat('...')
  } else {
    return description.slice(0, lastSpaceIndex).concat('...')
  }
}

const undefinedCaseHandler = (
  toBeReplaced: string | string[] | number | undefined,
  toReplace: string
): string | number => {
  if (toBeReplaced === undefined) {
    return `No ${toReplace}.`
  }

  if (Array.isArray(toBeReplaced)) {
    return toBeReplaced.length > 0
      ? toBeReplaced.join(', ')
      : `No ${toReplace}.`
  }

  if (typeof toBeReplaced === 'number') {
    return toBeReplaced
  }

  return toBeReplaced
}

export { truncateDescription, undefinedCaseHandler }
