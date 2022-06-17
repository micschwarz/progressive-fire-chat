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
    <div class="h-safe-screen grid grid-rows-[max-content_1fr]">
        <Navbar />
        <Page>
            <slot />
        </Page>
    </div>
{/if}

<style>
    .h-safe-screen {
        --screen-height: 100vh;
        height: calc(var(--screen-height) - env(safe-area-inset-bottom, 0));
    }

    @supports (height: 100dvh) {
        .h-safe-screen {
            --screen-height: 100dvh;
        }
    }
</style>
