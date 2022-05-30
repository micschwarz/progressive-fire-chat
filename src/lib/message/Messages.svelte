<script lang="ts">
    import type { Message as MessageModel } from './message';
    import Message from './Message.svelte';

    export let messages: MessageModel[];
    $: reversed = messages.reverse();
</script>

<div class="flex flex-col-reverse gap-1 overflow-y-auto h-full">
    {#each reversed as message (message)}
        <Message {message} />
    {:else}
        Keine Messages :/
    {/each}
</div>
