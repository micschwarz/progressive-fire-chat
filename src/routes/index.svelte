<script lang="ts">
    import { logout } from '$lib/firebase/auth/auth';
    import { getStore } from '$lib/firebase/firestore/collections/messages';
    import MessageInput from '$lib/message/MessageInput.svelte';
    import Messages from '$lib/message/Messages.svelte';
    import { currentUser } from '$lib/user/userStore';

    const messages = getStore();
</script>

<div class="h-full grid grid-rows-[max-content_1fr_max-content] gap-2">
    <div>
        Progressive Fire Chat 🔥 Hi {$currentUser?.name}
        <button class="btn" on:click={logout}>Logout</button>
    </div>

    <div class="overflow-hidden">
        {#if !$messages}
            Lädt...
        {:else}
            <Messages messages={$messages} />
        {/if}
    </div>

    <MessageInput />
</div>
