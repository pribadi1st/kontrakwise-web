export function DateConverter(date: string) {
    return new Date(date).toLocaleDateString()
}