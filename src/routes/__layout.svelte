<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
    import Page from '$lib/components/Page.svelte';
    import { loginWithGithub } from '$lib/firebase/auth/provider/provider';
    import { initFirebase } from '$lib/firebase/firebase';
    import { currentUser } from '$lib/user/userStore';
    import { onMount } from 'svelte';
    import '../app.css';

    onMount(() => {
        initFirebase();
    });

    const login = () => {
        loginWithGithub();
    };
</script>

{#if $currentUser === undefined}
    <Page>Lädt...</Page>
{:else if $currentUser === null}
    <Page>
        <button class="btn" on:click={login}>Login</button>
    </Page>
{:else}
    <div class="h-screen grid grid-rows-[max-content_1fr]">
        <Navbar />
        <Page>
            <slot />
        </Page>
    </div>
{/if}
