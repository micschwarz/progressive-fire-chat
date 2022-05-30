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
