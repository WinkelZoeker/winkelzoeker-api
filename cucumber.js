let common = [
  './test/e2e/features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require ./test/e2e/steps/**/*.steps.ts', // Load step definitions
  '--format progress-bar', // Load custom formatter
  '--format cucumber-pretty' // Load custom formatter
].join(' ');

// module.exports = {
//   default: common
// };

module.exports = {
	default: '--publish-quiet'
};
