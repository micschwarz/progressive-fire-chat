import { writable } from 'svelte/store';
import type { User } from './user';

// User = Logged In; Null = User not logged in; undefined => Not yet loaded
export const currentUser = writable<User | null | undefined>(undefined);
