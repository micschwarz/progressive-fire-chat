<script lang="ts">
    import Icon from '$lib/components/Icon.svelte';
    import { logout } from '$lib/firebase/auth/auth';
    import { networkStatus } from '$lib/network/network';
    import { currentUser } from '$lib/user/userStore';
    import { faCog, faSignOut, faSlash, faWifi } from '@fortawesome/free-solid-svg-icons';

    let showOfflineModal = false;

    const openOfflineModal = () => {
        showOfflineModal = true;
    };
</script>

<input type="checkbox" id="offline-modal" class="modal-toggle" bind:checked={showOfflineModal} />

<label for="offline-modal" class="modal cursor-pointer">
    <div class="modal-box relative" for="">
        <h3 class="text-lg font-bold">Du bist offline</h3>
        <p class="py-4">
            Du hast aktuell keine Internetverbindung. <br />
            Nachrichten können erst versandt und empfangen werden, wenn du wieder mit dem Internet verbunden bist.
        </p>
        <div class="modal-action">
            <label for="offline-modal" class="btn">Schließen</label>
        </div>
    </div>
</label>

<div class="p-1 sm:p-3">
    <div class="navbar bg-base-200 rounded-box">
        <div class="flex-1">
            <div class="hidden sm:block">
                <a href="/" class="btn btn-ghost normal-case text-xl">Progressive Fire Chat 🔥</a>
            </div>
            <div class="block sm:hidden">
                <a href="/" class="btn btn-square btn-ghost normal-case text-xl">🔥</a>
            </div>
        </div>
        <div class="flex items-center gap-1">
            <div class="mr-2 hidden sm:block">Hi {$currentUser?.name}</div>

            {#if !$networkStatus}
                <div class="tooltip tooltip-bottom" data-tip="Offline">
                    <button class="btn btn-square btn-ghost text-error" on:click={openOfflineModal}>
                        <div class="relative">
                            <Icon icon={faWifi} />
                            <div class="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">
                                <Icon icon={faSlash} />
                            </div>
                        </div>
                    </button>
                </div>
            {/if}

            <div class="tooltip tooltip-bottom" data-tip="Einstellungen">
                <a class="btn btn-ghost btn-square" href="/settings"><Icon icon={faCog} /></a>
            </div>
            <div class="tooltip tooltip-bottom" data-tip="Abmelden">
                <button class="btn btn-ghost" on:click={logout}><Icon icon={faSignOut} /></button>
            </div>
        </div>
    </div>
</div>
