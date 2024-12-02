export const numberFormateLabel = (number = 0) => {
    if (Number.isInteger(Number(number))) {
        let data = number?.toLocaleString(undefined, {})
        return <span>{data}</span>
    } else {
        let data = number
            ?.toLocaleString(undefined, {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
            })
            ?.split('.')
        return (
            <span>
                {data[0]}.<small className="font-medium">{data[1]}</small>
            </span>
        )
    }
}
