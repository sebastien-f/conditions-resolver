abstract class Command {
    public abstract execute(target: any): any;
}

export { Command }