<script lang="ts">
    import Icon from '$lib/components/Icon.svelte';
    import { changeName } from '$lib/firebase/auth/auth';
    import { currentUser } from '$lib/user/userStore';
    import { get } from 'svelte/store';
    import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

    let username = get(currentUser)!.name;
    let userSaving = false;
    const updateUser = async (): Promise<void> => {
        if (userSaving) {
            return;
        }

        userSaving = true;

        username = username || 'Anonym';
        await changeName(username ? username : null);

        userSaving = false;
    };
</script>

<svelte:head>
    <title>Progressive Fire Chat | Settings</title>
</svelte:head>

<div class="flex gap-2 items-center mb-4">
    <a class="btn btn-sm btn-square" href="/"><Icon icon={faChevronLeft} /></a>
    <h1 class="text-3xl">Einstellungen</h1>
</div>

<div class="flex flex-col gap-1 max-w-md">
    <div class="card bg-neutral">
        <div class="card-body">
            <h2 class="card-title">Benutzer</h2>
            <div class="form-control w-full">
                <label class="label" for="username">
                    <span class="label-text">Anzeigename</span>
                </label>
                <input
                    id="username"
                    type="text"
                    placeholder="Anonym"
                    class="input input-bordered w-full"
                    bind:value={username}
                    disabled={userSaving}
                />
            </div>
            <div class="card-actions justify-end">
                <button
                    class="btn btn-primary"
                    type="submit"
                    class:loading={userSaving}
                    disabled={userSaving}
                    on:click={updateUser}
                >
                    {#if userSaving}
                        Speichert
                    {:else}
                        Speichern
                    {/if}
                </button>
            </div>
        </div>
    </div>
</div>
