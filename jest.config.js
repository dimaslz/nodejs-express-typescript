module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    testPathIgnorePatterns: ["dist", "node_modules"],
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "**/src/**/*.test.(ts|js)",
        "**/test/**/*.test.(ts|js)"
    ],
    testEnvironment: "node"
};
