export abstract class AbstractDrawTool {
    private counter = 0;

    protected nextLabel(prefix: string) {
        this.counter += 1;
        return `${prefix} ${this.counter}`;
    }
}