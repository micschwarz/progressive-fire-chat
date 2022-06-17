<script lang="ts">
    import { getStore } from '$lib/firebase/firestore/collections/messages';
    import MessageInput from '$lib/message/MessageInput.svelte';
    import Messages from '$lib/message/Messages.svelte';
    const messages = getStore();
</script>

<svelte:head>
    <title>Progressive Fire Chat</title>
</svelte:head>


<div class="h-full grid grid-rows-[1fr_max-content] gap-2">
    <div class="overflow-hidden">
        {#if !$messages}
            Lädt...
        {:else}
            <Messages messages={$messages} />
        {/if}
    </div>

    <MessageInput />
</div>
