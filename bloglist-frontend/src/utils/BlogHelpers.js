const sort = (a, b) => {
    const likeDifference = b.likes - a.likes

    if (likeDifference === 0) {
        return a.title.localeCompare(b.title)
    }

    return likeDifference
}

export default { sort }