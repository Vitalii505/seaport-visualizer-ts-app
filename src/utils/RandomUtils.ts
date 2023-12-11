export class RandomUtils {
    public static mathRoundRandom(min: number, max: number): number {
        return Math.round(Math.random()*(max-min) + min);
    }
}

