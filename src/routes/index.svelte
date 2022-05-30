<script lang="ts">
    import { logout } from '$lib/firebase/auth/auth';
    import { getStore } from '$lib/firebase/firestore/collections/messages';
    import MessageInput from '$lib/message/MessageInput.svelte';
    import Messages from '$lib/message/Messages.svelte';
    import { currentUser } from '$lib/user/userStore';

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

<MessageInput />
