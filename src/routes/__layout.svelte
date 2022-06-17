<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
    import OfflineAlert from '$lib/components/OfflineAlert.svelte';
    import Page from '$lib/components/Page.svelte';
    import { loginWithGithub } from '$lib/firebase/auth/provider/provider';
    import { initFirebase } from '$lib/firebase/firebase';
    import { serviceworkerRegistration } from '$lib/serviceworker';
    import { currentUser } from '$lib/user/userStore';
    import { onMount } from 'svelte';
    import '../app.css';

    onMount(async () => {
        await serviceworkerRegistration;
        initFirebase();
    });

    const login = () => {
        loginWithGithub();
    };
</script>

<OfflineAlert />

{#if $currentUser === undefined}
    <Page>Lädt...</Page>
{:else if $currentUser === null}
    <Page>
        <button class="btn" on:click={login}>Login</button>
    </Page>
{:else}
    <div class="safe-area w-full overflow-hidden grid grid-rows-[max-content_1fr]">
        <Navbar />
        <Page>
            <slot />
        </Page>
    </div>
{/if}

<style>
    .safe-area {
        --screen-height: 100vh;
        --screen-width: 100vw;
        --safe-inset-bottom: env(safe-area-inset-bottom, 0px);
        --safe-inset-top: env(safe-area-inset-top, 0px);
        --safe-inset-left: env(safe-area-inset-left, 0px);
        --safe-inset-right: env(safe-area-inset-right, 0px);

        height: calc(var(--screen-height) - var(--safe-inset-bottom) - var(--safe-inset-top));
        width: calc(var(--screen-width) - var(--safe-inset-left) - var(--safe-inset-right));
        margin-top: var(--safe-inset-top) var(--safe-inset-right) var(--safe-inset-bottom) var(--safe-inset-left);
    }

    @supports (height: 100dvh) and (width: 100dvw) {
        .safe-area {
            --screen-height: 100dvh;
            --screen-width: 100dvw;
        }
    }
</style>
