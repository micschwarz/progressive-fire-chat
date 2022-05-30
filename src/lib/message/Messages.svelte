<script lang="ts">
    import type { Message as MessageModel } from './message';
    import Message from './Message.svelte';

    export let messages: MessageModel[];
</script>

{#each messages as message (message)}
    <Message {message} />
{:else}
    Keine Messages :/
{/each}
