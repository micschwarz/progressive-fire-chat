<script lang="ts">
    import Icon from '$lib/components/Icon.svelte';
    import { logout } from '$lib/firebase/auth/auth';
    import { getStore } from '$lib/firebase/firestore/collections/messages';
    import MessageInput from '$lib/message/MessageInput.svelte';
    import Messages from '$lib/message/Messages.svelte';
    import { currentUser } from '$lib/user/userStore';
    import { faCog } from '@fortawesome/free-solid-svg-icons';

    const messages = getStore();
</script>

<div class="h-full grid grid-rows-[max-content_1fr_max-content] gap-2">
    <div class="flex flex-wrap items-center gap-3">
        <div>Progressive Fire Chat 🔥</div>
        <div>Hi {$currentUser?.name}</div>

        <div class="flex items-center gap-1">
            <a class="btn btn-sm btn-square" href="/settings"><Icon icon={faCog} /></a>
            <button class="btn btn-sm" on:click={logout}>Logout</button>
        </div>
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
