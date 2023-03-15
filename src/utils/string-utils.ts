export class StringUtils {
    public static generateRandomString(length = 6): string {
        return Math.random().toString(20).substr(2, length);
    }

    public static camelize(str: string): string {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/\s+/g, '');
    }

    public static stringToHTMLDocument(str: string): Document {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/html');
        return doc;
    }
}
