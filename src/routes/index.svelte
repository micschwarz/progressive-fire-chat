<script lang="ts">
    import { logout } from '$lib/firebase/auth/auth';
    import { add, getStore } from '$lib/firebase/firestore/collections/messages';
    import Messages from '$lib/message/Messages.svelte';
    import { currentUser } from '$lib/user/userStore';

    $: user = $currentUser;
    let message = '';
    const send = async () => {
        console.log(message);

        add({
            user: {
                id: user!.id,
                name: user!.name,
            },
            content: message,
            createdAt: new Date(),
        });

        message = '';
    };

    const messages = getStore();
</script>

Progressive Fire Chat 🔥 Hi {$currentUser?.name}
<button class="btn" on:click={logout}>Logout</button>

<hr />

{#if !$messages}
    Lädt...
{:else}
    <Messages messages={$messages} />
{/if}

<form on:submit|preventDefault={send}>
    <input type="text" bind:value={message} />
    <button type="submit">Senden</button>
</form>
