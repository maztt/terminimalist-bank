const sleep = seconds => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

export { sleep }
