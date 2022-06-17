<script lang="ts">
    import { currentUser } from '$lib/user/userStore';

    import type { Message } from './message';

    export let message: Message;

    const dateFormat = new Intl.DateTimeFormat('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const emojiRegex = new RegExp('^\\p{Extended_Pictographic}{1,2}$', 'gmiu');

    $: isOwnMessage = message.user.id === $currentUser?.id;
    $: isEmojiMessage = message.content.search(emojiRegex) !== -1;
</script>

<div
    class="bg-neutral p-1 px-2 rounded self-start max-w-xs {isOwnMessage ? 'ml-4' : 'mr-4'}"
    class:bg-primary={isOwnMessage}
    class:self-end={isOwnMessage}
>
    <div class="text-xs text-primary-content/50">
        {message.user.name} um {dateFormat.format(message.createdAt)}
    </div>
    <div class="text-primary-content" class:text-3xl={isEmojiMessage}>{message.content}</div>
</div>
