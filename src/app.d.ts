// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: {
				R2_BUCKET: R2Bucket;
			};
		}
	}
}

export {};
