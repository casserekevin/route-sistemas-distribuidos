const functionsTime = (func) => {
    let t0 = performance.now()

    func()

    let t1 = performance.now()

    console.log((t1 - t0));
}

export default functionsTime