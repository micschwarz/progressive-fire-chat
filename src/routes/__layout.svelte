<script lang="ts">
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
    Lädt...
{:else if $currentUser === null}
    <button class="btn" on:click={login}>Login</button>
{:else}
    <slot />
{/if}
