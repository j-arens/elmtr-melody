type Middleware = (stop: (value: any) => void, ...args: any[]) => any;

export default class MiddlewarePipeline {

    /**
     * Middleware repository
     */
    repository: Set<Middleware> = new Set([]);

    /**
     * Process stopped flag
     */
    stopped: boolean = false;

    /**
     * Stopped process value
     */
    stoppedValue: any = undefined;

    /**
     * Completed process value
     */
    processedValue: any = undefined;

    /**
     * Check if repository has a middleware
     */
    public has(middleware: Middleware): boolean {
        return this.repository.has(middleware);
    }

    /**
     * Assign middleware to be used in order
     */
    public use(...middleware: Middleware[]): void {
        middleware.forEach(m => !this.has(m) && this.repository.add(m));
    }

    /**
     * Run the middleware with provided args
     */
    public process(...args: any[]): any {
        for (const middleware of Array.from(this.repository.values())) {
            if (this.stopped) {
                break;
            }

            this.processedValue = middleware(this.stop, ...args);
        }

        return this.resolve();
    }

    /**
     * Stop the process early
     */
    public stop = (value: any): void => {
        this.stopped = true;
        this.stoppedValue = value;
    }

    /**
     * Get the pipeline's resulting value
     */
    protected resolve(): any {
        return this.stopped ? this.stoppedValue : this.processedValue;
    }
}
