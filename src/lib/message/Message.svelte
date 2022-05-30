<script lang="ts">
    import type { Message } from './message';

    export let message: Message;
</script>

<div>
    {message.user.name}: {message.content}
</div>
