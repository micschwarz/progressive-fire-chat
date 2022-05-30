<script lang="ts">
    import { add } from '$lib/firebase/firestore/collections/messages';
    import { currentUser } from '$lib/user/userStore';

    $: user = $currentUser;

    let message = '';
    $: messageSendable = message.length > 0;

    let sending = false;

    const send = async () => {
        if (!messageSendable || sending) {
            return;
        }

        sending = true;

        const request = add({
            user: {
                id: user!.id,
                name: user!.name,
            },
            content: message,
            createdAt: new Date(),
        });

        message = '';
        await request;

        sending = false;
    };
</script>

<form on:submit|preventDefault={send} class="flex gap-1 w-full">
    <div class="grow">
        <input
            placeholder="Nachricht"
            class="input input-bordered w-full"
            type="text"
            bind:value={message}
            disabled={sending}
        />
    </div>
    <div class="w-32">
        {#if sending}
            <button class="btn btn-primary w-full loading" type="button" disabled>Sende</button>
        {:else}
            <button class="btn btn-primary w-full" type="submit" disabled={!messageSendable}>Senden</button>
        {/if}
    </div>
</form>
